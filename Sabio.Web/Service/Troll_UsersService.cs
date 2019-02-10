using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Requests;
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
        public int Insert(Troll_UserAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Trolli_User_Insert]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Password", model.Password);
                    sqlParams.AddWithValue("@UserName", model.UserName);

                    SqlParameter idParameter = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);
                }, returnParameters: delegate (SqlParameterCollection sqlParams)
                {
                    Int32.TryParse(sqlParams["@Id"].Value.ToString(), out id);
                }
                );
            return id;
        }

        public void Update(Troll_UserUpdateRequest data)
        {
            string storeProc = "[dbo].[Trolli_User_Update]";

            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@Id", data.Id);
                sqlParams.AddWithValue("@UserName", data.UserName);
                sqlParams.AddWithValue("@Password", data.Password);
            });
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