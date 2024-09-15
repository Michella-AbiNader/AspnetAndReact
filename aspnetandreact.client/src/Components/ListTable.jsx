/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import '../Styles/ListTable.css';
//import '../Components/DeleteButton'
import DeleteButton from '../Components/DeleteButton';
import { deleteShop } from '../Services/ShopServices';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../Services/ProductsServices';
import UserContext from '../Components/UserContext'

function ListTable({ list = [], setList, type, shopId="" }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [res, setRes] = useState(null) 
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtered list based on search query
    const filteredList = Array.isArray(list) ? list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
    const handleDelete = async (e,id, type) => {
        e.preventDefault();
        try {
            let response;
            if (type === "Shops") {
                response = await deleteShop(id);
            } else {
                response = await deleteProduct(id);
            }

            if (response.status) {
                // If deletion was successful, update the list by filtering out the deleted item
                if (filteredList.length == 1) {
                    setList([])
                } else {
                    setList(prevList => prevList.filter(item => item.id !== id));

                }
                setRes({ status: response.status, message: response.message});
            } else {
                setRes({ status: response.status, message: response.message });
            }
            setShowMessage(true);
        } catch (error) {
            console.log(error);
            setRes({ status: false, message: "An error occurred during deletion." });
            setShowMessage(true);
        }
    };
    const handleViewClick = (id) => {
        if (type == "Shops") {
                navigate(`/system-admin/shop/${id}`)
        } else {
            if (user.type == "shop admin") {
                navigate(`/admin/product/${id}`)
            } else {
                navigate(`/system-admin/product/${id}`)
            }
        }

    }

    const handleCreateProduct = () => {
        if (user.type == "shop admin") {
            navigate(`/admin/createproduct/${shopId}`)
        } else {
            navigate(`/system-admin/createproduct/${shopId}`)
        }
    }

    return (
        <div className="List-Container">
            <div className="header-Container">
                <p className="header">{type} List</p>
                {showMessage && <p className={res.status? "message-box-true": "message-box-false"}>{res.message}</p>}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {type === "Products" && (
                        <button className="createButton" onClick={handleCreateProduct}>
                            <span className="plus-icon">+</span>
                            <p>Create Product</p>
                        </button>
                    )}
                    <input
                        className="Search-Bar"
                        placeholder="Search Name"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="table-container">
                {filteredList.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Logo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td> <button className="edit-button" onClick={() => handleViewClick(item.id)}>
                                        {type == "Shops" ? "View" : "Edit"}
                                    </button>
                                        <DeleteButton id={item.id} type={type} onDelete={handleDelete }>Delete button </DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No results found</div>
                )}
            </div>
        </div>
    );
}

export default ListTable;
