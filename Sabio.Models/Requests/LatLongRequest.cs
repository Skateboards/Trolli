using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class LatLongRequest
    {
        public DateTime Date { get; set; }

        public double Lat { get; set; }

        public double Long { get; set; }
    }
}