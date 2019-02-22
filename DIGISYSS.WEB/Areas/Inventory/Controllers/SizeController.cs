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
    public class SizeController : System.Web.Mvc.Controller
    {
        private ISizeManager _aManager;

        public SizeController()
        {
            _aManager = new SizeManager();
        }

        //
        // GET: /Inventory/Size/SizeSettings
        public ActionResult SizeSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Size/CreateSize

        public JsonResult CreateSize(InvSize aObj)
        {

            var data = _aManager.CreateSize(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Size/GetAllSize
        public JsonResult GetAllSize()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllSize();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
        public JsonResult GetAllSizeDd()
        {
            // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllSizeDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}