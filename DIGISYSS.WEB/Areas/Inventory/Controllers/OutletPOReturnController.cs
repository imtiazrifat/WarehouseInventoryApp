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
    public class OutletPOReturnController : System.Web.Mvc.Controller
    {
        private IOutletPOReturnManager _aManager;

        public OutletPOReturnController()
        {
            _aManager = new OutletPOReturnManager();
        }

        //// GET: /Inventory/OutletPOReturn/OutletPOReturnSettings
        public ActionResult OutletPOReturnSettings()
        {
            return View();
        }



        ////   GET: /Inventory/OutletPOReturn/OutletPoReturnDetails
        public JsonResult OutletPoReturnDetails(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList)
        {
            // return null;
            var data = _aManager.OutletPoReturnDetails(OutletPOReturnData, productList);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/OutletPOReturn/GetAllOutletPoReturnRequest
        public JsonResult GetAllOutletPoReturnRequest()
        {
            var data = _aManager.GetAllOutletPoReturnRequest();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
        //// GET: /Inventory/OutletPOReturn/GetIndividualOutletPoReturnView
        public JsonResult GetIndividualOutletPoReturnView(int OutletPOReturnMasterId)
        {
            var data = _aManager.GetIndividualOutletPoReturnView(OutletPOReturnMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        ////   GET: /Inventory/OutletPOReturn/OutletPoReturnByMarterId
        public JsonResult OutletPoReturnByMarterId(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList)
        {
            // return null;
            var data = _aManager.OutletPoReturnByMarterId(OutletPOReturnData, productList);
            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
        }

        /////////////GET: /Inventory/OutletPOReturn/ChangeStatusValueInMasterTable
        public JsonResult ChangeStatusValueInMasterTable(InvOutletPOReturnMaster aObj)
        {
            var data = _aManager.ChangeStatusValueInMasterTable(aObj);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


        ///////////////GET: /Inventory/OutletPOReturn/ReturnOutletPoByMasterId
        //public JsonResult ReturnOutletPoByMasterId(InvOutletPOMaster aObj)
        //{
        //    var data = _aManager.ReturnOutletPoByMasterId(aObj);
        //    return Json(data, JsonRequestBehavior.AllowGet);     
        //}

        ////// GET: /Inventory/OutletPOReturn/ReturnOutletPoByDetailId
        //public JsonResult ReturnOutletPoByDetailId(InvOutletPODetail aObj)
        //{
        //    var data = _aManager.ReturnOutletPoByDetailId(aObj);
        //    return Json(data, JsonRequestBehavior.AllowGet);    
        //}

    }
}