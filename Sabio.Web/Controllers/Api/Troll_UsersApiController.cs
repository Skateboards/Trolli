using Sabio.Models.Requests;
using Sabio.Models.Domain;
using Sabio.Models.Responses;
using Sabio.Web.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sabio.Web.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/users")]
    public class Troll_UsersApiController : ApiController
    {
        private readonly Troll_UsersService _service;

        public Troll_UsersApiController(Troll_UsersService service)
        {
            _service = service;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(Troll_UserAddRequest model)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            ItemResponse<int> response = new ItemResponse<int>();

            response.Item = _service.Insert(model);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, Troll_UserUpdateRequest data)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            _service.Update(data);
            SuccessResponse responseBody = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            response.Item = true;

            _service.Delete(id);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage Get(int id)
        {
            {
                HttpStatusCode code = HttpStatusCode.OK;
                ItemResponse<TrolliUsers> responseBody = new ItemResponse<TrolliUsers>();
                responseBody.Item = _service.GetById(id);
                if (responseBody.Item == null)
                {
                    code = HttpStatusCode.NotFound;

                }
                return Request.CreateResponse(code, responseBody);
            }
        }
    }
}
