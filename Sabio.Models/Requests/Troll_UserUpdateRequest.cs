﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class Troll_UserUpdateRequest
    {

        public int Id { get; set; }


        public string Password { get; set; }


        public string UserName { get; set; }
    }
}
