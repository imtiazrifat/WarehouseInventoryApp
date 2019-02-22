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
    public class PackageDetailsController : System.Web.Mvc.Controller
    {
        private IPackageDetailsManager _aManager;

        public PackageDetailsController()
        {
            _aManager = new PackageDetailsManager();
        }

        //
        // GET: /Inventory/PackageDetails/PackageDetailsSettings
        public ActionResult PackageDetailsSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            //   return View();
            return null;
        }

        // GET: /Inventory/PackageDetails/CreatePackageDetails

        public JsonResult CreatePackageDetails(InvPackageDetail aObj)
        {

            var data = _aManager.CreatePackageDetails(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            


        }
        // GET: /Inventory/PackageDetails/GetAllPackageDetails
        public JsonResult GetAllPackageDetails()
        {
            
            var data = _aManager.GetAllPackageDetails();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            
        }
    }
}