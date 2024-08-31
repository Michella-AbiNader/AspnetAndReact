using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.RouteAttribute("/[controller]/[action]")]
    public class CategoryController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string query = "SELECT id, name FROM category";
            SqlOperations sql = new SqlOperations();
            var response = sql.sqlToDataTable(query);
            DataTable dataTable = response.dt;
            if (!response.isSuccess || dataTable.Rows.Count == 0)
            {
                return "No categories found";
            }
            string categories = sql.DataTableToJsonObj(dataTable);
            return categories;
        }

        [HttpPost]
        public string Post([FromBody]Category category)
        {
            string query = "INSERT INTO category(name, image_url)" +
                "VALUES(@name, @image_url);";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@name", category.Name),
               new SqlParameter("@image_url", category.ImageUrl)
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Category already exists";
            }
            return "Category added successfully!";
        }

        [HttpPut]
        public string Put(int id, [FromBody] Category category)
        {
            string query = "UPDATE category SET image_url = @image_url WHERE id = @id;";

            SqlParameter[] sqlParameters = new SqlParameter[]
               {
                new SqlParameter("@id", id),
                new SqlParameter("@image_url", category.ImageUrl)
               };
            SqlOperations sql = new SqlOperations();
            bool result = sql.executeSql(query, sqlParameters);
                if (!result)
                {
                    return "Wrong id or input provided";
                }
            return "User updated successfully!";
        }

        [HttpDelete]
        public string Delete(int id)
        {
            string query = "DELETE FROM category WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (result) 
            {
                return "User deleted successfully!";
            }
            return "Wrong Id provided";
        }


    }
}
