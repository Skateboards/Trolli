using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
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

    }
}