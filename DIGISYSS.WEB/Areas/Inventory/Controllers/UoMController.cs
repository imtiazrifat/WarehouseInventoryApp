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
    public class UoMController : System.Web.Mvc.Controller
    {
        private IUoMManager _aManager;

        public UoMController()
        {
            _aManager = new UoMManager();
        }

        //
        // GET: /Inventory/UoM/UoMSettings
        public ActionResult UoMSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/UoM/CreateUoM

        public JsonResult CreateUoM(InvUoM aObj)
        {

            var data = _aManager.CreateUoM(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/UoM/GetAllUoM
        public JsonResult GetAllUoM()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllUoM();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }


        public JsonResult GetAllUoMDd()
        {
            // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllUoMDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}