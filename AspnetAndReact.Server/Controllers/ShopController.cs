using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

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
            string query = "INSERT INTO shops(name, category, image_url, theme-color, user_id)" +
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
                return "Shop already exists";
            }
            return "Shop added successfully!";
        }
        [HttpPut]
        public string Put(int id, [FromBody] Shop shop)
        {
            string query = "UPDATE shops SET name = @name, category = @category, image_url = @image_url, " +
                "theme-color = @theme_color WHERE id = @id;";

            SqlParameter[] sqlParameters = new SqlParameter[]
               {
                new SqlParameter("@id", id),
                new SqlParameter("@name", shop.Name),
                new SqlParameter("@description", shop.Category),
                new SqlParameter("@image_url", shop.ImageUrl),
                new SqlParameter("@theme_color", shop.ThemeColor)
               };
            SqlOperations sql = new SqlOperations();
            bool result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Wrong id or input provided";
            }
            return "Shop updated successfully!";
        }
        [HttpDelete]
        public string Delete(int id)
        {
            string query = "DELETE FROM shops WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (result)
            {
                return "Shop deleted successfully!";
            }
            return "Wrong Id provided";
        }
    }
}
