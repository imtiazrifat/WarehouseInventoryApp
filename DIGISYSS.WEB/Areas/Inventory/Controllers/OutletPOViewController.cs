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
    public class OutletPOViewController : System.Web.Mvc.Controller
    {
        private IOutletPOViewManager _aManager;

        public OutletPOViewController()
        {
            _aManager = new OutletPOViewManager();
        }
        
        //// GET: /Inventory/OutletPOView/OutletPOViewSettings
        public ActionResult OutletPOViewSettings()
        {
            return View();
        }

        public ActionResult ApprovedOutletPOViewByWarehouse()
        {
            return View();
            //return null;
        }

        ////   GET: /Inventory/OutletPOView/CreateOutletPOView
        public JsonResult CreateOutletPOViewDetails()
        {
           // return null;
            //var data = _aManager.CreateOutletPOViewDetails(OutletPOViewData, productList);
            //return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            return null;
        }

        //// GET: /Inventory/OutletPOView/GetAllOutletPOViewData
        public JsonResult GetAllOutletPOViewData()
        {
            var data = _aManager.GetAllOutletPOViewData();
           // return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            return null;
        }
    }
}