using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class OutletPOReturnDetailsViewModel
    {

        public int OutletPOReturnMasterId { get; set; }
        public int OutletPOMasterId { get; set; }
        public int OutletPOInvoiceNo { get; set; }
        public string OutletPOCode { get; set; }

        public int WarehouseId { get; set; }
        public int OutletId { get; set; }
        public string Note { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsChanged { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<bool> IsEdited { get; set; }
        public Nullable<bool> IsReceived { get; set; }
        public Nullable<int> IsReturned { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }

        public int OutletPOReturnDetailsId { get; set; }
        
    }
}
