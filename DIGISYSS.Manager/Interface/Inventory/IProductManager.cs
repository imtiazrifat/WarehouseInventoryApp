using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IProductManager
    {
       
        ResponseModel CreateProductDetails(ProductDetailsViewModel productDetails);//, InvProduct aObj
        ResponseModel GetAllProductData();
        ResponseModel GetAllProductsForDd();
        ResponseModel LoadAllProductDd(int factoryId, int itemId, int uoMId, int sizeId, int colorId);
        ResponseModel GetASingleProductDetails(int productId);
        ResponseModel GenarateBarcode(int itemId, int sizeId);
    }
}
