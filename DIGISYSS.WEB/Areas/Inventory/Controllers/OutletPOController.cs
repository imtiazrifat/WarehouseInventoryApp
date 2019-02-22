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
    public class OutletPOController : System.Web.Mvc.Controller
    {
        private IOutletPOManager _aManager;

        public OutletPOController()
        {
            _aManager = new OutletPOManager();
        }

        //// GET: /Inventory/OutletPO/OutletPOSettings
        public ActionResult OutletPOSettings()
        {
            return View();
        }



        ////   GET: /Inventory/OutletPO/CreateOutletPODetails
        public JsonResult CreateOutletPODetails(OutletPODetailsViewModel OutletPOData, List<ProductOutletPOVM> productList)
        {
            // return null;
            var data = _aManager.CreateOutletPODetails(OutletPOData, productList);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/OutletPO/GetAllOutletPOData
        public JsonResult GetAllOutletPOData()
        {
            var data = _aManager.GetAllOutletPOData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }









        /// <summary>
        /// /////////////   These Methods are used For Outlet PO View
        /// </summary>
        /// <returns></returns>


        //// GET: /Inventory/OutletPO/GetAllOutletPOView
        public JsonResult GetAllOutletPOView()
        {
            var data = _aManager.GetAllOutletPOView();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/OutletPO/GetIndividualOutletPOView
        public JsonResult GetIndividualOutletPOView(int OutletPOMasterId)
        {
            var data = _aManager.GetIndividualOutletPOView(OutletPOMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/OutletPO/GetASingleProducDataOfOutletPOView
        public JsonResult GetASingleProducDataOfOutletPOView(int OutletPODetailsId)
        {
            var data = _aManager.GetASingleProducDataOfOutletPOView(OutletPODetailsId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/OutletPO/UpdateASingleProducDataOfOutletPOView
        public JsonResult UpdateASingleProducDataOfOutletPOView(InvOutletPODetail aObj)
        {
            var data = _aManager.UpdateASingleProducDataOfOutletPOView(aObj);
            //return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/OutletPO/GetAllApprovedOutletPOViewByWarehouse
        public JsonResult GetAllApprovedOutletPOViewByWarehouse()
        {
            var data = _aManager.GetAllApprovedOutletPOViewByWarehouse();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //Only Received Product can be returned,and this methosd  to show all received products

        //// GET: /Inventory/OutletPO/GetAllReceivedOutletPOByWarehouse
        public JsonResult GetAllReceivedOutletPoByWarehouse()
        {
            var data = _aManager.GetAllReceivedOutletPoByWarehouse();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        /////////////GET: /Inventory/OutletPO/ChangeStatusValueInMasterTable
        public JsonResult ChangeStatusValueInMasterTable(InvOutletPOMaster aObj)
        {
            var data = _aManager.ChangeStatusValueInMasterTable(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }



        //// GET: /Inventory/OutletPO/ChangeStatusValueInDetailTable
        public JsonResult ChangeStatusValueInDetailTable(InvOutletPODetail aObj)
        {
            var data = _aManager.ChangeStatusValueInDetailTable(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/OutletPO/ChangeStatusValueInDetailTable
        public JsonResult ChangeStatusValueInMasterOrDetail(InvOutletPODetail aObj)
        {
            var data = _aManager.ChangeStatusValueInMasterOrDetail(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);     //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/OutletPO/ChangeStockValue
        public JsonResult ChangeStockValue(InvOutletPOMaster aObj)
        {
            var data = _aManager.ChangeStockValue( aObj);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);    //To show message after operation must be write code  " return Json(data , JsonRequestBehavior.AllowGet);"  instid of return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

    }
}