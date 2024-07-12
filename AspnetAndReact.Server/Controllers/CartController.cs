using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [RouteAttribute("/[controller]/[action]")]
    public class CartController : ControllerBase
    {
        [HttpGet]
        public string Get(int userId)
        {
            string query = "SELECT * FROM cart WHERE user_id = @userId";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@userId", userId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Cart is empty";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpPost]
        public string Post([FromBody] Cart cart)
        {
            string query = "INSERT INTO cart(user_id, product_id, shop_id, quantity)" +
                "VALUES(@user_id, @product_id, @shop_id, @quantity);";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@user_id", cart.UserId),
               new SqlParameter("@product_id", cart.ProductId),
               new SqlParameter("@shop_id", cart.ShopId),
               new SqlParameter("@quantity", cart.Quantity)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                //send a query to update the quantity where product id and user id are not unique
                return "Can't add item to cart";
            }
            return "Item added to cart successfully!";
        }
        [HttpDelete]
        public string Delete(int id)
        {
            string query = "DELETE FROM cart WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (result)
            {
                return "Item removed from cart successfully!";
            }
            return "Wrong Id provided";
        }
    }
}
