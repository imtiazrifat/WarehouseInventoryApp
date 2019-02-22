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
    public class SupplierController : System.Web.Mvc.Controller
    {

        private SupplierManager _aManager;
        public SupplierController()
        {
            _aManager = new SupplierManager();
        }
        // GET: Inventory/Supplier
        public ActionResult SupplierSettings()
        {
            return View();
        }

        public JsonResult CreateSupplier(InvSupplier aObj)
        {
            var data = _aManager.CreateSupplier(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSupplierNameForDd()
        {
            var data = _aManager.GetAllSupplierNameForDd();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAllSupplier()
        {
            var data = _aManager.GetAllSupplier();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}