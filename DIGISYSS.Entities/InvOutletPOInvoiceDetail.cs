//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DIGISYSS.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class InvOutletPOInvoiceDetail
    {
        public int OutletPOInvoiceDetailsId { get; set; }
        public Nullable<int> OutletPOInvoiceMasterId { get; set; }
        public Nullable<int> Original_OutletPODetailsId { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<double> ProductQuantity { get; set; }
        public Nullable<int> Status { get; set; }
        public string Note { get; set; }
        public Nullable<bool> IsEdited { get; set; }
        public Nullable<bool> IsReceived { get; set; }
        public Nullable<bool> IsReturned { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}
