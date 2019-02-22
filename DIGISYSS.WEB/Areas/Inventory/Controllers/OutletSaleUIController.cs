using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class OutletSaleUIController : System.Web.Mvc.Controller
    {
        private IOutletSaleUIManager _aManager;

        public OutletSaleUIController()
        {
            _aManager = new OutletSaleUIManager();
        }

        //// GET: /Inventory/OutletSaleUI/OutletSaleUISettings
        public ActionResult OutletSaleUISettings()
        {
            return View();
        }
        //// GET: /Inventory/OutletSaleUI/OutletSaleUISettings
        public ActionResult AllOutletInvoiceView()
        {
            return View();
        }

        //////////GET: /Inventory/OutletSaleUI/GetIndividualOutletInvoiceData
        public JsonResult GetOutletSaleInvoiceNo()
        {
            var data = _aManager.GetOutletSaleInvoiceNo();
            return Json( data, JsonRequestBehavior.AllowGet);
        }

        ///////////////POST: /Inventory/OutletSaleUI/CreateOutletSaleUIDetails
        public JsonResult CreateOutletSaleUIDetails(OutletSaleUIDetailsViewModel OutletSaleUIData, List<OutletSaleUIVM> productList)
        {
             this.HttpContext.Session["rptSource"]  = _aManager.CreateOutletSaleUIDetails(OutletSaleUIData, productList);
            var data = _aManager.CreateOutletSaleUIDetails(OutletSaleUIData, productList);
            if (data != null)
            {
                return Json(new {success = true, data}, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { success =false, data }, JsonRequestBehavior.AllowGet);
            }                         
            
        }
        public void SaleInvoiceReport()

        {
            using (ReportClass rptH = new ReportClass())
            {
                rptH.FileName = Server.MapPath("~/Areas/Inventory/ReportsEverything/Reports/SaleInvoice.rpt");
                //var rptSource = _db.spSaleInvoice().ToList();
                var rptSource = System.Web.HttpContext.Current.Session["rptSource"];
                if (rptSource != null)
                {
                    rptH.Load();
                    rptH.SetDataSource(rptSource);
                    rptH.ExportToHttpResponse(ExportFormatType.PortableDocFormat, System.Web.HttpContext.Current.Response, false, "crReport");
                }
                Session["rptSource"] = null;
            }
        }

        //////////GET: /Inventory/OutletSaleUI/GetOutletSaleData
        public JsonResult GetOutletSaleData()
        {
            var data = _aManager.GetOutletSaleData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }

        //////////GET: /Inventory/OutletSaleUI/GetAllOutletInvoiceData
        public JsonResult GetAllOutletInvoiceData()
        {
            var data = _aManager.GetAllOutletInvoiceData();
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }


        //////////GET: /Inventory/OutletSaleUI/GetIndividualOutletInvoiceData
        public JsonResult GetIndividualOutletInvoiceData(int OutletInvoiceMasterId)
        {
            var data = _aManager.GetIndividualOutletInvoiceData(OutletInvoiceMasterId);
            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
        }
    }
}