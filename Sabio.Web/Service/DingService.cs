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

            string procName = "[dbo].[Ding_Insert]";

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
                    sqlParams.AddWithValue("@Lat", model.Lat);
                    sqlParams.AddWithValue("@Long", model.Long);

                    SqlParameter idParameter = new SqlParameter("@DingId", System.Data.SqlDbType.Int);
                    idParameter.Direction = System.Data.ParameterDirection.Output;

                    sqlParams.Add(idParameter);
                }, returnParameters: delegate (SqlParameterCollection sqlParams)
                {
                    Int32.TryParse(sqlParams["@DingId"].Value.ToString(), out id);
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

        public Sabio.Models.Paged<Ding> Get(int pageIndex, int pageSize)
        {
            int totalCount = 0;
            Sabio.Models.Paged<Ding> responseBody = null;
            List<Ding> list = null;
            string procName = "[dbo].[Dings_SelectByPagination]";
            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@pageIndex", pageIndex);
                    paramCollection.AddWithValue("@pageSize", pageSize);

                }
                  , singleRecordMapper: delegate (IDataReader reader, short set)
                  {
                      Sabio.Models.Domain.Ding dings = new Ding();


                      int startingIndex = 0;
                      dings.DingId = reader.GetSafeInt32(startingIndex++);
                      dings.DingCategory = reader.GetSafeString(startingIndex++);
                      dings.Value = reader.GetSafeString(startingIndex++);
                      dings.DateAdded = reader.GetSafeDateTime(startingIndex++);
                      dings.CreatedBy = reader.GetSafeInt32(startingIndex++);
                      dings.RouteId = reader.GetSafeInt32(startingIndex++);
                      dings.StopId = reader.GetSafeInt32(startingIndex++);
                      dings.StopDisplayName = reader.GetSafeString(startingIndex++);
                      dings.Agency = reader.GetSafeString(startingIndex++);
                      dings.Lat = reader.GetSafeDouble(startingIndex++);
                      dings.Long = reader.GetSafeDouble(startingIndex++);

                      if (totalCount == 0)
                      {
                          totalCount = reader.GetSafeInt32(startingIndex++);
                      }

                      if (list == null)
                      {
                          list = new List<Ding>();
                      }
                      list.Add(dings);


                  }
                   );
            if (list != null)
            {
                responseBody = new Sabio.Models.Paged<Ding>(list, pageIndex, pageSize, totalCount);
            }

            return responseBody;
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

        public List<Ding> Post(DingSelectRoute model)
        {

            string storedProc = "dbo.Dings_SelectList";
            List<Ding> dingList = new List<Ding>();
            _dataProvider.ExecuteCmd(storedProc
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {

                    DingSelectRoute dingSelect = new DingSelectRoute();
                    SqlParameter p = new SqlParameter("@RouteId", System.Data.SqlDbType.Structured);

                    if (model.RouteId != null && model.RouteId.Any())
                    {
                        p.Value = new Sabio.Data.IntIdTable(model.RouteId);
                    }

                    sqlParams.Add(p);

                    sqlParams.AddWithValue("@DateAdded", model.Date);


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

        public List<Ding> Get(LatLongRequest model)
        {
            string storedProc = "[dbo].[Dings_SelectAll]";
            List<Ding> dingData = null;
            _dataProvider.ExecuteCmd(storedProc
                , inputParamMapper: delegate (SqlParameterCollection sqlParams)
                {
                    sqlParams.AddWithValue("@Date", model.Date);
                    sqlParams.AddWithValue("@Lat", model.Lat);
                    sqlParams.AddWithValue("@Long", model.Long);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Ding ding = new Ding();
                    int startingIndex = 0;
                    ding.DingId = reader.GetSafeInt32(startingIndex++);
                    ding.DingCategory = reader.GetSafeString(startingIndex++);
                    ding.Value = reader.GetSafeString(startingIndex++);
                    ding.DateAdded = reader.GetSafeDateTime(startingIndex++);
                    ding.CreatedBy = reader.GetSafeInt32(startingIndex++);
                    ding.RouteId = reader.GetSafeInt32(startingIndex++);
                    ding.StopId = reader.GetSafeInt32(startingIndex++);
                    ding.StopDisplayName = reader.GetSafeString(startingIndex++);
                    ding.Agency = reader.GetSafeString(startingIndex++);
                    ding.Lat = reader.GetSafeDouble(startingIndex++);
                    ding.Long = reader.GetSafeDouble(startingIndex++);
                    ding.Miles = reader.GetSafeDouble(startingIndex++);
                    if (dingData == null)
                    {
                        dingData = new List<Ding>();
                    }
                    dingData.Add(ding);
                });
            return dingData;
        }

    }

}
