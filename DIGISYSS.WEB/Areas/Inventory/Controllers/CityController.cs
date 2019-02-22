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
    public class CityController : System.Web.Mvc.Controller
    {
        private ICityManager _aManager;

        public CityController()
        {
            _aManager = new CityManager();
        }

        //
        // GET: /Inventory/City/CitySettings
        public ActionResult CitySettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/City/CreateCity

        public JsonResult CreateCity(InvCityList aObj)
        {
            var data = _aManager.CreateCity(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }
        // GET: /Inventory/City/GetAllCity
        public JsonResult GetAllCity()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllCity();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
    }
}