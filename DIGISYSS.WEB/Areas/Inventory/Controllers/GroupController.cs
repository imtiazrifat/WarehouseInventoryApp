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
    public class GroupController : System.Web.Mvc.Controller
    {
        private IGroupManager _aManager;

        public GroupController()
        {
            _aManager = new GroupManager();
        }

        //
        // GET: /Inventory/Group/GroupSettings
        public ActionResult GroupSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        // GET: /Inventory/Group/CreateGroup

        public JsonResult CreateGroup(InvGroup aObj)
        {

            var data = _aManager.CreateGroup( aObj);
            // var data = _aManager.CreatAssetCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        // GET: /Inventory/Group/GetAllGroup
        public JsonResult GetAllGroup()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllGroup();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
        // GET: /Inventory/Group/GetAllGroupDd
        public JsonResult GetAllGroupDd()
        {
           // var data = _aManager.GetAllGroup();
            var data = _aManager.GetAllGroupDropDownData();

            return Json(new { success = "Success", result = data.Data }, JsonRequestBehavior.AllowGet);
        }
      
    }
}