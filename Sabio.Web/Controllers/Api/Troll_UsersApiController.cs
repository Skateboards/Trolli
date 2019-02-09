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

    }
}
