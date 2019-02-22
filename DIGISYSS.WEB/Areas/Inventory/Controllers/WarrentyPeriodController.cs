using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controller
{
    public class WarrentyPeriodController : System.Web.Mvc.Controller
    {
        // GET: Inventory/WarrentyPeriod
        private IWarrentyPeriodManager _aManager;
        public WarrentyPeriodController()
        {
            _aManager = new WarrentyPeriodManager();
        }
        public ActionResult WarrentyPeriodSettings()
        {
            return View();
        }

        public JsonResult CreateWarrentyPeriod(InvWarrentyPeriod aObj)
        {

            var data = _aManager.CreateWarrentyPeriod(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);

        }





        public JsonResult GetAllWarrentyPeriod()
        {

            var data = _aManager.GetAllWarrentyPeriod();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
    }
}