using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
 public   class ProductOutletPOReturnVM
    {
        public int OutletPOReturnDetailsId { get; set; }
        public Nullable<int> OutletPOReturnMasterId { get; set; }
        public Nullable<int> OutletPODetailsId { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<double> ProductQuantity { get; set; }
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
    }
}
