import { useState } from "react";
//import UserContext from '../Components/UserContext'
import '../Styles/CreateShop.css'
import { registerUser } from '../Services/LoginRegister'
import { createShop } from "../Services/ShopServices";
function CreateShop() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    //const { user } = useContext(UserContext);
    const [res, setRes] = useState()
    const [showMessage, setShowMessage] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [userId, setUserId] = useState("")
    const [userData, setUserData] = useState({
        Username: "", FirstName: "", LastName: "", Password: "", Type: "shop admin"
    })
    const [data, setData] = useState({
        name: "", category : "", image_url: "", theme_color: "", user_id: userId
    })

    const checkPasswordStrength = (password) => {
        let strength = '';
        if (password.length >= 8) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
                strength = 'Strong';
            } else if ((hasUpperCase || hasLowerCase) && hasNumbers) {
                strength = 'Medium';
            } else {
                strength = 'Weak';
            }
        } else {
            strength = 'Short';
        }

        setPasswordStrength(strength);
    };

    const handleUserInputChange = (e) => {
        if (e.target.name == "password") {
            checkPasswordStrength(e.target.value)
        }
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            })
    }

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
        let response
        try {
            response = await registerUser(userData);
            if (response.token !== "") {
                setUserId(response.id)

            }
        } catch (error) {
            console.log(error)
        }
        try {
            response = await createShop(data);
            setRes({status: response.statue, message: response.message})
        } catch (error) {
            setRes({ status: response.statue, message: response.message })
            console.log(error);
        }
        setShowMessage(true)
        setShowConfirmation(false)
        var elements = document.getElementsByClassName("shop-input")
        for (let element of elements) {
            element.value = ""
        }
        //reset user inputs
    }
    return (
        <>
            <form className="cr-f-container" onSubmit={handleConfirm}>
                <div className="header-Con">
                    <p id="header" className="header">User Info</p>
                    {
                        showMessage && <p className={res.status ? "msg-box-true" : "msg-box-false"}>{res.message}</p>
                    }
                </div>
                <div className="form-container">
                    <div>
                        <label>Username:</label>
                        <input className="product-input" autoComplete="off" maxLength="40"
                            type="text" required
                            name="Username"
                            placeholder="Username"
                            onChange={handleUserInputChange}

                        />
                    </div>
                    <div>
                        <label>First Name: </label>
                        <input className="product-input" autoComplete="off" maxLength="40"
                            type="text" required
                            name="FirstName"
                            placeholder="First Name"
                            onChange={handleInputChange}

                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input className="product-input" autoComplete="off" maxLength="40"
                            id={`${passwordStrength.toLowerCase()}`}
                            type="password" required
                            name="Password"
                            placeholder="Password"
                            onChange={handleUserInputChange}
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input className="product-input" autoComplete="off" maxLength="40"
                            type="text" required
                            name="LastName"
                            placeholder="Last Name"
                            onChange={handleUserInputChange}
                        />
                    </div>

                </div>
            <div className="header-Con">
                <p id="header" className="header">Shop Info</p>
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
          <button className="cr-save"type="submit">Create User & Shop</button>
          {showConfirmation && (
              <>
                  <div className="overlay"></div>
                  <div className="confirmation-box">
                      <p>Are you sure you want to create shop?</p>
                      <button className="confirm-button" onClick={handleConfirmSave}>Yes, I am sure</button>
                      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                  </div>
              </>
          )}
            </form >
        
        </>
)}

export default CreateShop;