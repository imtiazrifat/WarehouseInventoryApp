using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class PackageDetailsViewModel
    {

        public int PackageMasterId { get; set; }
        public string PackageCode { get; set; }
        public string PackageName { get; set; }





        public int PackageDetailsId { get; set; }
        public int? ProductId { get; set; }
        public string ProductQuantity { get; set; }
        public bool? IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? PricetIsActive { get; set; }
        public bool? IsActive { get; set; }
    }
}
