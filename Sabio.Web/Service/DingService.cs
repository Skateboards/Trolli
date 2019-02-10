using Trolli.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Data;
using Sabio.Models.Requests;

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
            string storedProc = "[dbo].[Dings_Update]";

            _dataProvider.ExecuteNonQuery(storedProc, delegate (SqlParameterCollection sqlParams)
            {
                sqlParams.AddWithValue("@DingId", data.DingId);
                sqlParams.AddWithValue("@DingCategory", data.DingCategory);
                sqlParams.AddWithValue("@Value", data.Value);
                sqlParams.AddWithValue("@RouteId", data.RouteId);
                sqlParams.AddWithValue("@StopId", data.StopId);
                sqlParams.AddWithValue("@StopDisplayName", data.StopDisplayName);
                sqlParams.AddWithValue("@Agency", data.Agency);
                sqlParams.AddWithValue("@Lat", data.Lat);
                sqlParams.AddWithValue("@Long", data.Long);

            });
        }

        public List<Ding> Post(List<int> RouteId, DateTime Date)
        {

            string storedProc = "dbo.Dings_SelectList";
            List<Ding> dingList = new List<Ding>();
            _dataProvider.ExecuteCmd(storedProc
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {

                    DingSelectRoute dingSelect = new DingSelectRoute();
                    SqlParameter p = new SqlParameter("@RouteId", System.Data.SqlDbType.Structured);

                    if (dingSelect != null && dingSelect.RouteId.Any())
                    {
                        p.Value = new Sabio.Data.IntIdTable(dingSelect.RouteId);
                    }

                    sqlParams.Add(p);

                    sqlParams.AddWithValue("@Date", dingSelect.Date);


                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   Ding ding = new Ding();
                   int startingIndex = 0;
                   ding.DingId = reader.GetSafeInt32(startingIndex++);
                   ding.DingCategory = reader.GetSafeString(startingIndex++);
                   ding.Value = reader.GetSafeString(startingIndex++);
                   ding.CreatedBy = reader.GetSafeInt32(startingIndex++);
                   ding.RouteId = reader.GetSafeInt32(startingIndex);
                   ding.StopId = reader.GetSafeInt32(startingIndex++);
                   ding.StopDisplayName = reader.GetSafeString(startingIndex++);
                   ding.Agency = reader.GetSafeString(startingIndex++);
                   ding.Lat = reader.GetSafeDouble(startingIndex++);
                   ding.Long = reader.GetSafeDouble(startingIndex++);

                   dingList.Add(ding);
               });
            return dingList;
        }
    }

}
