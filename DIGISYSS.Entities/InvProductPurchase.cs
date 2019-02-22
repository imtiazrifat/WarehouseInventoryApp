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
    
    public partial class InvProductPurchase
    {
        public int ProductPurchaseId { get; set; }
        public Nullable<int> FactoryId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> UoMId { get; set; }
        public Nullable<int> SizeId { get; set; }
        public Nullable<int> ColorId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public Nullable<int> ProductMainBarcode { get; set; }
        public Nullable<int> ProductFactoryBarcode { get; set; }
        public Nullable<double> MinimumStock { get; set; }
        public Nullable<double> CurrentStock { get; set; }
        public Nullable<double> NewStock { get; set; }
        public Nullable<double> PurchaseQuantity { get; set; }
        public Nullable<double> CostPrice { get; set; }
        public Nullable<double> WholeSalePrice { get; set; }
        public Nullable<double> RetailPrice { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDate { get; set; }
    }
}
