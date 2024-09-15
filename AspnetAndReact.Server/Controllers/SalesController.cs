using Microsoft.AspNetCore.Mvc;
using AspnetAndReact.Server.Functions;
using System.Data;
using System.Data.SqlClient;
using AspnetAndReact.Server.Models;
namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [RouteAttribute("/[controller]/[action]")]
    public class SalesController : ControllerBase
    {

        //sales report
        [HttpGet]
        public string TotalSales(int shopId)
        {
            string query = "SELECT SUM(p.price * o.quantity) AS total_sales FROM orders o " +
                "JOIN products p ON o.product_id = p.id WHERE o.shop_id = @shop_id AND o.status = 'delivered'; ";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string SalesByProduct(int shopId)
        {
            string query = "SELECT p.name, SUM(o.quantity) AS units_sold, SUM(p.price * o.quantity) " +
                "AS total_sales FROM orders o JOIN products p ON o.product_id = p.id " +
                "WHERE o.shop_id = @shop_id GROUP BY p.name " +
                "ORDER BY total_sales DESC; ";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string MonthlySales(int shopId)
        {
            string query = "SELECT DATEPART(MONTH, o.date_of_order) AS month, " +
                "COUNT(o.id) AS number_of_orders, SUM(p.price * o.quantity) AS total_sales " +
                "FROM orders o JOIN products p ON o.product_id = p.id " +
                "WHERE o.shop_id = @shop_id GROUP BY DATEPART(MONTH, o.date_of_order) " +
                "ORDER BY month;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string BestSellingProducts(int shopId)
        {
            string query = "SELECT p.name, SUM(o.quantity) AS units_sold " +
                "FROM orders o JOIN products p ON o.product_id = p.id " +
                "WHERE o.shop_id = @shop_id GROUP BY p.name " +
                "ORDER BY units_sold DESC LIMIT 10;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }

        //Orders
        [HttpGet]
        public string OrdersStatus(int shopId)
        {
            string query = "SELECT o.status, COUNT(o.id) AS order_count " +
                "FROM orders o WHERE o.shop_id = @shop_id GROUP BY o.status;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string OrdersLocation(int shopId)
        {
            string query = "SELECT o.location, COUNT(o.id) AS order_count " +
                "FROM orders o WHERE o.shop_id = @shop_id GROUP BY o.location " +
                "ORDER BY order_count DESC;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string Orders(int shopId)
        {
            string query = "SELECT o.id AS order_id, u.username, p.name AS product_name, " +
                " o.quantity, o.location, o.date_of_order, " +
                "o.status FROM orders o JOIN users u ON o.user_id = u.id " +
                "JOIN products p ON o.product_id = p.id " +
                "JOIN shops s ON o.shop_id = s.id WHERE o.shop_id = @shop_id GROUP BY o.id " +
                "ORDER BY o.date_of_order DESC;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }

        //inventory
        [HttpGet]
        public string Inventory(int shopId)
        {
            string query = "SELECT p.id AS product_id, p.name AS product_name, " +
                "p.quantity AS available_stock, p.price AS product_price FROM products p " +
                "WHERE o.shop_id = @shop_id  ORDER BY p.name;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shop_id", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Fail";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
    }
}
