/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../Styles/ListTable.css';

function ListTable({ list }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filtered list based on search query
    const filteredList = list.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="List-Container">
            <div className='header-Container'>
                <p className="header">Shops List</p>
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
                                <th></th>
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
                                    <td>View button / Delete button</td>
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
