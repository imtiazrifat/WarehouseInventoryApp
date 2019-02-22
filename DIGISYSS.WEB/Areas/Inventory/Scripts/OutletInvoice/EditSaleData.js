
var DuePaymentData = [];



var CareateASoldProducDataManager = {
    UpdateASoldProducDataInOutletInvoice: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletInvoice/UpdateASoldProducData",
            data: JSON.stringify(CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate()),

            success: function (data) {
                debugger;
                if (data != null) {
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    CreateASoldProducDataHelper.ClearOutletInvoiceViewForm();
                    CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate();
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

    getASingleProducDataOfOutletInvoiceView: function (OutletInvoiceDetailsId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletInvoice/GetAProducDataByOutletInvoiceDetailsId',
            data: { OutletInvoiceDetailsId: OutletInvoiceDetailsId },
            success: function (response, textStatus) {
                debugger;
                if (response.data[0] != null) {

                    $("#hdnProductId_Esd").val(response.data[0].ProductId);
                    $("#hdnOutletInvoiceMasterId").val(response.data[0].OutletInvoiceMasterId);
                    $("#hdnOutletInvoiceDetailsId").val(response.data[0].OutletInvoiceDetailsId);
                    $("#txtProductName_Esd").val(response.data[0].ProductName);
                    $("#txtRetailPrice").val(response.data[0].RetailPrice);
                    $("#txtProductQuantity_Esd").val(response.data[0].ProductQuantity);
                    $('#txtTempProductQuantity').val(response.data[0].ProductQuantity);
                    $("#txtItemName").val(response.data[0].ItemName);
                    $("#txtSize").val(response.data[0].SizeName);
                    $("#txtUoM").val(response.data[0].UoMShortName);
                    $("#txtBarcode").val(response.data[0].ProductMainBarcode);
                    $("#txtPrice_Ep").val($("#txtRetailPrice").val() * $("#txtProductQuantity_Esd").val());

                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },
}


var CreateASoldProducDataHelper = {
    GetReturnDataObj: function () {
        debugger;
        var aObj = new Object();

        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#hdnOutletSaleInvoiceNo").val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#txtProductName_Esd').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.OutletId = $("#hdnOutletId").val();
        aObj.ProductQuantity = $("#txtProductQuantity_Esd").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.Size = $("#txtSize").val();
        aObj.UoMShortName = $("#hdnUoMShortName").val();
        aObj.ProductMainBarcode = $("#hdnProductMainBarcode").val();
        aObj.VAT = $("#hdnVAT").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.SizeName = $("#hdnSizeName").val();
        aObj.TotalPrice = $("#hdnTotalPrice").val();
        aObj.UnitPrice = $("#hdnhdnUnitPrice").val();
        aObj.Status = "Edited";
        return aObj;

    },

    LoadDataInForm: function (aData) {
        debugger;
        $("#hdnProductId").val(aData.ProductId);
        $("#hdnOutletInvoiceMasterId").val(aData.OutletInvoiceMasterId);
        $("#hdnOutletInvoiceDetailsId").val(aData.OutletInvoiceDetailsId);
        $("#txtProductName_Esd").val(aData.ProductName);
        $("#txtRetailPrice").val(aData.RetailPrice);
        $("#txtProductQuantity_Esd").val(aData.ProductQuantity);
       
        $("#hdnOutletId").val(aData.hdnOutletId);
        $("#hdnOutletSaleInvoiceNo").val(aData.OutletSaleInvoiceNo);
        $('#txtPrice_Ep').val(aData.PriceAmount);

        
        $("#hdnProductMainBarcode").val(aData.ProductMainBarcode);
      //  $("#hdnProductQuantity").val(aData.ProductQuantity);
        $('#hdnSizeName').val(aData.SizeName);

        $("#hdnTotalPrice").val(aData.TotalPrice);
        $("#hdnUnitPrice").val(aData.UnitPrice);
        $('#hdnVAT').val(aData.VAT);
        $('#hdnUoMShortName').val(aData.UoMShortName);
        

        //<input type="text" id="hdnDiscount" hidden="" />
        //                             <input type="text" id="hdnItemId" hidden="" />
        //                             <input type="text" id="hdnItemName" hidden="" />
        //                             <input type="text" id="hdnOutletId" hidden="" />
        //                             //<input type="text" id="hdnOutletInvoiceDetailsId" hidden="" />
        //                             //<input type="text" id="hdnOutletInvoiceMasterId" hidden="" />
        //                             <input type="text" id="hdnOutletName" hidden="" />
        //                             <input type="text" id="hdnOutletSaleInvoiceNo" hidden="" />
        //                             <input type="text" id="hdnPriceAmount" hidden="" />
        //                           //  <input type="text" id="hdnProductId" hidden=""/>
        //                             <input type="text" id="hdnProductMainBarcode" hidden="" />
        //                             <input type="text" id="hdnProductName" hidden="" />
        //                             <input type="text" id="hdnhdnProductQuantitye" hidden="" />
        //                             <input type="text" id="hdnSizeName" hidden="" />
        //                             <input type="text" id="hdnTotalGrandPrice" hidden="" />
        //                             <input type="text" id="hdnTotalPrice" hidden=""/>
        //                             <input type="text" id="hdnUnitPrice" hidden="" />
        //                             <input type="text" id="hdnUoMShortName" hidden="" />
        //                             <input type="text" id="hdnVAT" hidden="" />

        //$("#hdnProductId_Esd").val(aData.ProductId);
        //$("#hdnOutletInvoiceMasterId").val(aData.OutletInvoiceMasterId);
        //$("#hdnOutletInvoiceDetailsId").val(aData.OutletInvoiceDetailsId);
        //$("#txtProductName_Esd").val(aData.ProductName);
        //$("#txtRetailPrice").val(aData.RetailPrice);
        //$("#txtProductQuantity_Esd").val(aData.ProductQuantity);
        //$('#txtTempProductQuantity').val(aData.ProductQuantity);
        //$("#txtItemName").val(aData.ItemName);
        //$("#txtSize").val(aData.SizeName);
        //$("#txtUoM").val(aData.UoMShortName);
        //$("#txtBarcode").val(aData.ProductMainBarcode);
        //$("#txtPrice_Ep").val($("#txtRetailPrice").val() * $("#txtProductQuantity_Esd").val());
    },

    CreateASoldProducDataInit: function () {

        $("#txtProductQuantity_Esd").on("input", function () {
            debugger;
            $("#txtPrice_Ep").val($("#txtRetailPrice").val() * $("#txtProductQuantity_Esd").val());
        });

        $("#btnUpdateSaleData").click(function() {
            debugger;
            if (($("#txtProductName_Esd").val() === '') && ($("#txtProductQuantity_Esd").val() === '') && ($("#txtPrice_Esd").val() === '')) {
                $("#myModal #modal-body #rif").html("Product and product quantiy fields are required.");
                $('#myModal').appendTo("body").modal('show');
            } else if (($("#txtProductName_Esd").val() === '')) {
                $("#myModal #modal-body #rif").html("Product name field is required.");
                $('#myModal').appendTo("body").modal('show');
            } else if (($("#txtProductQuantity_Esd").val() === '')) {
                $("#myModal #modal-body #rif").html("Product quantity field is required.");
                $('#myModal').appendTo("body").modal('show');
            } else if (($("#txtPrice_Esd").val() === '')) {
                $("#myModal #modal-body #rif").html("Price field is required.");
                $('#myModal').appendTo("body").modal('show');
            } else if (($("#hdnOutletInvoiceMasterId").val() < 0) && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductQuantity_Esd").val() > 0)) {
                
            }
            else if (($("#hdnOutletInvoiceMasterId").val() > 0) && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductQuantity_Esd").val() > 0)) {
                debugger;
                var productQuantity = $('#txtProductQuantity_Esd').val();
                var priceAmount = $('#txtPrice_Ep').val();
              //  var aProductDetails = CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate();
                var aProductDetails = CreateASoldProducDataHelper.GetReturnDataObj();

                CreateDuePaymentHelper.CalculateReturnDataTable(aProductDetails);
        }


            //if (($("#txtProductName_Esd").val() === '') && ($("#txtProductQuantity_Esd").val() === '') && ($("#txtPrice_Esd").val() === '')) {
            //    $("#myModal #modal-body #rif").html("Product and product quantiy fields are required.");
            //    $('#myModal').appendTo("body").modal('show');
            //}


            //else if (($("#txtProductName_Esd").val() === '')) {
            //    $("#myModal #modal-body #rif").html("Product name field is required.");
            //    $('#myModal').appendTo("body").modal('show');
            //}
            //else if (($("#txtProductQuantity_Esd").val() === '') ) {
            //    $("#myModal #modal-body #rif").html("Product quantity field is required.");
            //    $('#myModal').appendTo("body").modal('show');
            //}
            //else if (($("#txtPrice_Esd").val() === '')) {
            //    $("#myModal #modal-body #rif").html("Price field is required.");
            //    $('#myModal').appendTo("body").modal('show');
            //}
            //else if (($("#hdnOutletInvoiceMasterId").val() < 0) && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductQuantity_Esd").val() > 0)) {
            //    debugger;
            //    var productQuantity = $('#txtProductQuantity_Esd').val();
            //    var priceAmount = $('#txtPrice_Esd').val();
            //    var aProductDetails = CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate();
            //    var aProductDetails = CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate();

            //    for (var i = DuePaymentData.length - 1; i >= 0; i--) {
            //        if (DuePaymentData[i].ProductId == aProductDetails.ProductId) {
            //            var oldQuantity = DuePaymentData[i].ProductQuantity;
            //            var oldPrice = DuePaymentData[i].PriceAmount;
            //            productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
            //            priceAmount = parseInt(oldPrice) + parseInt(priceAmount);
            //            DuePaymentData.splice(i, 1);
            //        }
            //    }
            //    var totalPrice = aProductDetails.RetailPrice * productQuantity;
            //    var totalPrice = aProductDetails.UnitPrice * productQuantity;
            //    aProductDetails.ProductQuantity = productQuantity;
            //    aProductDetails.PriceAmount = priceAmount;
            //    aProductDetails.TotalPrice = totalPrice;
            //    var vat = ((totalPrice) * .15);
            //    aProductDetails.VAT = vat;

            //    DuePaymentData.push(aProductDetails);
            //    CreateDuePaymentHelper.PopulateGrandTotalPriceQuentity();
            //    CreateDuePaymentHelper.GetDuePaymentDataTable();
            //    //$("#txtProductQuantity_Esd").val('');
            //    //$("#txtPriceAmount").val('');
            //    //$("#txtVATForInvididualProduct").val('');
            //    //alert(JSON.stringify(DuePaymentData));
            //    CreateASoldProducDataHelper.ClearFormSpecificData();
            //}
            //else if (($("#hdnOutletInvoiceMasterId").val() > 0) && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductName_Esd").val() !== '') && ($("#txtProductQuantity_Esd").val() > 0)) {
            //    debugger;
            //    var productQuantity = $('#txtProductQuantity_Esd').val();
            //    var priceAmount = $('#txtPrice_Ep').val();
            //    var aProductDetails = CreateASoldProducDataHelper.GetOutletInvoiceDataForUpdate();
                
            //    for (var i = DuePaymentData.length - 1; i >= 0; i--) {
            //        if (DuePaymentData[i].ProductId == aProductDetails.ProductId) {

            //            productQuantity = parseInt(productQuantity);
            //            priceAmount = parseInt(priceAmount);
            //            DuePaymentData.splice(i, 1);
            //        }
            //    }
            //    var totalPrice = aProductDetails.RetailPrice * productQuantity;
            //    aProductDetails.ProductQuantity = productQuantity;
            //    aProductDetails.PriceAmount = priceAmount;
            //    aProductDetails.TotalPrice = totalPrice;
            //    var vat = ((totalPrice) * .15);
            //    aProductDetails.VAT = vat;

            //    DuePaymentData.push(aProductDetails);
            //    CreateDuePaymentHelper.PopulateGrandTotalPriceQuentity();
            //    CreateDuePaymentHelper.GetDuePaymentDataTable();

            //    //$("#txtProductQuantity_Esd").val('');
            //    //$("#txtPriceAmount").val('');
            //    //$("#txtVATForInvididualProduct").val('');
            //    //alert(JSON.stringify(DuePaymentData));
            //    CreateASoldProducDataHelper.ClearFormSpecificData();
            //}
            //else {
            //    $("#myModal #modal-body #rif").html("Error product can not be add.");
            //    $('#myModal').appendTo("body").modal('show');
            //}
            //$("#txtSubTotal").val(parseFloat($("#txtTotalPrice").val()));
            //$("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()));
            //CreateDuePaymentHelper.GenerateBillForSaleUI();
            //CreateASoldProducDataHelper.ClearFormSpecificData();
            
        });
        $("#btnClearFormAllData").click(function () {
            CreateASoldProducDataHelper.ClearFormAllData();
        });
    },

    POViewpupInit: function () {
        debugger;
    },


    //GenerateBillForSaleUI: function () {
    //    debugger;
    //    var subTotal = parseFloat($("#txtSubTotal").val());
    //    var totalPrice = parseFloat($("#txtTotalPrice").val());
    //    var vat = parseFloat($("#txtVat").val());
    //    var discount = parseFloat($("#txtDiscount").val());
    //    var rounding = parseFloat($("#txtRounding").val());
    //    var payableAmount = parseFloat($("#txtAmountPayable").val());
    //    var cashAmount = parseFloat($("#txtCashAmount").val());
    //    var creditAmount = parseFloat($("#txtCreditAmount").val());
    //    var paidAmount = parseFloat($("#txtPaidAmount").val());
    //    var refund = parseFloat($("#txtDueOrRefund").val());

    //    if (isNaN(subTotal)) { subTotal = 0; }
    //    if (isNaN(totalPrice)) { totalPrice = 0; }
    //    if (isNaN(vat)) { vat = 0; }
    //    if (isNaN(discount)) { discount = 0; }
    //    if ((subTotal) === 0) { discount = 0; }
    //    if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
    //    if (isNaN(rounding)) { rounding = 0; }
    //    if (isNaN(payableAmount)) { payableAmount = 0; }
    //    if (isNaN(cashAmount)) { cashAmount = 0; }
    //    if (isNaN(creditAmount)) { creditAmount = 0; }
    //    if (isNaN(paidAmount)) { paidAmount = 0; }
    //    if (isNaN(refund)) { refund = 0; }

    //    parseFloat($("#txtSubTotal").val(subTotal));
    //    parseFloat($("#txtTotalPrice").val(totalPrice));
        
    //    vat = (subTotal * (.15));
    //    payableAmount = ((subTotal + vat) - discount);
    //    paidAmount = cashAmount + creditAmount;
    //    refund = ((payableAmount - paidAmount));

    //    parseFloat($("#txtSubTotal").val(subTotal));
    //    parseFloat($("#txtTotalPrice").val(totalPrice));
    //    parseFloat($("#txtVat").val(vat));
    //    parseFloat($("#txtDiscount").val(discount));
    //    parseFloat($("#txtRounding").val(rounding));
    //    parseFloat($("#txtAmountPayable").val(payableAmount));
    //    parseFloat($("#txtCashAmount").val(cashAmount));
    //    parseFloat($("#txtCreditAmount").val(creditAmount));
    //    parseFloat($("#txtPaidAmount").val(paidAmount));
    //    parseFloat($("#txtDueOrRefund").val(refund));

    //},
    GetOutletInvoiceDataForUpdate: function () {
        debugger;
        var aObj = new Object();

        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#txtOutletSaleInvoiceNo").val();
        aObj.ProductId = $('#hdnProductId_Esd').val();
        aObj.ProductName = $('#txtProductName_Esd').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.OutletId = $("#cmbOutletId").val();
        aObj.ProductQuantity = $("#txtProductQuantity_Esd").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.Size = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.VAT = $("#txtVATForInvididualProduct").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.Status = "Edited";
        return aObj;

    },
    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalOutletSaleUIPrice = 0;
        for (var i = 0; i < DuePaymentData.length; i++) {

            totalProduct += parseFloat(DuePaymentData[i].ProductQuantity);
            totalOutletSaleUIPrice += parseFloat(DuePaymentData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletSaleUIPrice);
    },


    ClearFormSpecificData: function () {
        debugger;
        $("#txtProductName").val('');
        $("#txtProductName_Esd").val('');
        $("#txtRetailPrice").val('');
        $("#txtProductQuantity_Esd").val('');
        $("#txtPriceAmount").val('');
        $("#txtPrice_Ep").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
        $("#txtNewQuantity").val('');
        $("#txtPrice_Esd").val('');

    },

    ClearFormAllData: function () {
        debugger;
        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $('#hdnProductId_Esd').val(0);
        $("#hdnProductId_Esd").val('');
        $("#hdnOutletInvoiceMasterId").val('');
        $("#hdnOutletInvoiceDetailsId").val('');
        $("#txtProductName").val('');
        $("#txtRetailPrice").val('');
        $("#txtProductQuantity").val('');
        $("#txtPriceAmount").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
        $("#txtNewQuantity").val('');
        $("#txtPrice").val('');

    },
}
