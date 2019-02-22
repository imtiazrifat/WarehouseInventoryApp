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
    public class OutletInvoiceController : System.Web.Mvc.Controller
    {
        private IOutletInvoiceManager _aManager;

        public OutletInvoiceController()
        {
            _aManager = new  OutletInvoiceManager();
        }

        //// GET: /Inventory/ OutletInvoice/ OutletInvoiceSettings
        public ActionResult OutletInvoiceSettings()
        {
            return View();
        }

        ////// GET: /Inventory/ OutletInvoice/ DuePaymentSettings
        //public ActionResult DuePaymentSettings()
        //{
        //    return View();
        //}


        //// GET: /Inventory/ OutletInvoice/ DuePayOrReturn
        public ActionResult DuePayOrReturn()
        {
            return View();
        }


        //////////GET: /Inventory/OutletInvoice/GetAllOutletInvoiceData
        public JsonResult GetAllOutletInvoiceData()
        {
            var data = _aManager.GetAllOutletInvoiceData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

         //////////GET: /Inventory/OutletInvoice/GetIndividualOutletInvoiceData
        public JsonResult GetIndividualOutletInvoiceData(int OutletInvoiceMasterId)
        {
            var data = _aManager.GetIndividualOutletInvoiceData(OutletInvoiceMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //// GET: /Inventory/OutletInvoice/GetAProducDataByOutletInvoiceDetailsId
        public JsonResult GetAProducDataByOutletInvoiceDetailsId(int OutletInvoiceDetailsId)
        {
            var data = _aManager.GetAProducDataByOutletInvoiceDetailsId(OutletInvoiceDetailsId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //// GET: /Inventory/OutletInvoice/UpdateASoldProducData
        public JsonResult UpdateASoldProducData(InvOutletInvoiceDetail aObj)
        {
            var data = _aManager.UpdateASoldProducData(aObj);
            //return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            return Json(data, JsonRequestBehavior.AllowGet);
        }



        //////////GET: /Inventory/OutletInvoice/GetDetailsByOutletInvoiceMasterId
        public JsonResult GetDetailsByOutletInvoiceMasterId(int OutletInvoiceMasterId)
        {
            var data = _aManager.GetDetailsByOutletInvoiceMasterId(OutletInvoiceMasterId);
            return Json(  data , JsonRequestBehavior.AllowGet);
        }

        //////////GET: /Inventory/OutletInvoice/GetDetailsByOutletInvoiceDetailsId
        public JsonResult GetDetailsByOutletInvoiceDetailsId(int OutletInvoiceDetailsId)
        {
            var data = _aManager.GetDetailsByOutletInvoiceDetailsId(OutletInvoiceDetailsId);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        //////////GET: /Inventory/OutletInvoice/GetDetailsByOutletSaleInvoiceNo
        public JsonResult GetDetailsByOutletSaleInvoiceNo(int OutletSaleInvoiceNo)
        {
            var data = _aManager.GetDetailsByOutletSaleInvoiceNo(OutletSaleInvoiceNo);
              return Json( data, JsonRequestBehavior.AllowGet); ;
        }

        //////////GET: /Inventory/OutletInvoice/UpdteInvoiceDataByOutletSaleInvoiceNo
        public JsonResult UpdteInvoiceDataByOutletSaleInvoiceNo(InvOutletInvoiceMaster aObj)
        {
            var data = _aManager.UpdteInvoiceDataByOutletSaleInvoiceNo(aObj);
              return Json( data, JsonRequestBehavior.AllowGet); ;
        }

        //GET: /Inventory/OutletInvoice/UpdteInvoiceForDuePaymentReturn
        public JsonResult UpdteInvoiceForDuePaymentReturn(OutletSaleUIDetailsViewModel OutletSaleUIData, List<OutletSaleUIVM> productList)
        {
            var data = _aManager.UpdteInvoiceForDuePaymentReturn(OutletSaleUIData,productList);
              return Json( data, JsonRequestBehavior.AllowGet); ;
        }

        

    }
}