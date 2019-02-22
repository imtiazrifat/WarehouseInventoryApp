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
    public class ColorController : System.Web.Mvc.Controller
    {
        private IColorManager _aManager;

        public ColorController()
        {
            _aManager = new ColorManager();
        }

        //
        // GET: /Inventory/Color/ColorSettings
        public ActionResult ColorSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Color/CreateColor

        public JsonResult CreateColor(InvColor aObj)
        {

            var data = _aManager.CreateColor(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Color/GetAllColor
        public JsonResult GetAllColor()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllColor();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }

        // GET: /Inventory/Color/GetAllColorDd
        public JsonResult GetAllColorDd()
        {
            // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllColorDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}