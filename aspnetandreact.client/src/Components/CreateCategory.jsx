import {  useState } from "react";
import { createCategory } from '../Services/CategoryServices'
function CreateCategory() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [res, setRes] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [data, setData] = useState({
        name: ""
    })
    const handleConfirm = (e) => {
        e.preventDefault()
        setShowConfirmation(true);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setData({
                ...data,
                [name]: value
            })
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    const handleConfirmSave = async (e) => {
        e.preventDefault()
        try {
            let response = await createCategory(data);
            setRes(response)
        } catch (error) {
            setRes(error)
            console.log(error);
        }
        setShowMessage(true)
        setShowConfirmation(false)
        var elements = document.getElementsByClassName("product-input")
        for (let element of elements) {
            element.value = ""
        }
    }
  return (
      <div className="view-Container">
          <form className="cr-f-container" onSubmit={handleConfirm}>
              <div className="header-Con">
                  <p id="header" className="header">Create Category for Products</p>
                  {showMessage && <p className={res.status ? "msg-box-true" : "msg-box-false"}>{res.message}</p>
                  }
              </div>
              <div style={{ width: "50%" }}  className="form-container">
                  <div>
                      <label style={{width:"20%"} }>Category name:</label>
                      <input className="product-input" autoComplete="off" maxLength="20"
                          type="text" required
                          name="name"
                          placeholder="Category Name"
                          onChange={handleInputChange}
                      />
                  </div>

              </div>
              <button className="cr-save" type="submit">Create</button>
              {showConfirmation && (
                  <>
                      <div className="overlay"></div>
                      <div className="confirmation-box">
                          <p>Are you sure you want to create a new category?</p>
                          <button className="confirm-button" onClick={handleConfirmSave}>Yes, I am sure</button>
                          <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                      </div>
                  </>
              )}
          </form>
      </div>
  );
}

export default CreateCategory;