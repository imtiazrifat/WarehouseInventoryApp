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
    public class OutletStockController : System.Web.Mvc.Controller
    {
        private IOutletStockManager _aManager;

        public OutletStockController()
        {
            _aManager = new OutletStockManager();
        }
        
        // GET: /Inventory/OutletStock/OutletStockSettings
        public ActionResult OutletStockSettings()
        {
            return View();
        }

        // GET: /Inventory/OutletStock/CreateOutletStock
        public JsonResult CreateOutletStock(InvOutletStock aObj)
        {
            var data = _aManager.CreateOutletStock(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Inventory/OutletStock/GetAllOutletStock
        public JsonResult GetAllOutletStock()
        {
            //befor user management we are taking 

            var data = _aManager.GetAllOutletStock();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        // GET: /Inventory/OutletStock/GetStockQuantityOfAProduct
        public JsonResult GetStockQuantityOfAProduct(int productId)
        {
            var data = _aManager.GetStockQuantityOfAProduct(productId);
            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}