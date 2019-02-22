using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;

namespace DIGISYSS.WEB.Areas.Inventory.ReportsEverything.ReportControllers
{
    public class ReportController : System.Web.Mvc.Controller
    {
        private Entities.RetailSalesManagementEntities _db;
        public ReportController()
        {
            _db = new Entities.RetailSalesManagementEntities();
        }
        // POST: Inventory/Report/SaleInvoiceData
        public JsonResult SaleInvoiceData(int outletSaleInvoiceNo)
        {
            Session["rptSource"] = _db.spSaleInvoice(outletSaleInvoiceNo).ToList();
            int data = _db.spSaleInvoice(outletSaleInvoiceNo).ToList().Count();
            return Json(data > 0, JsonRequestBehavior.AllowGet);
            //return null;
        }
        // GET: Inventory/Report/SaleInvoiceReport
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
    }
}