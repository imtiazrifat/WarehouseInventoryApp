using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
    public class OutletSaleUIDetailsViewModel
    {
        public int OutletInvoiceMasterId { get; set; }
        public Nullable<int> OutletId { get; set; }
        public Nullable<int> SalePersonId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> OutletSaleInvoiceNo { get; set; }
        public string PaymentMode { get; set; }
        public Nullable<double> TotalItem { get; set; }
        public Nullable<double> VAT { get; set; }
        public Nullable<double> TotalGrandPrice { get; set; }
        public Nullable<double> PayableAmount { get; set; }
        public Nullable<double> Cash { get; set; }
        public Nullable<double> Credit { get; set; }
        public Nullable<double> Discount { get; set; }
        public Nullable<double> Rounding { get; set; }
        public Nullable<double> PaidAmount { get; set; }
        public Nullable<double> DueOrRefund { get; set; }
        public string Note { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsChanged { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public Nullable<bool> IsEdited { get; set; }
        public Nullable<bool> IsFullPaid { get; set; }
        public Nullable<bool> IsReturned { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
        public string PreviousInvoice { get; set; }
        public string NewInvoice { get; set; }




        public int OutletInvoiceDetailsId { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<double> ProductQuantity { get; set; }
        public Nullable<int> DiscountPercent { get; set; }
        public Nullable<double> UnitPrice { get; set; }
        public Nullable<double> TotalPrice { get; set; }
        
    
    }
}
