using Sabio.Data.Providers;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
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
    }
}