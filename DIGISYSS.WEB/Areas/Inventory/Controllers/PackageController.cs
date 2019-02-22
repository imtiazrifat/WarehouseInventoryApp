using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class PackageController : System.Web.Mvc.Controller
    {
        private IPackageManager _aManager;

        public PackageController()
        {
            _aManager = new PackageManager();
        }
        
        //// GET: /Inventory/Package/PackageSettings
        public ActionResult PackageSettings()
        {
            return View();
        }

        ////   GET: /Inventory/Package/CreatePackage
        public JsonResult CreatePackageDetails(PackageDetailsViewModel packageData,List<ProductPackageVM> productList)
        {
           // return null;
            var data = _aManager.CreatePackageDetails(packageData, productList);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/Package/GetAllPackageData
        public JsonResult GetAllPackageData()
        {
            var data = _aManager.GetAllPackageData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}