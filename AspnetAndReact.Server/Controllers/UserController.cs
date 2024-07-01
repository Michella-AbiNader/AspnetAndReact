using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.RouteAttribute("/[controller]/[action]")]
    [System.Web.Http.RouteAttribute("/[controller/[action]]")]
    public class UserController: ControllerBase
    {
        [Microsoft.AspNetCore.Mvc.HttpGetAttribute]
        [System.Web.Http.HttpGetAttribute]
        public string Get()
        {
            string query = "SELECT * FROM users";
            SqlOperations sql = new SqlOperations();
            var response = sql.sqlToDataTable(query);
            DataTable dataTable = response.dt;
            if(!response.isSuccess || dataTable.Rows.Count == 0)
            {
                return "No users found";
            }
           string students = sql.DataTableToJsonObj(dataTable);
            return students;
        }

        [Microsoft.AspNetCore.Mvc.HttpGetAttribute]
        public string GetById(int id)
        {
            string query = "SELECT * FROM users WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if(response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "User doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }

        [Microsoft.AspNetCore.Mvc.HttpGetAttribute]
        public string GetType(int id)
        {
            string query = "SELECT type FROM users WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (!response.isSuccess || dataTable.Rows.Count == 0)
            {
                return "User doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }


        [Microsoft.AspNetCore.Mvc.HttpPostAttribute]
        public string Post([System.Web.Http.FromBody] User user)
        {
            Cryptography crypto = new Cryptography();
            string password = crypto.encryptedPassword(user.Password);
            string query = "INSERT INTO users(username, first_name, last_name, password, type)" +
                "VALUES(@username, @first_name, @last_name, @password, @type);" +
                "SELECT SCOPE_IDENTITY() AS userId";

            SqlParameter[] sqlParameters = new SqlParameter[]
           {
                new SqlParameter("@username", user.Username),
                new SqlParameter("@first_name", user.FirstName),
                new SqlParameter("@last_name", user.LastName),
                new SqlParameter("@password", password),
                new SqlParameter("@type", user.Type)
           };
            SqlOperations sql = new SqlOperations();
            var result= sql.sqlToDataTable(query, sqlParameters);
            DataTable userIdDt = result.dt;
            bool isSuccess = result.isSuccess;
            int userId = 0;
            if (userIdDt != null && userIdDt.Rows.Count > 0)
            {
                userId = Convert.ToInt32(userIdDt.Rows[0]["userId"]);
            }
            string token = crypto.generateJwtToken(userId.ToString(), user.Username, user.Type);
            query = "UPDATE users SET token = @token WHERE id = @userId";
            SqlParameter[] parameters = new SqlParameter[]{
                new SqlParameter("@userId", userId),
                new SqlParameter("@token", token)
            };
            sql.executeSql(query, parameters);
            if(!isSuccess)
            {
                return "Username already exists";
            }
            return "User added successfully!";
        }

        [Microsoft.AspNetCore.Mvc.HttpPutAttribute]
        public string Put(int id, [System.Web.Http.FromBody] User user)
        {
            Cryptography crypto = new Cryptography();
            SqlParameter[] sqlParameters;
            string query;
            if (user.Password != null)
            {
                query = "UPDATE users SET first_name = @first_name, last_name = @last_name, password = @password " +
                "WHERE id = @id;";
                string pass = crypto.encryptedPassword(user.Password);
                sqlParameters = new SqlParameter[]
               {
                new SqlParameter("@id", id),
                new SqlParameter("@first_name", user.FirstName),
                new SqlParameter("@last_name", user.LastName),
                new SqlParameter("@password", pass),

               };
            }
            else
            {
                query = "UPDATE users SET first_name = @first_name, last_name = @last_name " +
                "WHERE id = @id;";
                sqlParameters = new SqlParameter[]
                {
                new SqlParameter("@id", id),
                new SqlParameter("@first_name", user.FirstName),
                new SqlParameter("@last_name", user.LastName),
                };
            }            
            SqlOperations sql = new SqlOperations();
            bool result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Wrong input provided";
            }
            return "User updated successfully!";
        }

        [Microsoft.AspNetCore.Mvc.HttpDeleteAttribute]
        public string Delete(int id)
        {
            string query = "DELETE FROM users WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (!result)
            {
                return "Wrong Id provided!";
            }
            return "User deleted successfully!";
        }


    }
}
