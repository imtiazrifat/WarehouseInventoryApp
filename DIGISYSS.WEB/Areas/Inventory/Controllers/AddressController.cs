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
    public class AddressController : System.Web.Mvc.Controller
    {
        private IAddressManager _aManager;

        public AddressController()
        {
            _aManager = new AddressManager();
        }

        //
        // GET: /Inventory/Address/AddressSettings
        public ActionResult AddressSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Address/CreateAddress

        public JsonResult CreateAddress(InvAddress aObj)
        {

            var data = _aManager.CreateAddress(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Address/GetAllAddress
        public JsonResult GetAllAddress()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllAddress();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
    }
}