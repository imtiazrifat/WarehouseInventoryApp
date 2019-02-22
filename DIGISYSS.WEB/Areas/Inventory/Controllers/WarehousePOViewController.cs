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
    public class WarehousePOViewController : System.Web.Mvc.Controller
    {
        private IWarehousePOViewManager _aManager;

        public WarehousePOViewController()
        {
            _aManager = new WarehousePOViewManager();
        }
        
        //// GET: /Inventory/WarehousePO/WarehousePOSettings
        public ActionResult WarehousePOViewSettings()
        {
           // return View();
            return null;
        }

        public ActionResult ApprovedPOViewByWarehouse()
        {
            // return View();
            return null;
        }

        ////   GET: /Inventory/WarehousePO/CreateWarehousePO
        public JsonResult CreateWarehousePODetails()
        {
           // return null;
            //var data = _aManager.CreateWarehousePODetails(WarehousePOData, productList);
            //return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            return null;
        }

        //// GET: /Inventory/WarehousePO/GetAllWarehousePOData
        public JsonResult GetAllWarehousePOData()
        {
            var data = _aManager.GetAllWarehousePOData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        ////// //// GET: /Inventory/Product/GetAllWarehouseNameForDd
       
    }
}