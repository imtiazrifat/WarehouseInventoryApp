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
    
    public partial class InvOutletPOReturnMaster
    {
        public int OutletPOReturnMasterId { get; set; }
        public Nullable<int> Original_OutletPOMasterId { get; set; }
        public string OutletPOInvoiceNo { get; set; }
        public Nullable<int> OutletId { get; set; }
        public Nullable<int> WarehouseId { get; set; }
        public string Extra1 { get; set; }
        public string Note { get; set; }
        public Nullable<int> RepairCost { get; set; }
        public Nullable<System.DateTime> RepairReturnDate { get; set; }
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
