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
    public class ItemController : System.Web.Mvc.Controller
    {
        private ItemManager _aManager;

        public ItemController()
        {
            _aManager = new ItemManager();
        }

        //
        // GET: /Inventory/Item/ItemSettings
        public ActionResult ItemSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Item/CreateItem

        public JsonResult CreateItem(InvItem aObj)
        {

            var data = _aManager.CreateItem(aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Item/GetAllItem
        public JsonResult GetAllItem()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllItem();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }


        // GET: /Inventory/Group/GetAllGroupDd
        public JsonResult GetAllItemDd()
        {
            // var data = _aManager.GetAllItem();
            var data = _aManager.GetAllItemDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}