import { useState } from "react";

function CreateUser() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [res, setRes] = useState()
    const [userData, setUserData] = useState({
        username: "", first_name: "", last_name: "", password: "", type: "shop admin"
    })
    const handleConfirm = (e) => {
        e.preventDefault()
        setShowConfirmation(true);
    }
    const handleUserInputChange = (e) => {
        //const { name, value } = e.target;
        //if (name === 'category') {
        //    setData({
        //        ...data,
        //        category_id: value, // Set category_id to the selected category's ID
        //    });
        //} else {
        //    setData({
        //        ...data,
        //        [e.target.name]: e.target.value
        //    })
        //}
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    const handleConfirmSave = async (e) => {
        e.preventDefault()
        //    try {
        //        let response = await createProduct(data);
        //        setRes(response)
        //    } catch (error) {
        //        setRes(error)
        //        console.log(error);
        //    }
        //    setShowMessage(true)
        //    setShowConfirmation(false)
        //    var elements = document.getElementsByClassName("product-input")
        //    for (let element of elements) {
        //        element.value = ""
        //    }
        }

        return (
            <>
                <form className="cr-f-container" onSubmit={handleConfirm}>
                    <div className="header-Con">
                        <p id="header" className="header">Create User</p>
                        {showMessage && <p className="msg-box">{res}</p>
                        }
                    </div>
                    <div className="form-container">
                        <div>
                            <label>Username:</label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text" required
                                name="username"
                                placeholder="Username"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>First Name: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text"  required
                                name="first_name"
                                placeholder="First Name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="password" required
                                name="first_name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Last Name: </label>
                            <input className="product-input" autoComplete="off" maxLength="40"
                                type="text" required
                                name="last_name"
                                placeholder="Last Name"
                                onChange={handleInputChange}
                            />
                        </div>
                       
                    </div>
                    <button className="cr-save" type="submit">Create</button>
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
                </form>
            </>
        );
    }

export default CreateUser;