var productId;
var OutletPOMasterId;
var OutletPODetailsId;
var totalPriceOfIndividualyOutletPOView;

$(document).ready(function () {

    AllOutletInvoiceManager.AllOutletInvoiceDataTable();
    

    $('#popup_IndividualInvoiceView').dialog({
        autoOpen: false,
        width: 800,
        resizable: false,
        modal: true,
        height: 500,
    });
  
    $('#myTableAllOutletInvoiceView tbody').on('click', '#btnSingleOutletInvoiceView', function (e) {
        debugger;
        var table = $('#myTableAllOutletInvoiceView').DataTable();
                var data = table.row($(this).parents('tr')).data();
                OutletInvoiceMasterId = parseInt(JSON.stringify(data.OutletInvoiceMasterId));
                OutletInvoiceDetailsId = parseInt(JSON.stringify(data.OutletInvoiceDetailsId));
                $("#hdnProductId").val(data.ProductId);
                $("#textOutletName").val(data.OutletName);
                $("#txtTotalQuantity").val(data.ProductQuantity);
                $("#txtTotalPrice").val(data.TotalGrandPrice);
        
        IndividualOutletInvoiceManager.GetIndividualOutletInvoiceDataTable();
        debugger;
        $('#popup_IndividualInvoiceView').dialog('open');
    });
});