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
    public class OutletController : System.Web.Mvc.Controller
    {
        private IOutletManager _aManager;

        public OutletController()
        {
            _aManager = new OutletManager();
        }

        //
        // GET: /Inventory/Outlet/OutletSettings
        public ActionResult OutletSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Outlet/CreateOutlet

        public JsonResult CreateOutlet(InvOutlet aObj)
        {

            var data = _aManager.CreateOutlet(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Outlet/GetAllOutlet
        public JsonResult GetAllOutlet()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllOutlet();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
        public JsonResult GetAllOutletDd()
        {
            // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllOutletDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}