using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class WareHouseController : System.Web.Mvc.Controller
    {

        private WareHouseManager _aManager;
        public WareHouseController()
        {
            _aManager = new WareHouseManager();
        }
        // GET: Inventory/WareHouse
        public ActionResult WareHouseSettings()
        {
            return View();
        }

        public JsonResult CreateWarehouse(InvWarehouse aObj)
        {
            var data = _aManager.CreateWareHouse(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllWarehouseNameForDd()
        {
            var data = _aManager.GetAllWarehouseNameForDd();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllWarehouse()
        {
            var data = _aManager.GetAllWareHouse();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}