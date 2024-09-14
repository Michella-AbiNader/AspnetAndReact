using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using AspnetAndReact.Server.Controllers;
using Newtonsoft.Json;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [RouteAttribute("/[controller]/[action]")]
    public class ShopController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string query = "SELECT * FROM shops";
            SqlOperations sql = new SqlOperations();
            var response = sql.sqlToDataTable(query);
            DataTable dataTable = response.dt;
            if (!response.isSuccess || dataTable.Rows.Count == 0)
            {
                return "No shops found";
            }
            string shops = sql.DataTableToJsonObj(dataTable);
            return shops;
        }
        [HttpGet]
        public string GetById(int id)
        {
            string query = "SELECT * FROM shops WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Shop doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string GetByUserId(int userId)
        {
            string query = "SELECT * FROM shops WHERE user_id = @userId";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@userId", userId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "This user is not a shop owner";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string GetByCategory(string category)
        {
            string query = "SELECT * FROM shops WHERE category = @category";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@category", category);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "No shops found!";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string GetBySearch(string search)
        {
            string query = "SELECT * FROM products WHERE name LIKE %@search%";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@search", search);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Shop doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpPost]
        public string Post([FromBody] Shop shop)
        {
            string query = "INSERT INTO shops(name, category, image_url, theme_color, user_id)" +
                "VALUES(@name, @category, @image_url, @theme_color, @user_id);";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@name", shop.Name),
               new SqlParameter("@category", shop.Category),
               new SqlParameter("@image_url", shop.ImageUrl),
               new SqlParameter("@theme_color", shop.ThemeColor),
               new SqlParameter("@user_id", shop.UserId)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                var response = new
                {
                    status = false,
                    message = "Couldn't create shop!"

                };
                return JsonConvert.SerializeObject(response);
            }
            var res = new
            {
                status = true,
                message = "Shop created successfully!"

            };
            return JsonConvert.SerializeObject(res);
        }
        [HttpPut]
        public string Put(int id, [FromBody] Shop shop)
        {
            string query = "UPDATE shops SET name = @name, category = @category, image_url = @image_url, " +
                "theme_color = @theme_color WHERE id = @id;";

            SqlParameter[] sqlParameters = new SqlParameter[]
               {
                new SqlParameter("@id", id),
                new SqlParameter("@name", shop.Name),
                new SqlParameter("@category", shop.Category),
                new SqlParameter("@image_url", shop.ImageUrl),
                new SqlParameter("@theme_color", shop.ThemeColor)
               };
            SqlOperations sql = new SqlOperations();
            bool result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                var response = new
                {
                    status = false,
                    message = "Couldn't update shop! Wrong input provided."

                };
                return JsonConvert.SerializeObject(response);
            }
            var res = new
            {
                status = true,
                message = "Shop created successfully!"

            };
            return JsonConvert.SerializeObject(res);
        }
        [HttpDelete]
        public string Delete(int id)
        {
            SqlOperations sql = new SqlOperations();

            string shopQuery = "DELETE FROM shops WHERE id = @id";
            SqlParameter[] shopParams = { new SqlParameter("@id", id) };

            string productQuery = "DELETE FROM products WHERE shop_id = @id";
            SqlParameter[] productParams = { new SqlParameter("@id", id) };

            string[] queries = { productQuery, shopQuery };
            SqlParameter[][] parameters = { shopParams, productParams };

            bool result = sql.ExecuteSqlTransaction(queries, parameters);

            if (result)
            {
                var response = new
                {
                    status = true,
                    message = "Shop and related products deleted successfully!"

                };
                return JsonConvert.SerializeObject(response);
            }
            var res= new
            {
                status = false,
                message = "Couldn't delete shop! Error occurred during deletion."

            };
            return JsonConvert.SerializeObject(res);
        }
    }
}
