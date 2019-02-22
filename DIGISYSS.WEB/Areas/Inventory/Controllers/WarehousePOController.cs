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
    public class WarehousePOController : System.Web.Mvc.Controller
    {
        private IWarehousePOManager _aManager;

        public WarehousePOController()
        {
            _aManager = new WarehousePOManager();
        }

        //// GET: /Inventory/WarehousePO/WarehousePOSettings
        public ActionResult WarehousePOSettings()
        {
            return View();
        }



        ////   POST: /Inventory/WarehousePO/CreateWarehousePODetails
        public JsonResult CreateWarehousePODetails(WarehousePODetailsViewModel WarehousePOData, List<ProductWarehousePOVM> productList)
        {
            var data = _aManager.CreateWarehousePODetails(WarehousePOData, productList);
            return Json( data , JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePO/GetAllWarehousePOData
        public JsonResult GetAllWarehousePOData()
        {
            var data = _aManager.GetAllWarehousePOData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }







        /// <summary>
        /// /////////////  ///////////////////////////////////////////////////////////////////////////////////////
        /// /////////////   These Methods are used For Outlet PO View
        /// /// /////////////  //////////////////////////////////////////////////////////////////////////////////
        /// </summary>
         
        //// GET: /Inventory/WarehousePO/GetAllWarehousePOView
        public JsonResult GetAllWarehousePOView()
        {
            var data = _aManager.GetAllWarehousePOView();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePO/GetIndividualWarehousePOView
        public JsonResult GetIndividualWarehousePOView(int WarehousePOMasterId)
        {
            var data = _aManager.GetIndividualWarehousePOView(WarehousePOMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePO/GetASingleProducDataOfWarehousePOView
        public JsonResult GetASingleProducDataOfWarehousePOView(int WarehousePODetailsId)
        {
            var data = _aManager.GetASingleProducDataOfWarehousePOView(WarehousePODetailsId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/WarehousePO/UpdateASingleProducDataOfWarehousePOView
        public JsonResult UpdateASingleProducDataOfWarehousePOView(InvWarehousePOItemReceived aObj)
        {
            var data = _aManager.UpdateASingleProducDataOfWarehousePOView(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/WarehousePO/GetAllApprovedWarehousePOViewByWarehouse
        public JsonResult GetAllApprovedWarehousePOViewByWarehouse()
        {
            var data = _aManager.GetAllApprovedWarehousePOViewByWarehouse();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePO/ChangeStatusValue
        public JsonResult ChangeStatusValue(InvWarehousePOMaster aObj)
        {
            var data = _aManager.ChangeStatusValue( aObj);
            return Json(data , JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        ////// GET: /Inventory/WarehousePO/ChangeStockValue
        public JsonResult ChangeStockValue(InvWarehousePOMaster aObj)
        {
            var data = _aManager.ChangeStockValue(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     
        }
    }
}