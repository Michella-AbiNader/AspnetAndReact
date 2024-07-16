using Microsoft.AspNetCore.Mvc;
using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using System.Data;
using System.Data.SqlClient;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [RouteAttribute("/[controller]/[action]")]
    public class OrderController : ControllerBase
    {
        [HttpGet]
        //Get sales of each product
        public string Get(int shopId)
        {
            //join tables to get the name and priceof the product an dshow the name and the quantity and the amout
            string query = "SELECT product_id, name, price, SUM([orders].quantity) AS total_quantity, SUM(orders.quantity * price) AS total " +
                " FROM [orders] JOIN products " +
                "ON [orders].product_id = products.id" +
                " WHERE [orders].shop_id = @shopId GROUP BY product_id, name, price";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shopId", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "No orders";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        //Get the orders grouped by users
        public string GetOrder(int shopId)
        {
            //join tables to get the name and priceof the product an dshow the name and the quantity and the amout
            string query = "SELECT username, location, name, [orders].quantity, price, status, SUM(orders.quantity * price) AS total " +
                "FROM [orders], users, products" +
                " WHERE [orders].user_id = users.id And [orders].product_id = products.id AND [orders].shop_id = @shopId " +
                "ORDER BY username;";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shopId", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "No orders";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpPost]
        public string Post([FromBody] Order order)
        {
            string query = "INSERT INTO orders (user_id, product_id, shop_id, quantity, location, date_of_order, status) " +
                "VALUES(@user_id, @product_id, @shop_id, @quantity, @location, @date_of_order, @status);";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@user_id", order.UserId),
               new SqlParameter("@product_id", order.ProductId),
               new SqlParameter("@shop_id", order.ShopId),
               new SqlParameter("@quantity", order.Quantity),
               new SqlParameter("@location", order.Location),
               new SqlParameter("@date_of_order", order.DateOfOrder),
               new SqlParameter("@status", order.Status)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Order already exists";
            }
            return "Order added successfully!";
        }
        [HttpPut]
        //Update the status of the order
        public string Put(string status, int id)
        {
            string query = "UPDATE orders SET status = @status WHERE id = @id ;";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@status", status),
               new SqlParameter("@id", id)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Can't update order";
            }
            return "Order updated successfully!";
        }

        [HttpDelete]
        public string Delete(int id)
        {
            string query = "DELETE FROM order WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (result)
            {
                return "Order deleted successfully!";
            }
            return "Wrong Id provided";
        }
    }
}
