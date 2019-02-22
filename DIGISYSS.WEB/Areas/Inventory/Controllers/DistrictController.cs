using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class DistrictController : System.Web.Mvc.Controller
    {
        private IDistrictManager _aManager;

        public DistrictController()
        {
            _aManager = new DistrictManager();
        }

        //
        // GET: /Inventory/District/DistrictSettings
        public ActionResult DistrictSettings()
        {
            
            return View();
        }

        // GET: /Inventory/District/CreateDistrict

        public JsonResult CreateDistrict(InvDistrictList aObj)
        {
            var data = _aManager.CreateDistrict(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }


        // GET: /Inventory/District/GetAllDistrict
        public JsonResult GetAllDistrict()
        {
            
            var data = _aManager.GetAllDistrict();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            
        }
    }
}