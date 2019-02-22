var a = 0;
var DuePaymentData = [];
var ReturnData = [];

var CreateDuePaymentManager = {
    SaveRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(OutletSaleUIData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletInvoice/UpdteInvoiceForDuePaymentReturn",
            data: JSON.stringify({ OutletSaleUIData: CreateDuePaymentHelper.GenerateBillForSaleReturn(), productList: DuePaymentData }),
            //data: JSON.stringify(OutletSaleUIData),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                    DuePaymentData = [];
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify(CreateOutletSaleUIHelper.GetOutletSaleUIData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateOutletSaleUIManager.GetOutletSaleUIDataTable();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },

    loadProductsForDropDown: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            data: 'json',
            url: '/Inventory/Product/GetAllProductsForDd',
            success: function (response, textStatus) {
                b = response.data;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    getStockQuantityOfAProduct: function (productId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletStock/GetStockQuantityOfAProduct',
            data: { productId: productId },

            success: function (response, textStatus) {
                debugger;
                if (response.result[0] != null) {

                    $("#txtCurrentStock").val(response.result[0].OutletStockQuantity);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


    LoadViewData: function (aData) { ///////////////////If two(2) objects are send by "CreateDuePaymentManager.LoadViewData(response);" Causes Response get two object named one is "Data" and another one is "Data2".
        debugger;
        DuePaymentData = [];
        DuePaymentData = aData.Data2;
        CreateDuePaymentHelper.GetDuePaymentDataTable();
    
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
    getDetailsbyOutletSaleInvoiceNo: function (SaleInvoiceNo) {  //////////////When two objects are sent/pass from here through "CreateDuePaymentManager.LoadViewData(response);". 
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
                CreateDuePaymentManager.LoadViewData(response);
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
            data: JSON.stringify(CreateDuePaymentHelper.GetDataToUpdteByOutletSaleInvoiceNo()),

            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    CreateDuePaymentHelper.GetDataToUpdteByOutletSaleInvoiceNo();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },

};


var CreateDuePaymentHelper = {
    CreateDuePaymentInit: function () {

        $('#txtNewPaymenthAmount, #txtDiscount').on('keyup keypress change', function (e) {
            // e.type is the type of event fired
            CreateDuePaymentHelper.GenerateBillForSaleUI();
           
        });

        $("#btnSearchOutletSaleInvoiceNo").click(function () {
            debugger;
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }
            if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0)) {
                CreateDuePaymentHelper.ClearDuePaymentFormNormal();
                CreateDuePaymentManager.getDetailsbyOutletSaleInvoiceNo(OutletSaleInvoiceNo);
            }
        });

        $("#btnUpdateRequest").click(function () {
            debugger;
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }
            if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0)) {
                
                //CreateDuePaymentManager.UpdteInvoiceDataByOutletSaleInvoiceNo();
                CreateDuePaymentManager.SaveRequest();
            }
        });
      
     

        $("#btnClearDuePayForm").click(function () {
            CreateDuePaymentHelper.ClearDuePaymentForm();
        });

        $('#myTableDuePay tbody').on('click', '#btnEditDuePayment', function (e) {
            debugger;
            var table = $('#myTableDuePay').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateDuePaymentHelper.populateDataForEditButton(data);
        });

        $('#myTableDuePay tbody').on('click', '#btnRemoveDuePayment', function () {
            debugger;
            var table = $('#myTableDuePay').DataTable();
            var data = table.row($(this).parents('tr')).data();

            var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldsSubTotal = parseFloat($("#txtSubTotal").val());
            var removedTotalPrice = parseFloat(data.TotalPrice);
            $("#txtSubTotal").val(parseFloat(oldsSubTotal) - parseFloat(removedTotalPrice));



            for (var i = DuePaymentData.length - 1; i >= 0; i--) {
                if (DuePaymentData[i].ProductId == data.ProductId) {
                    DuePaymentData.splice(i, 1);
                }
            }

            CreateDuePaymentHelper.GetDuePaymentDataTable();
            CreateDuePaymentHelper.GenerateBillForSaleUI();

        });
        CreateDuePaymentHelper.loadProductsDropDown();

      



        //$("#txtDiscount").click(function () {
        //    CreateDuePaymentHelper.GenerateBillForSaleUI();
        //    $("#txtDiscount").on("input", function () {
        //        debugger;
        //        CreateDuePaymentHelper.GenerateBillForSaleUI();
        //    });


        //});

        $("#txtCashAmount").click(function () {
            debugger;
            CreateDuePaymentHelper.GenerateBillForSaleUI();
            $("#txtCashAmount").on("input", function () {
               CreateDuePaymentHelper.GenerateBillForSaleUI();
            });

        });

        $("#txtCreditAmount").click(function () {
            debugger;
            CreateDuePaymentHelper.GenerateBillForSaleUI();
            $("#txtCreditAmount").on("input", function () {
                 CreateDuePaymentHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtSubTotal").change(function () {
            debugger;
            CreateDuePaymentHelper.GenerateBillForSaleUI();
            $("#txtSubTotal").on("input", function () {
                CreateDuePaymentHelper.GenerateBillForSaleUI();
            });
        });

    },
    
    loadProductsDropDown: function () {
        var productName = CreateDuePaymentManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearDuePaymentFormNormal: function () {
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


    ClearDuePaymentForm: function () {
        CreateDuePaymentHelper.ClearDuePaymentFormNormal();
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
        
        DuePaymentData = [];
        CreateDuePaymentHelper.GetDuePaymentDataTable();
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
      
     //   var newTotalPaidAmount = parseFloat($("#txtNewPaidAmount").val());
      //  var newRefundOrDue = parseFloat($("#txtNewRefundOrDue").val());

   //     var newTotalPaidAmount= 

       
      
        

        if (isNaN(subTotal)) { subTotal = 0; }
     //   if (isNaN(totalPrice)) { totalPrice = 0; }
        if (isNaN(vat)) { vat = 0; }
        if (isNaN(discount)) { discount = 0; }
        if ((subTotal) === 0) { discount = 0; }
        if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
        if (isNaN(rounding)) { rounding = 0; }
        if (isNaN(newPaidAmount)) { newPaidAmount = 0; }
      //  if (isNaN(cashAmount)) { cashAmount = 0; }
      //  if (isNaN(creditAmount)) { creditAmount = 0; }
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

        //parseFloat($("#txtSubTotal").val(subTotal));
        //parseFloat($("#txtTotalPrice").val(totalPrice));
        //vat = (subTotal * (.15));
        //payableAmount = ((subTotal + vat) - discount);
        //paidAmount = cashAmount + creditAmount;
        //refund = ((payableAmount - paidAmount));
        //parseFloat($("#txtSubTotal").val(subTotal));
        //parseFloat($("#txtTotalPrice").val(totalPrice));
        //parseFloat($("#txtVat").val(vat));
        //parseFloat($("#txtDiscount").val(discount));
        //parseFloat($("#txtRounding").val(rounding));
        //parseFloat($("#txtAmountPayable").val(payableAmount));
        //parseFloat($("#txtCashAmount").val(cashAmount));
        //parseFloat($("#txtCreditAmount").val(creditAmount));
        //parseFloat($("#txtPaidAmount").val(paidAmount));
        //parseFloat($("#txtRefundOrDue").val(refund));



        //var subTotal = parseFloat($("#txtSubTotal").val());
        //var totalPrice = parseFloat($("#txtTotalPrice").val());

        //var vat = parseFloat($("#txtVat").val());
        //var discount = parseFloat($("#txtDiscount").val());
        //var rounding = parseFloat($("#txtRounding").val());
        //var payableAmount = parseFloat($("#txtAmountPayable").val());
        //var cashAmount = parseFloat($("#txtCashAmount").val());
        //var creditAmount = parseFloat($("#txtCreditAmount").val());
        //var paidAmount = parseFloat($("#txtPaidAmount").val());
        //var refund = parseFloat($("#txtRefundOrDue").val());

        //if (isNaN(subTotal)) { subTotal = 0; }
        //if (isNaN(totalPrice)) { totalPrice = 0; }
        //if (isNaN(vat)) { vat = 0; }
        //if (isNaN(discount)) { discount = 0; }
        //if ((subTotal) === 0) { discount = 0; }
        //if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
        //if (isNaN(rounding)) { rounding = 0; }
        //if (isNaN(payableAmount)) { payableAmount = 0; }
        //if (isNaN(cashAmount)) { cashAmount = 0; }
        //if (isNaN(creditAmount)) { creditAmount = 0; }
        //if (isNaN(paidAmount)) { paidAmount = 0; }
        //if (isNaN(refund)) { refund = 0; }

        //parseFloat($("#txtSubTotal").val(subTotal));
        //parseFloat($("#txtTotalPrice").val(totalPrice));
        //vat = (subTotal * (.15));
        //payableAmount = ((subTotal + vat) - discount);
        //paidAmount = cashAmount + creditAmount;
        //refund = ((payableAmount - paidAmount));
        //parseFloat($("#txtSubTotal").val(subTotal));
        //parseFloat($("#txtTotalPrice").val(totalPrice));
        //parseFloat($("#txtVat").val(vat));
        //parseFloat($("#txtDiscount").val(discount));
        //parseFloat($("#txtRounding").val(rounding));
        //parseFloat($("#txtAmountPayable").val(payableAmount));
        //parseFloat($("#txtCashAmount").val(cashAmount));
        //parseFloat($("#txtCreditAmount").val(creditAmount));
        //parseFloat($("#txtPaidAmount").val(paidAmount));
        //parseFloat($("#txtRefundOrDue").val(refund));

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
        
        
     //   aObj.OutletSaleInvoiceNo = $("#txtInvoiceNo").val();
      //  aObj.ProductId = $("#hdnProductId").val();
      //  aObj.ProductPriceId = $("#hdnProductPriceId").val();
     //   aObj.SizeId = $("#cmbSizeId").val();
      //  aObj.UoMId = $("#cmbUoMId").val();
      //  aObj.ProductName = $("#txtProductName").val();
        //aObj.WarehouseId = $("#cmbWarehouseId").val();
        //aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        //aObj.ProductQuantity = $("#txtProductQuantity").val();
        //aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        //aObj.RetailPrice = $("#txtRetailPrice").val();
        //aObj.Discount = $("#txtDiscount").val();
      
        return aObj;
    },

    

    GetDuePaymentDataTable: function () {
        debugger;
        $('#myTableDuePay').dataTable().fnDestroy();
        $('#myTableDuePay').DataTable({
            data: DuePaymentData,
            "columns": [
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }, "width": "2%"
                 },
                { "data": "ProductName", "width": "10%" },
                { "data": "ProductMainBarcode", "width": "10%" },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "RetailPrice", "width": "7%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnSaleEdit" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnSaleReturn" type="button">Return</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnRemoveDuePayment" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },
            ],
        });
    },

    //CreateDuePaymentHelper.CalculateReturnDataTable();

       CalculateReturnDataTable: function(aData) {
           ReturnData.push(aData);
           CreateDuePaymentHelper.GetReturnDataTable();
       },

    GetReturnDataTable: function () {
        debugger;
        $('#myTableReturn').dataTable().fnDestroy();
        $('#myTableReturn').DataTable({
            data: ReturnData,
            "columns": [
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "2%"
                },
                { "data": "ProductName", "width": "10%" },
                //{ "data": "ProductMainBarcode", "width": "10%" },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "RetailPrice", "width": "7%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
              //  { "defaultContent": '<button class="btn btn-primary" id="btnSaleEdit" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
              //  { "defaultContent": '<button class="btn btn-primary" id="btnSaleReturn" type="button">Return</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnRemoveDuePayment" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },
            ],
        });
    },

   

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalDuePaymentPrice = 0;
        for (var i = 0; i < DuePaymentData.length; i++) {

            totalProduct += parseFloat(DuePaymentData[i].ProductQuantity);
            totalDuePaymentPrice += parseFloat(DuePaymentData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalDuePaymentPrice);
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

        CreateDuePaymentHelper.ClearDuePaymentFormNomal();
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



