using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trolli.Models.Requests
{
    public class DingUpdateRequest
    {
        public int DingId { get; set; }
        public string DingCategory { get; set; }
        public string Value { get; set; }
        public int RouteId { get; set; }
        public int StopId { get; set; }
        public int StopDisplayName { get; set; }
        public string Agency { get; set; }
    }
}
