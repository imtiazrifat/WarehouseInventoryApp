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
    public class FactoryController : System.Web.Mvc.Controller
    {
        private IFactoryManager _aManager;

        public FactoryController()
        {
            _aManager = new FactoryManager();
        }

        //
        // GET: /Inventory/Factory/FactorySettings
        public ActionResult FactorySettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Factory/CreateFactory

        public JsonResult CreateFactory(InvFactory aObj)
        {

            var data = _aManager.CreateFactory(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Factory/GetAllFactory
        public JsonResult GetAllFactory()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllFactory();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
        public JsonResult GetAllFactoryDd()
        {
            // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllFactoryDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}