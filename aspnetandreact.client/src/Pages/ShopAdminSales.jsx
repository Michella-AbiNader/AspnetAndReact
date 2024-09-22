import { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import SalesChart from '../Components/SalesChart';
import { getMonthlySales, getBestSellingProducts, getSalesByProduct, getTotalSales } from '../Services/SalesServices';
import { useContext } from 'react';
import UserContext from '../Components/UserContext';
import '../Styles/ShopAdminSales.css'; // Import the CSS
import LineChart from '../Components/LineChart';

function ShopAdminSales() {
    const [data, setdata] = useState([]);
    const [bestSelling, setBestSelling] = useState([])
    const [salesByProd, setSalesByProd] = useState([])
    const [totalSales, setTotalSales] = useState([])
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getMonthlySales(user.shop_id);
                const bestSellingRes = await getBestSellingProducts(user.shop_id);
                const salesByProdRes = await getSalesByProduct(user.shop_id);
                const totalSalesRes = await getTotalSales(user.shop_id);
                setdata(res);
                setBestSelling(bestSellingRes);
                setSalesByProd(salesByProdRes);
                setTotalSales(totalSalesRes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, [user.shop_id]);

    return (
        <>
            <NavBar />
            <div className="view-Container">
                    <div className="header-Con">
                    <p id="header" className="header">Total Sales: {totalSales.map(item => item.total_sales)} $</p>
                </div>
                    </div>
            <div className="sales-dashboard">
                {/* First chart */}
                <div className="chart-container">
                    <SalesChart salesData={data}
                        labelKey="month"
                        dataKey1="total_sales"
                        dataLabel1="Total Sales"
                        isMonthChart={true}
                        title="Total Sales Per Month"
                        color={user.theme_color}
                    />
                </div>
                <div className="chart-container">
                        <SalesChart salesData={data}
                            labelKey="month"
                            dataKey1="number_of_orders"
                            dataLabel1="Number of Orders"
                            isMonthChart={true}
                        title="Total Orders Per Month"
                        color={user.theme_color}

                        />
                </div>
                <div className="chart-container">

                <LineChart
                    salesData={salesByProd}  // Pass the backend data
                    labelKey="name"              // Key for labels (e.g., months)
                    dataKey="total_sales"          // Key for the data points (e.g., total sales)
                    dataLabel="Total Sales"       // Label for the dataset
                        title="Total Sales By Product"
                        color={user.theme_color}

                    />
                </div>

                    <div className="chart-container">
                        <SalesChart salesData={bestSelling}
                            labelKey="name"
                            dataKey1="units_sold"
                            dataLabel1="Units Sold"
                            isMonthChart={false}
                        title="Best Selling Products"
                        color={user.theme_color}

                        />
                </div>

</div>
        </>
    );
}

export default ShopAdminSales;