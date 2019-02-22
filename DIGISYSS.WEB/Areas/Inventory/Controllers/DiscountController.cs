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
    public class DiscountController : System.Web.Mvc.Controller
    {
        // GET: Inventory/InvDiscount
        // GET: Inventory/InvDiscount
        private IDiscountManager _aManager;
        public DiscountController()
        {
            _aManager = new DiscountManager();
        }
        public ActionResult DiscountSettings()
        {
            return View();
        }

        public JsonResult CreateDiscount(InvDiscount aObj)
        {

            var data = _aManager.CreateDiscount(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);

        }





        public JsonResult GetAllDiscount()
        {

            var data = _aManager.GetAllDiscount();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }




    }
}