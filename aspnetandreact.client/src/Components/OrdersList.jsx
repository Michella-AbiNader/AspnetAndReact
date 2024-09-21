import { useState, useContext, useEffect } from 'react'
import UserContext from './UserContext';
import { getOrders, getOrdersStatus, getOrdersLocations } from '../Services/SalesServices'
function OrdersList() {
     const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [ordersStatus, setOrdersStatus] = useState([]);
    const [ordersLcoations, setOrdersLocations] = useState([]);


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



    return (
        <>
        <div className="List-Container">
            <div className="header-Container">
                <p className="header">Orders List</p>
            </div>
            <div className="table-container">
                {orders.length > 0 ? (
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
                            {orders.map(item => (
                                <tr key={item.order_id}>
                                    <td>{item.username}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.location}</td>
                                    <td>{item.date_of_order}</td>
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
            <div className="List-Container">
                <div className="header-Container">
                    <p className="header">Orders Status</p>
                </div>
                <div className="table-container">
                    {ordersStatus.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersStatus.map(item => (
                                    <tr key={item.order_count}>
                                        <td>{item.status}</td>
                                        <td>{item.order_count}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            </div>
            <div className="List-Container">
                <div className="header-Container">
                    <p className="header">Orders Locations</p>
                </div>
                <div className="table-container">
                    {ordersLcoations.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Location</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersLcoations.map(item => (
                                    <tr key={item.order_count}>
                                        <td>{item.location}</td>
                                        <td>{item.order_count}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            </div>
        </>
  );
}

export default OrdersList;