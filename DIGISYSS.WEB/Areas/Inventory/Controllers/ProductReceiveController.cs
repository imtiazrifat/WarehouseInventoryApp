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
    public class ProductReceiveController : System.Web.Mvc.Controller
    {
        private IProductReceiveManager _aManager;

        public ProductReceiveController()
        {
            _aManager = new ProductReceiveManager();
        }

        //
        // GET: /Inventory/ProductReceive/ProductReceiveSettings
        public ActionResult ProductReceiveSettings()
        {
           
            return View();
        }

     //   GET: /Inventory/ProductReceive/CreateProductReceive

        public JsonResult CreateProductReceive(InvProductReceive aObj)
        {

            var data = _aManager.CreateProductReceive(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/ProductReceive/GetAllProductReceive
        public JsonResult GetAllProductReceiveData()
        {
            
            var data = _aManager.GetAllProductReceiveData();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
           
        }




        // GET: /Inventory/ProductReceive/LoadAllProductDd
        public JsonResult LoadAllProductDd()
        {
          
            var data = _aManager.LoadAllProductDd();
            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
          }


    }
}