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
    
    public partial class InvOutlet
    {
        public int OutletId { get; set; }
        public Nullable<int> AddressId { get; set; }
        public string OutletName { get; set; }
        public string OutletCode { get; set; }
        public string OutletNumber { get; set; }
        public string OutletRegistrationNumber { get; set; }
        public string OutletDetails { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}
