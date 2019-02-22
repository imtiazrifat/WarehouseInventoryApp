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
    public class ProductPurchaseController : System.Web.Mvc.Controller
    {
        private IProductPurchaseManager _aManager;

        public ProductPurchaseController()
        {
            _aManager = new ProductPurchaseManager();
        }

        //
        // GET: /Inventory/ProductPurchase/ProductPurchaseSettings
        public ActionResult ProductPurchaseSettings()
        {
           
            return View();
        }

     //   GET: /Inventory/ProductPurchase/CreateProductPurchase

        public JsonResult CreateProductPurchase(InvProductPurchase aObj)
        {

            var data = _aManager.CreateProductPurchase(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/ProductPurchase/GetAllProductPurchase
        public JsonResult GetAllProductPurchaseData()
        {
            
            var data = _aManager.GetAllProductPurchaseData();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
           
        }




        // GET: /Inventory/ProductPurchase/LoadAllProductDd
      


    }
}