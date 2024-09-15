using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspnetAndReact.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        Cryptography crypto = new Cryptography();
        [HttpPost]
        public string register(User user)
        {
            UserController us = new UserController();
            string result = us.Post(user);
            return result;

        }
        [HttpGet]
        public string login(string username, string password)
        {
            var result = crypto.VerifyUser(username, password);
            if (result.type == "shop admin")
            {
                string query = "SELECT theme_color, id, name, category, image_url FROM shops WHERE user_id = @user_id";
                SqlOperations sql = new SqlOperations();
                SqlParameter sqlParam = new SqlParameter("@user_id", result.id);
                var res = sql.sqlToDataTable(query, sqlParam);
               DataTable dataTable = res.dt;
                string theme_color = "";
                string shop_id = "";
                string name = "";
                string category = "";
                string image_url = "";
                if (dataTable != null && dataTable.Rows.Count > 0)
                {
                    theme_color = dataTable.Rows[0]["theme_color"].ToString();
                    shop_id = dataTable.Rows[0]["id"].ToString();
                    name = dataTable.Rows[0]["name"].ToString();
                    category = dataTable.Rows[0]["category"].ToString();
                    image_url = dataTable.Rows[0]["image_url"].ToString();
                }
                var resp = new
                {
                    id = result.id,
                    username = username,
                    res = result.verified,
                    token = result.token,
                    type = result.type,
                    theme_color = theme_color,
                    shop_id = shop_id,
                    name = name,
                    category = category,
                    image_url = image_url,
                };
                return JsonConvert.SerializeObject(resp);
            }
                var response = new 
                {
                    id = result.id,
                    username = username,
                    res = result.verified,
                    token = result.token,
                    type = result.type
                };
                return JsonConvert.SerializeObject(response);
        }
    }
}
