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
            string query = "SELECT  products.name, products.price, products.image_url, cart.quantity " +
                "FROM products JOIN cart ON cart.product_id = products.id WHERE cart.user_id = @userId";
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
        //Add new item to cart and incrments te quantity if item is already in cart
        public string Post([FromBody] Cart cart)
        {
            string query = "INSERT INTO cart(user_id, product_id, shop_id, quantity) " +
                "VALUES(@user_id, @product_id, @shop_id, @quantity); ";
                
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@user_id", cart.UserId),
               new SqlParameter("@product_id", cart.ProductId),
               new SqlParameter("@shop_id", cart.ShopId),
               new SqlParameter("@quantity", cart.Quantity)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            //if row already exists in cart, increase the quantity by 1
            if (!result)
            {
                string newQuery = "UPDATE cart SET quantity = quantity + 1 " +
                    "WHERE user_id = @user_id AND product_id = @product_id;";
                SqlParameter[] sqlParam = new SqlParameter[]
                {
                    new SqlParameter("@user_id", cart.UserId),
                    new SqlParameter("@product_id", cart.ProductId),
                    new SqlParameter("@shop_id", cart.ShopId),
                    new SqlParameter("@quantity", cart.Quantity)
                };
                SqlOperations sqlOp = new SqlOperations();
                var newResult = sqlOp.executeSql(newQuery, sqlParam);
                return "Quantity updated";
            }
            return "Item added to cart successfully!";
        }
        //update to change the quantity
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

//for upsert
//--If the product already exists in the user's cart, update the quantity
//IF EXISTS (SELECT 1 FROM cart WHERE user_id = @user_id AND product_id = @product_id)
//BEGIN
//    -- Update the quantity for the existing product in the cart
//    UPDATE cart
//    SET quantity = quantity + @increment_quantity -- or simply `+ 1` if you're always adding 1
//    WHERE user_id = @user_id AND product_id = @product_id;
//END
//ELSE
//BEGIN
//    -- Insert the new product into the cart if it doesn't exist
//    INSERT INTO cart (user_id, product_id, shop_id, quantity)
//    VALUES (@user_id, @product_id, @shop_id, @initial_quantity); --Default initial quantity can be 1
//END

//    for merge:
//    MERGE cart AS target
//USING (VALUES (@user_id, @product_id, @shop_id, @quantity)) AS source (user_id, product_id, shop_id, quantity)
//ON target.user_id = source.user_id AND target.product_id = source.product_id
//WHEN MATCHED THEN
//    -- If the product already exists, update the quantity
//    UPDATE SET target.quantity = target.quantity + source.quantity
//WHEN NOT MATCHED THEN
//    -- If the product does not exist, insert it into the cart
//    INSERT (user_id, product_id, shop_id, quantity)
//    VALUES (source.user_id, source.product_id, source.shop_id, source.quantity);

