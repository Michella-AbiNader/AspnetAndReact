import { useState, useEffect } from 'react';
import '../Styles/ViewEditDetails.css'
import { editShop } from '../Services/ShopServices'
/* eslint-disable react/prop-types */
function ViewEditDetails({ item = [], type }) {
    const [isEditing, setIsEditing] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [data, setData] = useState({ name: "", category: "", image_url: "", theme_color: "" })
    const [productData, setProductData] = useState({name: "", description: "", price: "", quantity: "", image_url: "", category: ""})
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [res, setRes] = useState();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (item.length > 0) {
            setInitialData(item[0]); // Initialize formData based on the incoming item
        }
    }, [item]); 

    const toggleEdit = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
        console.log(data)
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };

    const handleConfirmSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: data.name || initialData.name, // Use formData if data.name is empty
            category: data.category || initialData.category,
            image_url: data.image_url || initialData.image_url,
            theme_color: data.theme_color || initialData.theme_color
        };
        let response
        try {
            if (type === "Shop") {
                response = await editShop(initialData.id, updatedData);
            }

        } catch (error) {
            console.log(error);
        }
        setRes(response);

        setIsEditing(false);
        setShowMessage(true);
        setShowConfirmation(false);
    };

    return (
        <div className="view-container">
            <form className="f-container">
                {/* Conditional fields based on item type */}
                {type === "Shop" && (
                    <>
                        <div className="header-Con">
                            <p id="header" className="header">{type} Details</p>
                            {showMessage && <p className="msg-box">{res}</p>}
                        </div>
                        <div className="form-container">
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                    placeholder={initialData.name || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                    placeholder={initialData.category || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Image URL:</label>
                            <input
                                type="text"
                                name="image_url"
                                    placeholder={initialData.image_url || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Theme Color:</label>
                            <input
                                type="text"
                                name="theme_color"
                                    placeholder={initialData.theme_color || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            {!isEditing ? (
                                <button className="edit" onClick={toggleEdit}>Edit</button>
                            ) : (
                                <>
                                    <button className="cancel" onClick={toggleEdit}>Cancel</button>
                                    <button className="save" onClick={handleSaveClick}>Save</button>
                                </>
                            )}
                            </div>
                        </div>
                    </>
                )}
                {type === "Product" && (
                    <>
                        <div className="header-Con">
                            <p id="header" className="header">{type} Details</p>
                            {showMessage && <p className="msg-box">{res}</p>}
                        </div>
                        <div className="form-container">
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={initialData.name || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Category:</label>
                                <input
                                    type="text"
                                    name="category"
                                    placeholder={initialData.category || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Image URL:</label>
                                <input
                                    type="text"
                                    name="image_url"
                                    placeholder={initialData.image_url || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <input
                                    type="text"
                                    name="theme_color"
                                    placeholder={initialData.description || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Price:</label>
                                <input
                                    type="text"
                                    name="theme_color"
                                    placeholder={initialData.price || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Quantity:</label>
                                <input
                                    type="text"
                                    name="theme_color"
                                    placeholder={initialData.quantity || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Category:</label>
                                <input
                                    type="text"
                                    name="theme_color"
                                    placeholder={initialData.category || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                {!isEditing ? (
                                    <button className="edit" onClick={toggleEdit}>Edit</button>
                                ) : (
                                    <>
                                        <button className="cancel" onClick={toggleEdit}>Cancel</button>
                                        <button className="save" onClick={handleSaveClick}>Save</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </form>
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
        </div>
    );
}

export default ViewEditDetails;
