using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
 public   class ProductOutletPOVM
    {
        public int OutletPODetailsId { get; set; }
        public int? ProductId { get; set; }
       // public int? WarehouseId { get; set; }
        public int ProductQuantity { get; set; }
    }
}
