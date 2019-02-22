using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class OutletSaleUIVM
    {
        public int OutletInvoiceDetailsId { get; set; }
        public int OutletInvoiceMasterId { get; set; }
        public int? OutletId { get; set; }
        public int? ProductId { get; set; }
        public double ProductQuantity { get; set; }
        public double Discount { get; set; }
        public double DiscountPercent { get; set; }
        public double UnitPrice { get; set; }
        public double TotalPrice { get; set; }
        public int IsReturned { get; set; }
        public int IsChanged { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
