using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class OutletPODetailsViewModel
    {

        public int OutletPOMasterId { get; set; }
        public string OutletPOCode { get; set; }
        public string WarehouseName { get; set; }
        public int WarehouseId { get; set; }
        public int OutletId { get; set; }
        public bool? Status { get; set; }





        public int OutletPODetailsId { get; set; }
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
