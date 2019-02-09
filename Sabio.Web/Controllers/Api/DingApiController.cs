﻿using Trolli.Models.Requests;
using Trolli.Services.Dings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Sabio.Models.Responses;

namespace Trolli.Web.Controllers.Api
{
    [RoutePrefix("api/trolli")]
    [AllowAnonymous]
    public class DingApiController : ApiController
    {
        private readonly DingService _service;

        public DingApiController(DingService service)
        {
            _service = service;
        }

        [Route, HttpPost]
        public HttpResponseMessage Create(DigAddRequest model)
        {
            ItemResponse<int> response = new ItemResponse<int>();

            response.Item = _service.Insert(model);

            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            response.Item = true;

            _service.Delete(id);

            return Request.CreateResponse(HttpStatusCode.OK, response);

        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, DingUpdateRequest data)
        {

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            _service.Update(data);
            SuccessResponse responseBody = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.Created, responseBody);
        }
    }
}
