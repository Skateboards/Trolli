using Sabio.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Db.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            string connString = "Server=.;Database=MyNewDB;Trusted_Connection=True;";

            bool isConnected = IsServerConnected(connString);
            Console.WriteLine("DB isConnected = {0}", isConnected);
        }


        private static bool IsServerConnected(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch (SqlException ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
        }
    }
}
