using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class ProductController : System.Web.Mvc.Controller
    {
        private IProductManager _aManager;

        public ProductController()
        {
            _aManager = new ProductManager();
        }

        //
        // GET: /Inventory/Product/ProductSettings
        public ActionResult ProductSettings()
        {
           return View();
        }

        //   GET: /Inventory/Product/CreateProduct
        public JsonResult CreateProductDetails(ProductDetailsViewModel aObj)
        {
            var data = _aManager.CreateProductDetails(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;
        }

        // GET: /Inventory/Product/GetAllProduct
        public JsonResult GetAllProductData()
        {
            var data = _aManager.GetAllProductData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


       //// GET: /Inventory/Product/GetAllProductsForDd
        public JsonResult GetAllProductsForDd()
        {
            var data = _aManager.GetAllProductsForDd();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Inventory/Product/LoadAllProductDd   For Parametrewise search
        public JsonResult LoadAllProductDd(int factoryId, int itemId, int uoMId, int sizeId, int colorId)
        {
            var data = _aManager.LoadAllProductDd(factoryId, itemId, uoMId, sizeId, colorId);
            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Inventory/Product/LoadASingleProductDetails
        public JsonResult LoadASingleProductDetails(int productId)
        {
            var data = _aManager.GetASingleProductDetails(productId);
            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Inventory/Product/GenarateBarcode
        public JsonResult GenarateBarcode(int itemId, int sizeId)
        {
            var data = _aManager.GenarateBarcode(itemId, sizeId);
            //var data = _aManager.GetASingleProductDetails(productId);
            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
         //   return null;
        }

    }
}