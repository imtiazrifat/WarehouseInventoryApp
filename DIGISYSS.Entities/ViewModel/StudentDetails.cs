using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
public    class StudentDetails
    {
        public int StudentId { get; set; }
       
        public string StudentName { get; set; }
        public string StudentPhone { get; set; }
        public int StudentAddressId { get; set; }
       
        public string Address { get; set; }
        public string Country { get; set; }

        public int HistoryId { get; set; }
       
        public string HistoryTitle { get; set; }
        public string HistoryDetials { get; set; }
    }
}
