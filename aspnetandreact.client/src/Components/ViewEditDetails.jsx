import { useState, useEffect } from 'react';
import '../Styles/ViewEditDetails.css'
/* eslint-disable react/prop-types */
function ViewEditDetails({ item = [], type }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);


    useEffect(() => {
        if (item.length > 0) {
            setFormData(item[0]);
        }
    }, [item]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        setShowConfirmation(true)
    };
    const handleCancel = () => {
        setShowConfirmation(false)
    }
    const handleConfirmSave = async (e) => {
        if (type == "Shop") {

        }
        //handle save in database
        setShowConfirmation(false);
    };

    return (
        <div className="view-container">
            <form className="form-container">
                {/* Conditional fields based on item type */}
                {type === "Shop" && (
                    <>
                        <div className="header-Container">
                        <p id="header" className="header">{type} Details</p>
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Image URL:</label>
                            <input
                                type="text"
                                name="image_url"
                                value={formData.image_url || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Theme Color:</label>
                            <input
                                type="text"
                                name="theme_color"
                                value={formData.theme_color || ''}
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
                    </>
                )}
                {
                    //manage the product fields: category, add image_url
                }
                {type === "Product" && (
                    <>
                        <div>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Stock:</label>
                            <input
                                type="text"
                                name="stock"
                                value={formData.stock || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                    </>
                )}
            </form>
            {showConfirmation && (
                <>
                    <div className="overlay"></div>
                    <div className="confirmation-box">
                        <p>Are you sure you want to these changes?</p>
                        <button className="confirm-button" onClick={handleConfirmSave}>Yes, I am sure</button>
                        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ViewEditDetails;
