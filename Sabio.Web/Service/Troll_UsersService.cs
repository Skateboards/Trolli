using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Sabio.Web.Service
{
    public class Troll_UsersService
    {
        private readonly IDataProvider _dataProvider;

        public Troll_UsersService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;

        }

        public TrolliUsers GetById(int Id)
        {

            TrolliUsers trolliData = null;
            string procName = "[dbo].[Troll_Users_SelectById]";
            _dataProvider.ExecuteCmd(procName
            , inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", Id);

            }
           , singleRecordMapper: delegate (IDataReader reader, short set)
           {
               trolliData = new TrolliUsers();

               int startingIndex = 0;
               trolliData.Id = reader.GetSafeInt32(startingIndex++);
               trolliData.Password = reader.GetSafeString(startingIndex++);
               trolliData.Username = reader.GetSafeString(startingIndex++);



           });

            return trolliData;

        }

        public void Delete(int Id)
        {
            string storeProc = "[dbo].[Trolli_User_Delete]";

            _dataProvider.ExecuteNonQuery(storeProc,
                delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@id", Id);
                });

        }

    }

}