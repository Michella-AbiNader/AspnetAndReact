import { useState } from "react";
//import UserContext from '../Components/UserContext'
import '../Styles/CreateShop.css'
import { registerUser } from '../Services/LoginRegister'
import { createShop } from "../Services/ShopServices";
function CreateShop() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    //const { user } = useContext(UserContext);
    const [res, setRes] = useState()
    const [userRes, setUserRes] = useState()
    const [showMessage, setShowMessage] = useState(false)
    const [isUserCreated, setIsUSerCreated] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState('');
    const [userId, setUserId] = useState("")
    const [userData, setUserData] = useState({
        username: "", first_name: "", last_name: "", password: "", type: "shop admin"
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
    const handleUserConfirmSave = async (e) => {
        e.preventDefault()
        try {
            var response = await registerUser(userData);
            if (response.token !== "") {
                setIsUSerCreated(true)
                setUserRes("User created successsfully!")
                setUserId(response.id)

            }
        } catch (error) {
            console.log(error)
            setUserRes("Couldn't create user!")
        }
        setShowMessage(true)
        setShowConfirmation(false)
    }
    const handleConfirmSave = async (e) => {
        e.preventDefault()
        try {
            let response = await createShop(data);
            setRes(response)
        } catch (error) {
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
        <>
            <>
                <form className="cr-f-container" onSubmit={handleConfirm}>
                    <div className="header-Con">
                        <p id="header" className="header">Create User</p>
                        {showMessage && <p className={userRes == "User created successsfully!" ? "msg-box-tue" : "msg-box-false"}>{userRes}</p>
                        }
                    </div>
                    <div className="form-container">
                        <div>
                            <label>Username:</label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text" required
                                name="username"
                                placeholder="Username"
                                onChange={handleUserInputChange}
                                readOnly={isUserCreated}

                            />
                        </div>
                        <div>
                            <label>First Name: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text" required
                                name="first_name"
                                placeholder="First Name"
                                onChange={handleInputChange}
                                readOnly={isUserCreated}

                            />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                id={`${passwordStrength.toLowerCase()}`}
                                type="password" required
                                name="password"
                                placeholder="Password"
                                onChange={handleUserInputChange}
                                readOnly={isUserCreated}
                            />
                        </div>
                        <div>
                            <label>Last Name: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text" required
                                name="last_name"
                                placeholder="Last Name"
                                onChange={handleUserInputChange}
                                readOnly={isUserCreated}
                            />
                        </div>

                    </div>
                    <button className="cr-save" type="submit">Create</button>
                    {showConfirmation && (
                        <>
                            <div className="overlay"></div>
                            <div className="confirmation-box">
                                <p>Are you sure you want to save these changes?</p>
                                <button className="confirm-button" onClick={handleUserConfirmSave}>Yes, I am sure</button>
                                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </>
                    )}
                </form>
            </>
      <form className="cr-f-container" onSubmit={handleConfirm}>
            <div className="header-Con">
                <p id="header" className="header">Create Shop</p>
                    {
                        showMessage && <p className={res.status? "msg-box-true": "msg-box-false"}>{res.message}</p>
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
                            readOnly={!isUserCreated}
                    />
                </div>
                <div>
                    <label>Category:</label>
                  <input className="shop-input" autoComplete="off" required
                        type="text"
                        name="category"
                        placeholder="Category"
                            onChange={handleInputChange}
                            readOnly={!isUserCreated}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                  <input className="shop-input" autoComplete="off" required
                        type="url"
                        name="image_url"
                        placeholder="Image Url"
                            onChange={handleInputChange}
                            readOnly={!isUserCreated}
                    />
                </div>
                <div>
                    <label>Theme Color:</label>
                  <input id="theme-color"  className="shop-input" autoComplete="off" required 
                        type="color"
                        name="theme_color"
                        placeholder="Theme Color"
                            onChange={handleInputChange}
                            readOnly={!isUserCreated}
                            disabled={!isUserCreated} 

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
        
        </>
)}

export default CreateShop;