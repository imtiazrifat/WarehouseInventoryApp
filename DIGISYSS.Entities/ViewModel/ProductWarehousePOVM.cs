using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class ProductWarehousePOVM
    {
        public int WarehousePOInvoiceMasterId { get; set; }
        public int WarehousePOInvoiceDetailsId { get; set; }
        public int WarehousePODetailsId { get; set; }
        public int WarehousePOItemReceivedId { get; set; }
        public int? ProductId { get; set; }
     //   public double ProductQuantity { get; set; }
        public double OrderedQuantity { get; set; }
        public double ItemReceivedQuantity { get; set; }

    }
}
