using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class WarehousePODetailsViewModel
    {

        public int WarehousePOInvoiceMasterId { get; set; }
        public int WarehousePOMasterId { get; set; }
        public string WarehousePOCode { get; set; }
        public string WarehouseName { get; set; }
        public int WarehouseId { get; set; }
        public int SupplierId { get; set; }
        public int UniqueId { get; set; }
        public string POReference { get; set; }
        public bool? Status { get; set; }


        public int WarehousePODetailsId { get; set; }
        public int? ProductId { get; set; }
        public double ProductQuantity { get; set; }
        public bool? IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? PricetIsActive { get; set; }
        public bool? IsActive { get; set; }

        public int WarehousePOItemReceivedId { get; set; }
        public Nullable<double> ItemReceivedQuantity { get; set; }
    }
}
