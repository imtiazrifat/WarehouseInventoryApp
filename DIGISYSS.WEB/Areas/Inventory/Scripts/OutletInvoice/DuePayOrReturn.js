var productId;

$(document).ready(function () {
    CreateDuePaymentHelper.CreateDuePaymentInit();
    CreateDuePaymentHelper.GetDuePaymentDataTable();
    CreateAddProductHelper.CreateAddProductInit();
    CreateASoldProducDataHelper.CreateASoldProducDataInit();


    CreateOutletWarrentyRepairHelper.CreateOutletWarrentyRepairInit();///temporary but deleted later when its controller will be created


    $('#myTableDuePay tbody').on('click', '#btnAddProduct', function (e) {
        debugger;
        var table = $('#myTableDuePay').DataTable();
        var data = table.row($(this).parents('tr')).data();
       
        $('#hdnOutletInvoiceMasterId').val(data.OutletInvoiceMasterId);
        
        CreateAddProductManager.GetDetailsbyOutletInvoiceMasterId(data.OutletInvoiceMasterId);
    });
   
});

$(document).on('click', '#btnSaleEdit', function (e) {
    debugger;

    var table = $('#myTableDuePay').DataTable();
    var data = table.row($(this).parents('tr')).data();


    //OutletInvoiceMasterId = data.OutletInvoiceMasterId;
    //OutletInvoiceDetailsId = data.OutletInvoiceDetailsId;


    //for (var i = DuePaymentData.length - 1; i >= 0; i--) {
    //    if (DuePaymentData[i].ProductId == data.ProductId) {
    //        DuePaymentData.splice(i, 1);
    //    }
    //}
    CreateASoldProducDataHelper.LoadDataInForm(data);
    //CareateASoldProducDataManager.getASingleProducDataOfOutletInvoiceView(OutletInvoiceDetailsId);

   
    //var table = $('#myTableDuePay').DataTable();
    //var data = table.row($(this).parents('tr')).data();
    //OutletInvoiceMasterId = data.OutletInvoiceMasterId;
    //OutletInvoiceDetailsId = data.OutletInvoiceDetailsId;

   
    //for (var i = DuePaymentData.length - 1; i >= 0; i--) {
    //    if (DuePaymentData[i].ProductId == data.ProductId) {
    //        DuePaymentData.splice(i, 1);
    //    }
    //}

    //CareateASoldProducDataManager.getASingleProducDataOfOutletInvoiceView(OutletInvoiceDetailsId);
   //$('#popup2').dialog('open');
});

//$(document).on('click', '#btnAddProduct', function (e) {
//    var table = $('#myTableDuePay').DataTable();
//    var data = table.row($(this).parents('tr')).data();

//    $('#hdnOutletInvoiceMasterId').val(data.OutletInvoiceMasterId);

//    CreateAddProductManager.GetDetailsbyOutletInvoiceMasterId(data.OutletInvoiceMasterId);
//});

$(document).on('click', '#btnEditOutletWarrentyRepairData', function (e) {
    debugger;
    alert("Edit Outlet Warrenty Repair button is clicked");
    var table = $('#myTableOutletWarrentyRepair').DataTable();
    var data = table.row($(this).parents('tr')).data();

    $('#hdnOutletInvoiceMasterId').val(data.OutletInvoiceMasterId);
    //$('#txtOutletSaleInvoiceNo_OWR').val(data.OutletInvoiceMasterId);   ////wrong 
    //$('#txtOutletSaleInvoiceNo_OWR').val(data.OutletSaleInvoiceNo);   /////correct but no need to re-insert Outlet Invoice No.
    $('#txtProductName_OWR').val(data.ProductName);
    $('#txtProductQuantity_OWR').val(data.ProductQuantity);
    $('#txtPurchaseDate').val(data.CraetedDate);
    $('#txtPurchaseDate').val(data.CraetedDate);
});



