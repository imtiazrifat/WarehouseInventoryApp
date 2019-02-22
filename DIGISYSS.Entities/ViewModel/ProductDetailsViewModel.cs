using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Entities.ViewModel
{
  public  class ProductDetailsViewModel
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductMainBarcode { get; set; }
        public string ProductFactoryBarcode { get; set; }
        public int FactoryId { get; set; }
        // public string FactoryName { get; set; }
        public int ItemId { get; set; }
        // public string ItemName { get; set; }
        public int SizeId { get; set; }
        //public string SizeName { get; set; }
        public int UoMId { get; set; }
       // public string UoMShortName { get; set; }
        public int ColorId { get; set; }
        //public string ColorName { get; set; }
        public double? MinimumStock { get; set; }
        public string ProductFrontImage { get; set; }
        public string ProductBackImage { get; set; }
        
       
        public DateTime? CreatedDate { get; set; }


        public int ProductPriceId { get; set; }
        public double? CostPrice { get; set; }
        public double? WholeSalePrice { get; set; }
        public double? RetailPrice { get; set; }

         public bool? ProductIsActive { get; set; }
        public bool? PricetIsActive { get; set; }
        public bool? IsActive { get; set; }
    }
}
