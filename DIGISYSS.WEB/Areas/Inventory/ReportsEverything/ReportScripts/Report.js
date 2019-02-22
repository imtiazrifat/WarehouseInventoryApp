$(document).ready(function() {
    ReportHelper.ReportInit();
});

var ReportManager = {
    GetReportByInvoiceNo: function (outletSaleInvoiceNo) {
        debugger;
        //var OutletSaleInvoiceNo = $("#hdnOutletSaleInvoiceNo").val();
        //var OutletSaleInvoiceNo = 1704260001;
        outletSaleInvoiceNo = parseInt(1704260001);
        $.ajax({
            type: "POST",
            url: "/Inventory/Report/SaleInvoiceData",
            data:{OutletSaleInvoiceNo:outletSaleInvoiceNo },
            dataType: "json",
            contentType: "application/json;charset:utf-8",
            success: function (response) {
                if (response) {
                    window.open("../Inventory/Report/SaleInvoiceReport");
                }
                else {
                    alert("No data found");
                }

            },
            error: function (response) {
            }
        });
    },
};

var ReportHelper = {
    
};