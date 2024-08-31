using AspnetAndReact.Server.Functions;
using AspnetAndReact.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace AspnetAndReact.Server.Controllers
{
    [ApiController]
    [RouteAttribute("/[controller]/[action]")]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string query = "SELECT * FROM products";
            SqlOperations sql = new SqlOperations();
            var response = sql.sqlToDataTable(query);
            DataTable dataTable = response.dt;
            if (!response.isSuccess || dataTable.Rows.Count == 0)
            {
                return "No products found";
            }
            string products = sql.DataTableToJsonObj(dataTable);
            return products;
        }
        [HttpGet]
        public string GetById(int id)
        {
            string query = "SELECT products.id, products.name, description, price, quantity, products.image_url, " +
                "shop_id, category_id, category.name AS category_name FROM products JOIN category ON products.category_id = category.id " +
                " WHERE products.id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Product doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }

        [HttpGet]
        public string GetByShop(int shopId)
        {
            string query = "SELECT * FROM products WHERE shop_id = @shopId";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@shopId", shopId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Product doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }

        [HttpGet]
        public string GetByCategory(int categoryId)
        {
            string query = "SELECT * FROM products WHERE category_id = @categoryId";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@categoryId", categoryId);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Product doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }
        [HttpGet]
        public string GetBySearch(string search ="")
        {
            string query = "SELECT * FROM products WHERE name LIKE %@search%";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@search", search);
            var response = sql.sqlToDataTable(query, sqlParam);
            DataTable dataTable = response.dt;
            if (response.isSuccess == false || dataTable.Rows.Count == 0)
            {
                return "Product doesn't exist";
            }
            string result = sql.DataTableToJsonObj(dataTable);
            return result;
        }


        [HttpPost]
        public string Post([FromBody] Product product)
        {
            string query = "INSERT INTO products (name, description, price, quantity, image_url, shop_id, category_id) " +
                "VALUES (@name, @description, @price, @quantity, @image_url, @shop_id, @category_id);";
            SqlParameter[] sqlParameters = new SqlParameter[]
           {
               new SqlParameter("@name", product.Name),
               new SqlParameter("@description", product.Description),
               new SqlParameter("@price", product.Price),
               new SqlParameter("@quantity", product.Quantity),
               new SqlParameter("@image_url", product.ImageUrl),
               new SqlParameter("@shop_id", product.ShopId),
               new SqlParameter("@category_id", product.CategoryId),
           };
            SqlOperations sql = new SqlOperations();
            var result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Product already exists";
            }
            return "Product added successfully!";
        }
        [HttpPut]
        public string Put(int id, [FromBody] Product product)
        {
            string query = "UPDATE products SET name = @name, description = @description, price = @price, " +
                "quantity = @quantity, image_url = @image_url, category_id = @category_id WHERE id = @id;";

            SqlParameter[] sqlParameters = new SqlParameter[]
               {
                new SqlParameter("@id", id),
                new SqlParameter("@name", product.Name),
                new SqlParameter("@description", product.Description),
                new SqlParameter("@price", product.Price),
                new SqlParameter("@quantity", product.Quantity),
                new SqlParameter("@image_url", product.ImageUrl),
                new SqlParameter("@category_id", product.CategoryId)
               };
            SqlOperations sql = new SqlOperations();
            bool result = sql.executeSql(query, sqlParameters);
            if (!result)
            {
                return "Wrong id or input provided";
            }
            return "Product updated successfully!";
        }

        [HttpDelete]
        public string Delete(int id)
        {
            string query = "DELETE FROM products WHERE id = @id";
            SqlOperations sql = new SqlOperations();
            SqlParameter sqlParam = new SqlParameter("@id", id);
            bool result = sql.executeSql(query, sqlParam);
            if (result)
            {
                return "Product deleted successfully!";
            }
            return "Wrong Id provided";
        }

    }
}
