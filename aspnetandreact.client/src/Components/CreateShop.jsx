import { useState, useContext } from "react";
import UserContext from '../Components/UserContext'
import '../Styles/CreateShop.css'
import { createShop } from "../Services/ShopServices";
function CreateShop() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const { user } = useContext(UserContext);
    const [res, setRes] = useState()
    const [showMessage, setShowMessage] = useState(false)

    const [data, setData] = useState({
        name: "", category : "", image_url: "", theme_color: "", user_id: user.id
    })
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleConfirm = (e) => {
            e.preventDefault();
            setShowConfirmation(true);
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    const handleConfirmSave = async (e) => {
        e.preventDefault()
        try {
            let response = await createShop(data);
            setRes(response)
        } catch (error) {
            setRes(error)
            console.log(error);
        }
        setShowMessage(true)
        setShowConfirmation(false)
        var elements = document.getElementsByClassName("shop-input")
        for (let element of elements) {
            element.value = ""
        }
    }
  return (
      <form className="cr-f-container" onSubmit={handleConfirm}>
            <div className="header-Con">
                <p id="header" className="header">Create Shop</p>
              {
                  showMessage && <p className="msg-box">{res}</p>
              }
            </div>
            <div className="cr-form-container">
                <div>
                    <label>Name:</label>
                  <input className="shop-input" autoComplete="off" required id="name"
                        type="text"
                        name="name"
                        placeholder="Shop Name"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                  <input className="shop-input" autoComplete="off" required
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                  <input className="shop-input" autoComplete="off" required
                        type="url"
                        name="image_url"
                        placeholder="Image Url"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Theme Color:</label>
                  <input id="theme-color"  className="shop-input" autoComplete="off" required 
                        type="color"
                        name="theme_color"
                        placeholder="Theme Color"
                        onChange={handleInputChange}
                    />
              </div>
          </div>
          <button className="cr-save"type="submit">Create</button>
          {showConfirmation && (
              <>
                  <div className="overlay"></div>
                  <div className="confirmation-box">
                      <p>Are you sure you want to save these changes?</p>
                      <button className="confirm-button" onClick={handleConfirmSave}>Yes, I am sure</button>
                      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  </div>
              </>
          )}
      </form >

)}

export default CreateShop;