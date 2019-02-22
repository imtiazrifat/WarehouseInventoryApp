using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class ProductPriceController : System.Web.Mvc.Controller
    {
        private IProductPriceManager _aManager;

        public ProductPriceController()
        {
            _aManager = new ProductPriceManager();
        }

        //
        // GET: /Inventory/ProductPrice/ProductPriceSettings
        public ActionResult ProductPriceSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            //   return View();
            return null;
        }

        // GET: /Inventory/ProductPrice/CreateProductPrice

        public JsonResult CreateProductPrice(InvProductPrice aObj)
        {

            var data = _aManager.CreateProductPrice(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/ProductPrice/GetAllProductPrice
        public JsonResult GetAllProductPrice()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllProductPrice();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
    }
}