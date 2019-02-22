var a = 0;
var SaleReturnData = [];


var CreateSaleReturnManager = {
    SaveRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(SaleReturnData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/SaleReturn/CreateSaleReturnDetails",
            data: JSON.stringify({ SaleReturnData: CreateSaleReturnHelper.GetSaleReturnData(), productList: SaleReturnData }),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    //ViewSaleReturnManager.GetSaleReturnDataTable();
                    CreateSaleReturnHelper.ClearSaleReturnFormNormal();
                    SaleReturnData = [];
                    CreateSaleReturnHelper.GetSaleReturnDataTable();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify(CreateSaleReturnHelper.GetSaleReturnData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateSaleReturnManager.GetSaleReturnDataTable();
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

    loadASingleProductDetails: function (productId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Product/LoadASingleProductDetails',
            data: { productId: productId },
            success: function (response, textStatus) {
                debugger;
                if (response.result[0] != null) {
                    $("#hdnProductId").val(response.result[0].ProductId);
                    $("#hdnProductName").val(response.result[0].ProductName);
                    $("#txtSRRetailPrice").val(response.result[0].RetailPrice);
                    $("#txtSRItemName").val(response.result[0].ItemName);
                    $("#txtSRSize").val(response.result[0].SizeName);
                    $("#txtSRUoM").val(response.result[0].UoMShortName);
                    $("#txtSRBarcode").val(response.result[0].ProductMainBarcode);
                    $("#txtSRPriceAmount").val($("#txtSRRetailPrice").val() * $("#txtSRProductQuantity").val());
                   // $("#txtSRVatForInvididualProduct").val($("#txtSRTotalPrice").val() * (.15));
                    //var dt = new Date();
                    //var invoiceId = dt.getFullYear().toString().substr(2) + "" + (dt.getMonth() + 1) + "" + (dt.getDate() + "" + 1);
                    // $("#txtSROutletSaleInvoiceNo").val(invoiceId);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
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
                    $("#txtSRCurrentStock").val(response.result[0].OutletStockQuantity);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },




    GetDetailsbyOutletInvoiceMasterId: function (outletInvoiceMasterId) {  //////////////When two objects are sent/pass from here through "CreateDuePaymentManager.LoadViewData(response);". 
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletInvoice/GetDetailsByOutletInvoiceMasterId',
            data: { OutletInvoiceMasterId: outletInvoiceMasterId },
            success: function (response, textStatus) {
                debugger;
                CreateSaleReturnManager.LoadViewData(response);
                if (response.result[0] != null) {
                    
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


     LoadViewData: function (aData) { 
     debugger;
        SaleReturnData = [];
        SaleReturnData = aData.Data2;
        CreateSaleReturnHelper.GetSaleReturnDataTable();

        var data = aData.Data;
        //alert(JSON.stringify(data));
        $("#hdnProductId").val(data[0].ProductId);
        $("#txtSRSubTotal").val(data[0].TotalGrandPrice);
        $("#txtSRTotalPrice").val(data[0].TotalPrice);
        $("#txtSRVat").val(data[0].VAT);
        $("#txtSRDiscount").val(data[0].Discount);
        $("#txtSRRounding").val(data[0].Rounding);
        $("#txtSRAmountPayable").val(data[0].PayableAmount);
        $("#txtSRCashAmount").val(data[0].Cash);
        $("#txtSRCreditAmount").val(data[0].Credit);
        $("#txtSRPaidAmount").val(data[0].PaidAmount);
        $("#txtSRDueOrRefund").val(data[0].DueOrRefund);
    },

};


var CreateSaleReturnHelper = {
    CreateSaleReturnInit: function () {
        //var dt = new Date();
        //var invoiceId = dt.getFullYear().toString().substr(2) + "" + (dt.getMonth() + 1) + "" + (dt.getDate() + "" + 1);
        //$("#txtSROutletSaleInvoiceNo").val(invoiceId);
        debugger;
        CreateSaleReturnHelper.GetSaleReturnDataTable();
        $("#btnSRSaveRequest").click(function () {
            debugger;
            CreateSaleReturnManager.SaveRequest();
        });

        $("#btnClearSaleReturnForm").click(function () {
            CreateSaleReturnHelper.ClearSaleReturnForm();
        });

        $('#myTableSaleReturn tbody').on('click', '#btnEditSaleReturn', function (e) {
            debugger;
            var table = $('#myTableSaleReturn').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateSaleReturnHelper.populateDataForEditButton(data);
        });

        $('#myTableSaleReturn tbody').on('click', '#btnRemoveSaleReturn', function () {
            debugger;
            var table = $('#myTableSaleReturn').DataTable();
            var data = table.row($(this).parents('tr')).data();
            var oldTotalQuantity = parseFloat($("#txtSRTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtSRTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldsSubTotal = parseFloat($("#txtSRSubTotal").val());
            var removedTotalPrice = parseFloat(data.TotalPrice);
            $("#txtSRSubTotal").val(parseFloat(oldsSubTotal) - parseFloat(removedTotalPrice));

            for (var i = SaleReturnData.length - 1; i >= 0; i--) {
                if (SaleReturnData[i].ProductId == data.ProductId) {
                    SaleReturnData.splice(i, 1);
                }
            }
            
            CreateSaleReturnHelper.GetSaleReturnDataTable();
            CreateSaleReturnHelper.GenerateBillForSaleUI();
        });
        CreateSaleReturnHelper.loadProductsDropDown();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            $("#txtSRProductQuantity").val(1);
            CreateSaleReturnManager.loadASingleProductDetails(productId);
            CreateSaleReturnManager.getStockQuantityOfAProduct(productId);
        });

        $("#txtSRProductQuantity").click(function () {
            debugger;
            $("#txtSRProductQuantity").on("input", function () {
                $("#txtSRPriceAmount").val($("#txtSRRetailPrice").val() * $("#txtSRProductQuantity").val());
            });
        });

        $('#btnSRAddProduct').on('click', function () {
            debugger;
            var porductQuantity = parseFloat($("#txtSRProductQuantity").val());
            var currentStock = parseFloat($("#txtSRCurrentStock").val());
            if (($("#cmbProductId").val() === '') && ($("#txtSRProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Product and product quantiy fields are required.");
                $('#myModal').appendTo("body").modal('show');
                $('#myModal').hide(1000);
            }
            else if (($("#cmbProductId").val() === '')) {
                $("#myModal #modal-body #rif").html("Please select a product.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtSRProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Please provide product quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtSRProductQuantity").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Please provide a Valid quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtSRCurrentStock").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Product is out of stock.");
                $('#myModal').appendTo("body").modal('show');
            }

            else if (porductQuantity > currentStock) {
                $("#myModal #modal-body #rif").html("Quantity must be less than or equal  to currrent stock.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbProductId").val() !== '') && ($("#txtSRProductQuantity").val() > 0)) {

                var productQuantity = $('#txtSRProductQuantity').val();
                var aProductDetails = CreateSaleReturnHelper.GetProductObj();
                debugger;
                for (var i = SaleReturnData.length - 1; i >= 0; i--) {
                    if (SaleReturnData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = SaleReturnData[i].ProductQuantity;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        SaleReturnData.splice(i, 1);
                    }
                }
                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.TotalPrice = totalPrice;
                var vat = ((totalPrice) * .15);
                aProductDetails.VAT = vat;

                SaleReturnData.push(aProductDetails);
                CreateSaleReturnHelper.PopulateGrandTotalPriceQuentity();
                CreateSaleReturnHelper.GetSaleReturnDataTable();
                $("#txtSRProductQuantity").val('');
                $("#txtSRPriceAmount").val('');
                $("#txtSRVATForInvididualProduct").val('');
            }
            else {
                $("#myModal #modal-body #rif").html("Error product can not be add.");
                $('#myModal').appendTo("body").modal('show');
            }
            $("#txtSRSubTotal").val(parseFloat($("#txtSRTotalPrice").val()));
            $("#txtSRAmountPayable").val(parseFloat($("#txtSRTotalPrice").val()));
            CreateSaleReturnHelper.GenerateBillForSaleUI();
        });

        $("#txtSRDiscount").click(function () {
            CreateSaleReturnHelper.GenerateBillForSaleUI();
            $("#txtSRDiscount").on("input", function () {
                debugger;
                CreateSaleReturnHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtSRCashAmount").click(function () {
            debugger;
            CreateSaleReturnHelper.GenerateBillForSaleUI();
            $("#txtSRCashAmount").on("input", function () {
            CreateSaleReturnHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtSRCreditAmount").click(function () {
            debugger;
            CreateSaleReturnHelper.GenerateBillForSaleUI();
            $("#txtSRCreditAmount").on("input", function () {
              CreateSaleReturnHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtSRSubTotal").change(function () {
            debugger;
            CreateSaleReturnHelper.GenerateBillForSaleUI();
            $("#txtSRSubTotal").on("input", function () {
                CreateSaleReturnHelper.GenerateBillForSaleUI();
            });
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateSaleReturnManager.loadProductsForDropDown();
        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },

    ClearSaleReturnFormNormal: function () {
        $("#txtSRProductName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#txtSRProductQuantity").val('');
        $("#txtSRWholeSalePrice").val('');
        $("#txtSRRetailPrice").val('');
        $("#txtSRPriceAmount").val('');
        $("#txtSRVATForInvididualProduct").val('');
        $("#txtSRSize").val('');
        $("#txtSRBarcode").val('');
        $("#txtSRItemName").val('');
        $("#txtSRUoM").val('');
    },

    ClearSaleReturnForm: function () {

        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $("#txtSRProductName").val('');
        $("#cmbWarehouseId").val('').trigger("change");
        $("#cmbProductId").val('').trigger("change");
        $("#txtSRProductQuantity").val('');
        $("#txtSRTotalProduct").val('');
        $("#txtSRTotalPrice").val('');
        $("#txtTotalWarehousePOPrice").val('');
        $("#txtSRAmountPayable").val('');
        $("#txtSRBranchName").val('');
        $("#txtSRSalePerson").val('');
        $("#txtSROutletSaleInvoiceNo").val('');
        $("#txtSRCustomerName").val('');
        $("#txtSRCurrentStock").val('');
        $("#txtSRSubTotal").val('');
        $("#txtSRVat").val('');
        $("#txtSRRounding").val('');
        $("#txtSRDiscount").val('');
        $("#txtSRAmountPayable").val('');
        $("#txtSRCashAmount").val('');
        $("#txtSRCreditAmount").val('');
        $("#txtSRPaidAmount").val('');
        $("#txtSRDueOrRefund").val('');
        SaleReturnData = [];
    },


    GenerateBillForSaleUI: function () {
        debugger;
        var subTotal = parseFloat($("#txtSRSubTotal").val());
        var totalPrice = parseFloat($("#txtSRTotalPrice").val());

        var vat = parseFloat($("#txtSRVat").val());
        var discount = parseFloat($("#txtSRDiscount").val());
        var rounding = parseFloat($("#txtSRRounding").val());
        var payableAmount = parseFloat($("#txtSRAmountPayable").val());
        var cashAmount = parseFloat($("#txtSRCashAmount").val());
        var creditAmount = parseFloat($("#txtSRCreditAmount").val());
        var paidAmount = parseFloat($("#txtSRPaidAmount").val());
        var refund = parseFloat($("#txtSRDueOrRefund").val());

        if (isNaN(subTotal)) { subTotal = 0; }
        if (isNaN(totalPrice)) { totalPrice = 0; }
        if (isNaN(vat)) { vat = 0; }
        if (isNaN(discount)) { discount = 0; }
        if ((subTotal)===0) { discount = 0; }
        if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
        if (isNaN(rounding)) { rounding = 0; }
        if (isNaN(payableAmount)) { payableAmount = 0; }
        if (isNaN(cashAmount)) { cashAmount = 0; }
        if (isNaN(creditAmount)) { creditAmount = 0; }
        if (isNaN(paidAmount)) { paidAmount = 0; }
        if (isNaN(refund)) { refund = 0; }

        parseFloat($("#txtSRSubTotal").val(subTotal));
        parseFloat($("#txtSRTotalPrice").val(totalPrice));


        vat = (subTotal* (.15) );
        payableAmount = ((subTotal + vat) - discount);
        paidAmount = cashAmount + creditAmount;
        refund = ((payableAmount - paidAmount));


        parseFloat($("#txtSRSubTotal").val(subTotal));
        parseFloat($("#txtSRTotalPrice").val(totalPrice));

        parseFloat($("#txtSRVat").val(vat));
        parseFloat($("#txtSRDiscount").val(discount));
        parseFloat($("#txtSRRounding").val(rounding));
        parseFloat($("#txtSRAmountPayable").val(payableAmount));
        parseFloat($("#txtSRCashAmount").val(cashAmount));
        parseFloat($("#txtSRCreditAmount").val(creditAmount));
        parseFloat($("#txtSRPaidAmount").val(paidAmount));
        parseFloat($("#txtSRDueOrRefund").val(refund));
    },


    GetSaleReturnData: function () {
    debugger;
        var aObj = new Object();
        
        aObj.OutletInvoiceDetailsId = $('#hdnOutletInvoiceDetailsId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#txtSROutletSaleInvoiceNo").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ProductPriceId = $("#hdnProductPriceId").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.UoMId = $("#cmbUoMId").val();

        aObj.ProductName = $("#txtSRProductName").val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductMainBarcode = $("#txtSRProductMainBarcode").val();
        aObj.ProductQuantity = $("#txtSRProductQuantity").val();
        aObj.WholeSalePrice = $("#txtSRWholeSalePrice").val();
        aObj.RetailPrice = $("#txtSRRetailPrice").val();
        aObj.Discount = $("#txtSRDiscount").val();
        aObj.VAT = $("#txtSRVat").val();
        aObj.SubTotal = $("#txtSRSubTotal").val();

        return aObj;
    },

    LoadAProductDetailsData: function (aObj) {
        debugger;
        $("#txtProductId").val(aObj.result[0].ProductId);
        $("#txtProductCode").val(aObj.result[0].ProductCode);
        $("#txtSRProductName").val(aObj.result[0].ProductName);
        $("#txtSRProductMainBarcode").val(aObj.result[0].ProductMainBarcode);
        $("#cmbSizeId").val(aObj.result[0].SizeId).trigger("change");
        $("#cmbUoMId").val(aObj.result[0].UoMId).trigger("change");
        $("#txtCostPrice").val(aObj.result[0].CostPrice);
        $("#txtSRRetailPrice").val(aObj.result[0].RetailPrice);
        $("#txtSRWholeSalePrice").val(aObj.result[0].WholeSalePrice);
    },

    GetSaleReturnDataTable: function () {
        debugger;
        $('#myTableSaleReturn').dataTable().fnDestroy();
        $('#myTableSaleReturn').DataTable({
            data: SaleReturnData,
            "columns": [
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "1%"
                },
                { "data": "ProductName", "width": "10%" },
                { "data": "ProductMainBarcode", "width": "10%" },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "RetailPrice", "width": "10%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemoveSaleReturn" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },
            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletSaleInvoiceNo = $("#txtSROutletSaleInvoiceNo").val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductQuantity = $("#txtSRProductQuantity").val();
        aObj.RetailPrice = $('#txtSRRetailPrice').val();
        aObj.ItemName = $("#txtSRItemName").val();
        aObj.Size = $("#txtSRSize").val();
        aObj.UoMShortName = $("#txtSRUoM").val();
        aObj.ProductMainBarcode = $("#txtSRBarcode").val();
        aObj.VAT = $("#txtSRVatForInvididualProduct").val();
        aObj.Discount = $("#txtSRDiscount").val();
        aObj.Status = "Not Sent";
        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalSaleReturnPrice = 0;
        for (var i = 0; i < SaleReturnData.length; i++) {
            totalProduct += parseFloat(SaleReturnData[i].ProductQuantity);
            totalSaleReturnPrice += parseFloat(SaleReturnData[i].TotalPrice);
        }
        $("#txtSRTotalProduct").val(totalProduct);
        $("#txtSRTotalPrice").val(totalSaleReturnPrice);
    },

    populateDataForEditButton: function (aObj) {

        CreateSaleReturnHelper.ClearSaleReturnFormNomal();
        $('#hdnOutletSaleInvoiceNo').val(aObj.OutletSaleInvoiceNo);
       $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtSRProductQuantity").val(aObj.ProductQuantity);
        $("#txtSRRetailPrice").val(aObj.RetailPrice);
        $("#txtSRPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtSRBarcode").val(aObj.Barcode);
        $("#txtSRItemName").val(aObj.ItemName);
        $("#txtSRSize").val(aObj.Size);
        $("#txtSRUoM").val(aObj.UoMShortName);
        $("#txtSRAmountPayable").val((aObj.RetailPrice) * (aObj.ProductQuantity));
    },
}



