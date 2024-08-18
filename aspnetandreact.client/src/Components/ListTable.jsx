/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../Styles/ListTable.css';
//import '../Components/DeleteButton'
import DeleteButton from '../Components/DeleteButton';
import { deleteShop } from '../Services/ShopServices';

function ListTable({ list=[], type }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [res, setRes] = useState() 
    const [showMessage, setShowMessage] = useState(false)

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtered list based on search query
    const filteredList = list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (e,id, type) => {
        var response;
        e.preventDefault();
        if (type == "Shops") {
            try {
                response = await deleteShop(id)
            } catch (error) {
                console.log(error)
            }
            setRes(response)
            setShowMessage(true)
        }
    };

    return (
        <div className="List-Container">
            <div className='header-Container'>
                <p className="header">{type} List</p>
                {showMessage ? <p className="message-box">Message to show {res}</p> : "" }
                <input
                    className="Search-Bar"
                    placeholder="Search Name"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="table-container">
                {filteredList && filteredList.length > 0 ? (
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
                                    <td> <button>Edit button</button>
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
