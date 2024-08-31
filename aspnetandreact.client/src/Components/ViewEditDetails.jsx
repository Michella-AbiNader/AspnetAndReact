import { useState, useEffect } from 'react';
import '../Styles/ViewEditDetails.css'
import { editShop } from '../Services/ShopServices'
import { getCategories } from '../Services/CategoryServices'
import { editProduct } from '../Services/ProductsServices';
/* eslint-disable react/prop-types */
function ViewEditDetails({ item = [], type }) {
    const [isEditing, setIsEditing] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [data, setData] = useState({ name: "", category: "", image_url: "", theme_color: "" })
    const [productData, setProductData] = useState({name: "", description: "", price: "", quantity: "", image_url: "", category_id: ""})
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [res, setRes] = useState();
    const [showMessage, setShowMessage] = useState(false);
    const [categories, setCategories] = useState({})

    useEffect(() => {
        if (item.length > 0) {
            setInitialData(item[0]); // Initialize formData based on the incoming item
        }
    }, [item])
        ; 
    const fetchCategories = async () => {
        try {
            const category = await getCategories()
            setCategories(category);
        } catch (error) {
            console.log(error);
        }
    };


    const toggleEdit = (e) => {
        e.preventDefault();
        if (type === 'Product' && isEditing == false) {
            fetchCategories()
        }
        setIsEditing(!isEditing);
        
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (type == "Shop") {
            setData({
                ...data,
                [name]: value,
            });
            console.log(data)
        }
        else {
            if (name === 'category') {
                // Assuming value is the category ID
                setProductData({
                    ...productData,
                    category_id: value, // Set category_id to the selected category's ID
                });
            }
            else {
                setProductData({
                    ...productData,
                    [name]: value,
                });
            }
            
            console.log(data)
        }
        
    };

    const handleCancelEdit = (e) => {
        e.preventDefault()
        toggleEdit(e)
        //reset the value of each field to empty
        let elements
        if (type == "Shop") {
            elements = document.getElementsByClassName("shop-input")
            for (let element of elements) {
                element.value = ""
            }
        }
        else {
            elements = document.getElementsByClassName("product-input")
            for (let element of elements) {
                element.value = ""
            }
        }
    }

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
        let response
        if (type == "Shop") {
            const updatedData = {
                name: data.name || initialData.name, // Use formData if data.name is empty
                category: data.category || initialData.category,
                image_url: data.image_url || initialData.image_url,
                theme_color: data.theme_color || initialData.theme_color
            };
            try {
                response = await editShop(initialData.id, updatedData);


            } catch (error) {
                console.log(error);
            }
        }
        else {
            const updatedData = {
                name: productData.name || initialData.name, // Use formData if data.name is empty
                description: productData.description || initialData.description,
                price: productData.price|| initialData.price,
                quantity: productData.quantity || initialData.quantity,
                image_url: productData.image_url || initialData.image_url,
                category_id: productData.category_id || initialData.category_id,
            };
            try {
                response = await editProduct(initialData.id, updatedData);
            } catch (error) {
                console.log(error);
            }
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
                                <input className="shop-input" autoComplete="off" maxLength="40"
                                type="text"
                                name="name"
                                placeholder={initialData.name || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                                <input className="shop-input" autoComplete="off" maxLength="20"
                                type="text"
                                name="category"
                                    placeholder={initialData.category || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Image URL:</label>
                                <input className="shop-input" autoComplete="off"
                                type="url"
                                name="image_url"
                                placeholder={initialData.image_url || ''}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Theme Color:</label>
                                <input className="shop-input" autoComplete="off" id="theme-color"
                                type="color"
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
                                    <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
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
                                <input className="product-input" autoComplete="off" maxLength="40"
                                    type="text"
                                    name="name"
                                    placeholder={initialData.name || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Price: </label>
                                <input className="product-input" id="price" autoComplete="off"
                                    type="number" min="1"
                                    name="price"
                                    placeholder={initialData.price || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            
                            <div>
                                <label>Image Url: </label>
                                <input className="product-input" autoComplete="off" 
                                    type="url"
                                    name="image_url"
                                    placeholder={initialData.image_url || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            <div>
                                <label>Quantity: </label>
                                <input className="product-input" id="quantity" autoComplete="off"
                                    type="number" min="1"
                                    name="quantity"
                                    placeholder={initialData.quantity || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                />
                            </div>
                            
                            <div>
                                <label id="lbl_desc">Description: </label>
                                <textarea className="product-input" id="description" autoComplete="off"
                                    rows="4" cols="50" maxLength="100"
                                    type="text"
                                    name="description"
                                    placeholder={initialData.description || ''}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                ></textarea>
                            </div>
                            <div>
                                <label>Category:</label>
                                {!isEditing ? (<>
                                    <input className="product-input" autoComplete="off"
                                        type="text"
                                        name="category"
                                        placeholder={initialData.category_name || ''}
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                    /></>) :
                                    <>
                                        <select className="product-input" id="drpdown-input"
                                            name="category"
                                            onChange={handleInputChange}
                                            value={productData.category_id}
                                        >
                                            {categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <option value={cat.id} key={cat.id} >
                                                        {cat.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>No categories available</option>
                                            )}
                                        </select>
                                    </>
                                }
                            </div>
                            <div>
                                {!isEditing ? (
                                    <button className="edit" onClick={toggleEdit}>Edit</button>
                                ) : (
                                    <>
                                            <button className="cancel" onClick={handleCancelEdit}>Cancel</button>
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

//selected={cat.id == initialData.category_id }