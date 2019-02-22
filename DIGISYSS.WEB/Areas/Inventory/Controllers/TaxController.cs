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
    public class TaxController : System.Web.Mvc.Controller
    {
        // GET: Inventory/InvTax
        private ITaxManager _aManager;
        public TaxController()
        {
            _aManager = new TaxManger();
        }
        public ActionResult TaxSettings()
        {
            return View();
        }



       





        

        public JsonResult CreateTax(InvTax aObj)
        {

            var data = _aManager.CreateTax(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);

        }

       



        public JsonResult GetAllTax()
        {

            var data = _aManager.GetAllTax();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
    }
}