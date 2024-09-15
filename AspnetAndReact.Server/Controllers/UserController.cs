using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
                return JsonConvert.SerializeObject(new {token = "", res = "Username already exists" });
            }
            return JsonConvert.SerializeObject(new { id= userId, token = token, res = "User added successfully" });
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

        [Microsoft.AspNetCore.Mvc.HttpPostAttribute]
        public string CreateUserAndShop( UserShop model)
        {
            User user = model.User;
            Shop shop = model.Shop;
            Cryptography crypto = new Cryptography();
            string password = crypto.encryptedPassword(user.Password);

            // Query to create the user and retrieve the new user ID
            string userQuery = "INSERT INTO users(username, first_name, last_name, password, type)" +
                               "VALUES(@username, @first_name, @last_name, @password, @type);" +
                               "SELECT SCOPE_IDENTITY() AS userId"; // Retrieve the newly inserted user's ID

            // Parameters for user creation
            SqlParameter[] userParameters = new SqlParameter[]
            {
        new SqlParameter("@username", user.Username),
        new SqlParameter("@first_name", user.FirstName),
        new SqlParameter("@last_name", user.LastName),
        new SqlParameter("@password", password),
        new SqlParameter("@type", user.Type)
            };

            // Shop insert query (userId will be added later)
            string shopQuery = "INSERT INTO shops(name, category, image_url, theme_color, user_id)" +
                               "VALUES(@name, @category, @image_url, @theme_color, @user_id)";

            // Shop parameters (we will update @user_id after we get the actual userId)
            SqlParameter[] shopParameters = new SqlParameter[]
            {
        new SqlParameter("@name", shop.Name),
        new SqlParameter("@category", shop.Category),
        new SqlParameter("@image_url", shop.ImageUrl),
        new SqlParameter("@theme_color", shop.ThemeColor),
        new SqlParameter("@user_id", 0) // Placeholder, will be updated later with the actual userId
            };

            SqlOperations sqlOperations = new SqlOperations();
            DataTable userIdDt;
            bool isSuccess;
                    string connectionString = "Data Source=DESKTOP-5GQU1D3;Initial Catalog=Shopping_App;User ID=micha; Password=micha123 ";

            // Start a transaction to handle both operations (user creation and shop creation)
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlTransaction transaction = sqlConnection.BeginTransaction())
                {
                    try
                    {
                        // 1. Insert the user and retrieve the new userId
                        using (SqlCommand userCommand = new SqlCommand(userQuery, sqlConnection, transaction))
                        {
                            userCommand.Parameters.AddRange(userParameters);
                            using (SqlDataAdapter adapter = new SqlDataAdapter(userCommand))
                            {
                                userIdDt = new DataTable();
                                adapter.Fill(userIdDt);
                            }
                        }

                        // Check if we got the userId
                        if (userIdDt != null && userIdDt.Rows.Count > 0)
                        {
                            int userId = Convert.ToInt32(userIdDt.Rows[0]["userId"]);

                            // 2. Update the shopParameters with the correct userId
                            shopParameters[4].Value = userId; // Set the @user_id parameter to the correct value

                            // 3. Insert the shop
                            using (SqlCommand shopCommand = new SqlCommand(shopQuery, sqlConnection, transaction))
                            {
                                shopCommand.Parameters.AddRange(shopParameters);
                                shopCommand.ExecuteNonQuery();
                            }

                            // 4. Generate a JWT token for the user
                            string token = crypto.generateJwtToken(userId.ToString(), user.Username, user.Type);

                            // 5. Update the user with the generated token
                            string updateTokenQuery = "UPDATE users SET token = @token WHERE id = @userId";
                            SqlParameter[] tokenParams = new SqlParameter[]
                            {
                        new SqlParameter("@token", token),
                        new SqlParameter("@userId", userId)
                            };

                            using (SqlCommand tokenCommand = new SqlCommand(updateTokenQuery, sqlConnection, transaction))
                            {
                                tokenCommand.Parameters.AddRange(tokenParams);
                                tokenCommand.ExecuteNonQuery();
                            }

                            // Commit the transaction since everything went well
                            transaction.Commit();

                            // Return success response with user and shop data
                            var successResponse = new
                            {
                                status = true,
                                message = "User and Shop created successfully!",
                                user = new { id = userId, token = token },
                                shop = new { shopName = shop.Name, shopCategory = shop.Category }
                            };
                            return JsonConvert.SerializeObject(successResponse);
                        }
                        else
                        {
                            // If we didn't get the userId, rollback and return error
                            transaction.Rollback();
                            var errorResponse = new
                            {
                                status = false,
                                message = "Failed to retrieve userId. User creation failed."
                            };
                            return JsonConvert.SerializeObject(errorResponse);
                        }
                    }
                    catch (SqlException ex)
                    {
                        // In case of an error, rollback the transaction
                        transaction.Rollback();
                        var errorResponse = new
                        {
                            status = false,
                            message = "An error occurred: " + ex.Message
                        };
                        return JsonConvert.SerializeObject(errorResponse);
                    }
                }
            }
        }

    }
}
