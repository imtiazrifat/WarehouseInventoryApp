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
    public class OutletWarrentyRepairController : System.Web.Mvc.Controller
    {
        private IOutletWarrentyRepairManager _aManager;

        public OutletWarrentyRepairController()
        {
            _aManager = new OutletWarrentyRepairManager();
        }

        //
        // GET: /Inventory/OutletWarrentyRepair/OutletWarrentyRepairSettings
        public ActionResult OutletWarrentyRepairSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/OutletWarrentyRepair/AllOutletWarrentySettings
        public ActionResult AllOutletWarrentySettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/OutletWarrentyRepair/CreateOutletWarrentyRepair

        public JsonResult CreateOutletWarrentyRepair(InvOutletWarrentyRepair aObj)
        {

            var data = _aManager.CreateOutletWarrentyRepair(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;
        }

        // GET: /Inventory/OutletWarrentyRepair/SaveOutletWarrentyDataFromWarehouse

        public JsonResult SaveOutletWarrentyDataFromWarehouse(InvOutletWarrentyRepair aObj)
        {

            var data = _aManager.SaveOutletWarrentyDataFromWarehouse(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
     
        }
        // GET: /Inventory/OutletWarrentyRepair/GetAllOutletWarrentyRepairRequest
        public JsonResult GetAllOutletWarrentyRepairRequest()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllOutletWarrentyRepairRequest();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }

      
    }
}