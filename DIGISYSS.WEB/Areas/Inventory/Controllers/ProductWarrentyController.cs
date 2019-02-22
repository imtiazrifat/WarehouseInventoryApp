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
    public class ProductWarrentyController : System.Web.Mvc.Controller
    {
        // GET: Inventory/ProductWarrenty

        private IProductWarrentyManager _aManager;
        public ProductWarrentyController()
        {
            _aManager = new ProductWarrentyManager();
        }

        public ActionResult ProductWarrentySettings()
        {
            return View();
        }


        public JsonResult CreateProductwarrenty(InvProductWarrenty aObj)
        {

            var data = _aManager.CreateProductWarrenty(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetAllProductwarrenty()
        {

            var data = _aManager.GetAllProductWarrenty();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
    }
}