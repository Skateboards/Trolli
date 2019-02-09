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

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            ItemResponse<TrolliUsers> responseBody = new ItemResponse<TrolliUsers>();
            responseBody.Item = _service.GetById(id);
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            _service.Delete(id);
            response.Item = true;

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}
