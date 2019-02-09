using Trolli.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data.Providers;

namespace Trolli.Services.Dings
{
    public class DingService
    {
        private readonly IDataProvider _dataProvider;

        public DingService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(DigAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Test_Insert]";

            _dataProvider.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@DingCategory", model.DingCategory);
                    sqlParams.AddWithValue("@Value", model.Value);
                    sqlParams.AddWithValue("@CreatedBy", model.CreatedBy);
                    sqlParams.AddWithValue("@RouteId", model.RouteId);
                    sqlParams.AddWithValue("@StopId", model.StopId);
                    sqlParams.AddWithValue("@StopDisplayName", model.StopDisplayName);
                    sqlParams.AddWithValue("@Agency", model.Agency);

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
        public void Delete(int dingId)
        {
            string storedProc = "dbo.Dings_Delete";
            _dataProvider.ExecuteNonQuery(storedProc
                , delegate (SqlParameterCollection sqlParameter)
                {
                    sqlParameter.AddWithValue("@DingId", dingId);
                });
        }
        public void Update(DingUpdateRequest data)
        {
            string storeProc = "[dbo].[Dings_Update]";

            _dataProvider.ExecuteNonQuery(storeProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@DingId", data.DingId);
                sqlParams.AddWithValue("@DingCategory", data.DingCategory);
                sqlParams.AddWithValue("@Value", data.Value);
                sqlParams.AddWithValue("@RouteId", data.RouteId);
                sqlParams.AddWithValue("@StopId", data.StopId);
                sqlParams.AddWithValue("@StopDisplayName", data.StopDisplayName);
                sqlParams.AddWithValue("@Agency", data.Agency);

            });
        }

    }

}
