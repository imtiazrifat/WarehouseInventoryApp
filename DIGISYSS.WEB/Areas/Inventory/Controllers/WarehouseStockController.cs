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
    public class WarehouseStockController : System.Web.Mvc.Controller
    {
        private IWarehouseStockManager _aManager;

        public WarehouseStockController()
        {
            _aManager = new WarehouseStockManager();
        }
        
        // GET: /Inventory/WarehouseStock/WarehouseStockSettings
        public ActionResult WarehouseStockSettings()
        {
            return View();
        }

        // GET: /Inventory/WarehouseStock/CreateWarehouseStock
        public JsonResult CreateWarehouseStock(InvWarehouseStock aObj)
        {
            var data = _aManager.CreateWarehouseStock(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        // GET: /Inventory/WarehouseStock/GetAllWarehouseStock
        public JsonResult GetAllWarehouseStock()
        {
            var data = _aManager.GetAllWarehouseStock();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}