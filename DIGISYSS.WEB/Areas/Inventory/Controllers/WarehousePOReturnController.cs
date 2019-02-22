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
    public class WarehousePOReturnController : System.Web.Mvc.Controller
    {
        private IWarehousePOReturnManager _aManager;

        public WarehousePOReturnController()
        {
            _aManager = new WarehousePOReturnManager();
        }

        //// GET: /Inventory/WarehousePOReturn/WarehousePOReturnSettings
        public ActionResult WarehousePOReturnSettings()
        {
            return View();
        }



        ////   GET: /Inventory/WarehousePOReturn/CreateWarehousePOReturnDetails
        public JsonResult CreateWarehousePOReturnDetails(WarehousePODetailsViewModel WarehousePOReturnData, List<ProductWarehousePOVM> productList)
        {
            // return null;
            var data = _aManager.CreateWarehousePOReturnDetails(WarehousePOReturnData, productList);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePOReturn/GetAllWarehousePOData
        public JsonResult GetAllWarehousePOData()
        {
            var data = _aManager.GetAllWarehousePOData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }









        /// <summary>
        /// /////////////   These Methods are used For Outlet PO View
        /// </summary>
        /// <returns></returns>


        //// GET: /Inventory/WarehousePOReturn/GetAllWarehousePO
        public JsonResult GetAllWarehousePO()
        {
            var data = _aManager.GetAllWarehousePO();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePOReturn/GetIndividualWarehousePO
        public JsonResult GetIndividualWarehousePO(int WarehousePOMasterId)
        {
            var data = _aManager.GetIndividualWarehousePO(WarehousePOMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePOReturn/GetASingleProducDataOfWarehousePO
        public JsonResult GetASingleProducDataOfWarehousePO(int WarehousePODetailsId)
        {
            var data = _aManager.GetASingleProducDataOfWarehousePO(WarehousePODetailsId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/WarehousePOReturn/UpdateASingleProducDataOfWarehousePO
        public JsonResult UpdateASingleProducDataOfWarehousePO(InvWarehousePODetail aObj)
        {
            var data = _aManager.UpdateASingleProducDataOfWarehousePO(aObj);
            //return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/WarehousePOReturn/GetAllReceivedWarehousePOByWarehouse
        public JsonResult GetAllReceivedWarehousePOByWarehouse()
        {
            var data = _aManager.GetAllReceivedWarehousePOByWarehouse();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        /////////////GET: /Inventory/WarehousePOReturn/ChangeStatusValueInMasterTable
        public JsonResult ChangeStatusValueInMasterTable(InvWarehousePOMaster aObj)
        {
            var data = _aManager.ChangeStatusValueInMasterTable(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }



        //// GET: /Inventory/WarehousePOReturn/ChangeStatusValueInDetailTable
        public JsonResult ChangeStatusValueInDetailTable(InvWarehousePODetail aObj)
        {
            var data = _aManager.ChangeStatusValueInDetailTable(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/WarehousePOReturn/ChangeStatusValueInDetailTable
        public JsonResult ChangeStatusValueInMasterOrDetail(InvWarehousePODetail aObj)
        {
            var data = _aManager.ChangeStatusValueInMasterOrDetail(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/WarehousePOReturn/ChangeStockValue
        public JsonResult ChangeStockValue(InvWarehousePOMaster aObj)
        {
            var data = _aManager.ChangeStockValue(aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);    //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

    }
}