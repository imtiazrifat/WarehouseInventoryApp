var a = 0;
var OutletWarrentyRepairData = [];

var CreateOutletWarrentyDataManager = {

    SaveOutletWarrentyData: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletWarrentyRepair/SaveOutletWarrentyData",
            data: JSON.stringify(CreateOutletWarrentyDataManager.GetSaveOutletWarrentyData()),
        
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    ViewOutletWarrentyRepairManager.GetSaveOutletWarrentyDataTable();
                    CreateOutletWarrentyDataManager.ClearOutletWarrentyDataForm();
                }
            },
            error: function (response) {
                $("#dialogsimple").html(response.data.Message);
                $('#dialogsimple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },

  

   


    LoadViewData: function (aData) { ///////////////////If two(2) objects are send by "CreateOutletWarrentyDataManager.LoadViewData(response);" Causes Response get two object named one is "Data" and another one is "Data2".
        debugger;
        OutletWarrentyRepairData = [];
        OutletWarrentyRepairData = aData.Data2;
        CreateOutletWarrentyDataHelper.GetOutletWarrentyDataTable();

        var data = aData.Data;
        //alert(JSON.stringify(data));
        $("#hdnOutletInvoiceMasterId").val(data[0].OutletInvoiceMasterId);
        $("#hdnProductId").val(data[0].ProductId);
        $("#txtSubTotal").val(data[0].TotalGrandPrice);
        $("#txtTotalPrice").val(data[0].TotalPrice);
        $("#txtVat").val(data[0].VAT);
        $("#txtDiscount").val(data[0].Discount);
        $("#txtRounding").val(data[0].Rounding);
        $("#txtAmountPayable").val(data[0].PayableAmount);
        $("#txtCashAmount").val(data[0].Cash);
        $("#txtCreditAmount").val(data[0].Credit);
        $("#txtPaidAmount").val(data[0].PaidAmount);
        $("#txtRefundOrDue").val(data[0].DueOrRefund);
       

    },
    getDetailsbyOutletSaleInvoiceNo: function (SaleInvoiceNo) {  //////////////When two objects are sent/pass from here through "CreateOutletWarrentyDataManager.LoadViewData(response);". 
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletInvoice/GetDetailsByOutletSaleInvoiceNo',
            data: { OutletSaleInvoiceNo: SaleInvoiceNo },
            success: function (response, textStatus) {
                debugger;
                //alert(JSON.stringify(response.Data));
                //alert(JSON.stringify(response.Data2));
                CreateOutletWarrentyRepairManager.LoadViewData(response);
                if (response.result[0] != null) {
                    debugger;
                    ////$("#hdnProductId").val(data[0].ProductId);
                    ////$("#txtSubTotal").val(data[0].TotalGrandPrice);
                    ////$("#txtTotalPrice").val(data[0].TotalPrice);
                    ////$("#txtVat").val(data[0].VAT);
                    ////$("#txtDiscount").val(data[0].Discount);
                    ////$("#txtRounding").val(data[0].Rounding);
                    ////$("#txtAmountPayable").val(data[0].PayableAmount);
                    ////$("#txtCashAmount").val(data[0].Cash);
                    ////$("#txtCreditAmount").val(data[0].Credit);
                    ////$("#txtPaidAmount").val(data[0].PaidAmount);
                    ////$("#txtRefundOrDue").val(data[0].DueOrRefund);
                    debugger;
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


    UpdteInvoiceDataByOutletSaleInvoiceNo: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletInvoice/UpdteInvoiceDataByOutletSaleInvoiceNo",
            data: JSON.stringify(CreateOutletWarrentyDataHelper.GetDataToUpdteByOutletSaleInvoiceNo()),

            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    CreateOutletWarrentyDataHelper.GetDataToUpdteByOutletSaleInvoiceNo();
                }
            },
            error: function (response) {
                $("#dialogsimple").html(response.data.Message);
                $('#dialogsimple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },

};


var CreateOutletWarrentyDataHelper = {
    CreateOutletWarrentyDataInit: function () {

        $('#txtNewPaymenthAmount, #txtDiscount').on('keyup keypress change', function (e) {
            // e.type is the type of event fired
          
            CreateOutletWarrentyDataHelper.GenerateBillForSaleUI();
           
        });

        $("#btnSearchOutletSaleInvoiceNo").click(function () {
            debugger;
           
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }
            if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0)) {
                CreateOutletWarrentyDataHelper.ClearOutletWarrentyDataFormNormal();
                CreateOutletWarrentyDataManager.getDetailsbyOutletSaleInvoiceNo(OutletSaleInvoiceNo);
            }
        });


        $("#btnSaveOutletWarrentyData").click(function () {
            debugger;
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }
            if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0) && ($("#txtProductName").val() !== '') && (($("#cmbWarrentyId").val() !== ''))) {
                
                //CreateOutletWarrentyDataManager.UpdteInvoiceDataByOutletSaleInvoiceNo();
                CreateOutletWarrentyDataManager.SaveOutletWarrentyData();
            }
        });
      
     

        $("#btnClearDuePayForm").click(function () {
            CreateOutletWarrentyDataHelper.ClearOutletWarrentyDataForm();
        });

        


        $('#myTableDuePay tbody').on('click', '#btnEditOutletWarrentyData', function (e) {
            debugger;
            var table = $('#myTableDuePay').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateOutletWarrentyDataHelper.populateDataForEditButton(data);
        });

        $('#myTableDuePay tbody').on('click', '#btnRemoveOutletWarrentyData', function () {
            debugger;
            var table = $('#myTableDuePay').DataTable();
            var data = table.row($(this).parents('tr')).data();

            var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldsSubTotal = parseFloat($("#txtSubTotal").val());
            var removedTotalPrice = parseFloat(data.TotalPrice);
            $("#txtSubTotal").val(parseFloat(oldsSubTotal) - parseFloat(removedTotalPrice));



            for (var i = OutletWarrentyData.length - 1; i >= 0; i--) {
                if (OutletWarrentyData[i].ProductId == data.ProductId) {
                    OutletWarrentyData.splice(i, 1);
                }
            }
            CreateOutletWarrentyDataHelper.GetOutletWarrentyDataTable();
            CreateOutletWarrentyDataHelper.GenerateBillForSaleUI();
        });
    },
    


    ClearOutletWarrentyDataFormNormal: function () {
        $("#txtProductName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtWholeSalePrice").val('');
        $("#txtRetailPrice").val('');
        $("#txtPriceAmount").val('');
        $("#txtVATForInvididualProduct").val('');
        $("#txtSize").val('');
        $("#txtBarcode").val('');
        $("#txtItemName").val('');
        $("#txtUoM").val('');


        $("#txtAmountPayable").val('');
        $("#txtBranchName").val('');
        $("#txtSalePerson").val('');
        $("#txtInvoiceNo").val('');
        $("#txtCustomerName").val('');
        $("#txtCurrentStock").val('');
        $("#txtSubTotal").val('');
        $("#txtVat").val('');
        $("#txtRounding").val('');
        $("#txtDiscount").val('');
        $("#txtAmountPayable").val('');
        $("#txtCashAmount").val('');
        $("#txtCreditAmount").val('');
        $("#txtPaidAmount").val('');
        $("#txtRefundOrDue").val('');
        
        
        
        $("#txtPrice").val('');////though it is a field of EditSaleData get empty by clear call.
    },


    ClearOutletWarrentyDataForm: function () {
        CreateOutletWarrentyDataHelper.ClearOutletWarrentyDataFormNormal();
        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $('#hdnOutletSaleInvoiceNo').val(0);
        $('#txtOutletSaleInvoiceNo').val(0);
        $("#txtProductName").val('');
        $("#cmbWarehouseId").val('').trigger("change");
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
        
        OutletWarrentyData = [];
        CreateOutletWarrentyDataHelper.GetOutletWarrentyDataTable();
    },
 
    GenerateBillForSaleUI: function () {
        debugger;
        var subTotal = parseFloat($("#txtSubTotal").val());
        var vat = parseFloat($("#txtVat").val());
        var discount = parseFloat($("#txtDiscount").val());
        var rounding = parseFloat($("#txtRounding").val());
        var payableAmount = parseFloat($("#txtAmountPayable").val());
        var paidAmount = parseFloat($("#txtPaidAmount").val());
        var refundOrDue = parseFloat($("#txtRefundOrDue").val());

        var newPaidAmount = parseFloat($("#txtNewPaymenthAmount").val());

        if (isNaN(subTotal)) { subTotal = 0; }
        if (isNaN(vat)) { vat = 0; }
        if (isNaN(discount)) { discount = 0; }
        if ((subTotal) === 0) { discount = 0; }
        if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
        if (isNaN(rounding)) { rounding = 0; }
        if (isNaN(newPaidAmount)) { newPaidAmount = 0; }
        if (isNaN(paidAmount)) { paidAmount = 0; }
        if (isNaN(refundOrDue)) { refundOrDue = 0; }

        payableAmount = (subTotal+vat)- discount;
        refundOrDue = payableAmount - paidAmount;
        parseFloat($("#txtRefundOrDue").val(refundOrDue));
        parseFloat($("#txtAmountPayable").val(payableAmount));
        var newTotalPaidAmount = paidAmount + newPaidAmount;
        var newRefundOrDue = payableAmount - newTotalPaidAmount;

        parseFloat($("#txtNewPaidAmount").val(newTotalPaidAmount));
        parseFloat($("#txtNewRefundOrDue").val(newRefundOrDue));
    },


    GenerateBillForSaleReturn: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#txtOutletSaleInvoiceNo").val();

        aObj.TotalGrandPrice = $("#txtSubTotal").val();
        aObj.VAT = $("#txtVat").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.Rounding = $("#txtRounding").val();
        aObj.PayableAmount = $("#txtAmountPayable").val();

        aObj.NewPaymenthAmount = $("#txtNewPaymenthAmount").val();

        aObj.NewPaidAmount = $("#txtNewPaidAmount").val();
        aObj.NewRefundOrDue = $("#txtNewRefundOrDue").val();
        return aObj;
    },

    

    GetOutletWarrentyDataTable: function () {
        debugger;
        $('#myTableOutletWarrentyData').dataTable().fnDestroy();
        $('#myTableOutletWarrentyData').DataTable({
            data: OutletWarrentyData,
            "columns": [
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings.iDisplayStart + 1;
                     }, "width": "2%"
                 },
                { "data": "ProductName", "width": "10%" },
                { "data": "ProductMainBarcode", "width": "10%" },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "RetailPrice", "width": "7%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletWarrentyData" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-primary" id="btnSaleReturn" type="button">Return</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnRemoveOutletWarrentyData" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },
            ],
        });
    },

   

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalOutletWarrentyDataPrice = 0;
        for (var i = 0; i < OutletWarrentyData.length; i++) {

            totalProduct += parseFloat(OutletWarrentyData[i].ProductQuantity);
            totalOutletWarrentyDataPrice += parseFloat(OutletWarrentyData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletWarrentyDataPrice);
    },

    GetDataToUpdteByOutletSaleInvoiceNo: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletSaleInvoiceNo = $('#txtOutletSaleInvoiceNo').val();
        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.Cash = $("#txtCashAmount").val();
        aObj.Credit = $("#txtCreditAmount").val();
        aObj.Rounding = $("#txtRounding").val();
        aObj.PaidAmount = $("#txtPaidAmount").val();
        aObj.DueOrRefund = $("#txtRefundOrDue").val();
        return aObj;
    },


    populateDataForEditButton: function (aObj) {

        CreateOutletWarrentyDataHelper.ClearOutletWarrentyDataFormNomal();
        $('#hdnOutletInvoiceId').val(aObj.OutletInvoiceId);
        $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtBarcode").val(aObj.Barcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.Size);
        $("#txtUoM").val(aObj.UoMShortName);
        $("#txtAmountPayable").val((aObj.RetailPrice) * (aObj.ProductQuantity));
    },
}



