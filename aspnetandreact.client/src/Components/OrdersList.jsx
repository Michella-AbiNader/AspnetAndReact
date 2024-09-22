import { useState, useContext, useEffect } from 'react'
import UserContext from './UserContext';
import { getOrders, getOrdersStatus, getOrdersLocations } from '../Services/SalesServices'
import '../Styles/OrdersList.css'
import SalesChart from '../Components/SalesChart'
import PieChart from '../Components/PieChart'
function OrdersList() {
     const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [ordersStatus, setOrdersStatus] = useState([]);
    const [ordersLcoations, setOrdersLocations] = useState([]);
    const [filterQuery, setFilterQuery] = useState('');
    const [filterType, setFilterType] = useState('buyer'); // default filter is by name

    // Filter the orders list based on the selected filter type
    const filteredOrders = orders.filter(order => {
        if (filterType === 'buyer') {
            return order.username.toLowerCase().includes(filterQuery.toLowerCase());
        } else if (filterType === 'location') {
            return order.location.toLowerCase().includes(filterQuery.toLowerCase());
        } else if (filterType === 'date') {
            return order.date_of_order.includes(filterQuery);
        } else if (filterType === 'product name') {
            return order.product_name.includes(filterQuery);
        } else if (filterType === 'status') {
            return order.status.includes(filterQuery);
        }
        return order;
    });

    const handleFilterChange = (e) => {
        setFilterQuery(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders(user.shop_id);
                const statusRes = await getOrdersStatus(user.shop_id);
                const locationRes = await getOrdersLocations(user.shop_id);
                setOrders(res);
                setOrdersStatus(statusRes);
                setOrdersLocations(locationRes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, [user.shop_id]);

    const formatDate = (dateString) => {
        return dateString.split(' ')[0]; // This will take the 'dd/MM/yyyy' part and ignore the time
    };

    return (
        <>
        <div className="List-Container">
            <div className="header-Container">
                    <p className="header">Orders List</p>
                    <div className="filter-container">
                        <select className="filter" value={filterType} onChange={handleFilterTypeChange}>
                            <option value="buyer">Buyer</option>
                            <option value="product name">Product Name</option>
                            <option value="location">Location</option>
                            <option value="date">Date</option>
                            <option value="status">Status</option>
                        </select>
                        <input
                            type="text"
                            className="Search-Bar"
                            placeholder={`Search by ${filterType}`}
                            value={filterQuery}
                            onChange={handleFilterChange}
                        />
                       
                    </div>
            </div>
            <div className="table-container">
                    {filteredOrders.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Buyer</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                {filteredOrders.map(item => (
                                <tr key={item.order_id}>
                                    <td>{item.username}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.location}</td>
                                        <td>{formatDate(item.date_of_order)}</td> 
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No results found</div>
                )}
            </div>
            </div>
            <div className="sales-dashboard">

            <div className="chart-container">
                <SalesChart salesData={ordersStatus}
                    labelKey="status"
                    dataKey1="order_count"
                    dataLabel1="Number of Orders"
                    isMonthChart={false}
                        title="Orders Status"
                        color={user.theme_color}

                />
                </div>
                <div className="chart-container">
                    <PieChart
                        salesData={ordersLcoations}
                        labelKey="location"
                        dataKey="order_count"
                        title="Orders By Location"
                    />
                </div>
            </div>
            
        </>
  );
}

export default OrdersList

    //< div className = "List-Container" >
    //            <div className="header-Container">
    //                <p className="header">Orders Status</p>
    //            </div>
    //            <div className="table-container">
    //                {ordersStatus.length > 0 ? (
    //                    <table className="table">
    //                        <thead>
    //                            <tr>
    //                                <th>Status</th>
    //                                <th>Count</th>
    //                            </tr>
    //                        </thead>
    //                        <tbody>
    //                            {ordersStatus.map(item => (
    //                                <tr key={item.order_count}>
    //                                    <td>{item.status}</td>
    //                                    <td>{item.order_count}</td>

    //                                </tr>
    //                            ))}
    //                        </tbody>
    //                    </table>
    //                ) : (
    //                    <div>No results found</div>
    //                )}
    //            </div>
//        </div >

    //< div className = "List-Container" >
    //            <div className="header-Container">
    //                <p className="header">Orders Locations</p>
    //            </div>
    //            <div className="table-container">
    //                {ordersLcoations.length > 0 ? (
    //                    <table className="table">
    //                        <thead>
    //                            <tr>
    //                                <th>Location</th>
    //                                <th>Count</th>
    //                            </tr>
    //                        </thead>
    //                        <tbody>
    //                            {ordersLcoations.map(item => (
    //                                <tr key={item.order_count}>
    //                                    <td>{item.location}</td>
    //                                    <td>{item.order_count}</td>

    //                                </tr>
    //                            ))}
    //                        </tbody>
    //                    </table>
    //                ) : (
    //                    <div>No results found</div>
    //                )}
    //            </div>
    //        </div >