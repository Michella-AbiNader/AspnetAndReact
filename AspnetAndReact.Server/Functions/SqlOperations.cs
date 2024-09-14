using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace AspnetAndReact.Server.Functions
{
    public class SqlOperations
    {
        string connectionString = "Data Source=DESKTOP-5GQU1D3;Initial Catalog=Shopping_App;User ID=micha; Password=micha123 ";
        private readonly SqlConnection _connection;
        private readonly SqlTransaction _transaction;

        public SqlOperations()
        {
        }

        // Constructor for operations within an existing transaction
        public SqlOperations(SqlConnection connection, SqlTransaction transaction)
        {
            _connection = connection;
            _transaction = transaction;
        }

        public (DataTable dt, bool isSuccess) sqlToDataTable(string query, params SqlParameter[] sqlParameter)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    //DataTable is for reading data from the database
                    DataTable dataTable = new DataTable();
                    connection.Open();
                    using (SqlCommand command = new SqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = query;
                        command.CommandType = CommandType.Text;
                        if ((sqlParameter != null) && (sqlParameter.Length > 0))
                        {
                            command.Parameters.AddRange(sqlParameter);
                        }
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            dataTable.Load(reader);
                        }
                    }
                    connection.Close();
                    return (dataTable, true);

                }
                catch (SqlException ex)
                {
                    return (null, false);
                }
            }
        }
        //TO UPDATE, INSERT AND DELETE
        public bool executeSql(string query, params SqlParameter[] sqlParameter)
        {
            try
            {
                using (SqlConnection sqlConnection = new SqlConnection(connectionString))
                {
                    sqlConnection.Open();
                    using (SqlCommand command = new SqlCommand())
                    {
                        command.CommandText = query;
                        command.CommandType = CommandType.Text;
                        command.Connection = sqlConnection;
                        if (sqlParameter != null && sqlParameter.Length > 0)
                        {
                            command.Parameters.AddRange(sqlParameter);
                        }
                        command.ExecuteNonQuery();
                        return true;
                    }
                }
            }
           catch (SqlException ex)
            {
                return false;
            }
        }

        // To execute multiple SQL commands within a transaction
        public bool ExecuteSqlTransaction(string[] queries, SqlParameter[][] parameters)
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlTransaction transaction = sqlConnection.BeginTransaction())
                {
                    try
                    {
                        for (int i = 0; i < queries.Length; i++)
                        {
                            using (SqlCommand command = new SqlCommand(queries[i], sqlConnection, transaction))
                            {
                                if (parameters[i] != null && parameters[i].Length > 0)
                                {
                                    command.Parameters.AddRange(parameters[i]);
                                }
                                command.ExecuteNonQuery();
                            }
                        }
                        transaction.Commit();
                        return true;
                    }
                    catch (SqlException)
                    {
                        transaction.Rollback();
                        return false;
                    }
                }
            }
        }


        public string DataTableToJsonObj(DataTable dt)
        {
            DataSet ds = new DataSet();
            ds.Merge(dt);
            StringBuilder JsonString = new StringBuilder();
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                JsonString.Append("[");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    JsonString.Append("{");
                    for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                    {
                        if (j < ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\",");
                        }
                        else if (j == ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == ds.Tables[0].Rows.Count - 1)
                    {
                        JsonString.Append("}");
                    }
                    else
                    {
                        JsonString.Append("},");
                    }
                }
                JsonString.Append("]");
                return JsonString.ToString();
            }
            else
            {
                return null;
            }
        }
    }
}
