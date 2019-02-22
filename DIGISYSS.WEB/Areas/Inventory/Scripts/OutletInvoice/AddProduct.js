var a = 0;
var DuePaymentData = [];


var CreateAddProductManager = {
    SaveRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(DuePaymentData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/AddProduct/CreateAddProductDetails",
            data: JSON.stringify({ DuePaymentData: CreateAddProductHelper.GetDuePaymentData(), productList: DuePaymentData }),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    //ViewAddProductManager.GetDuePaymentDataTable();
                    CreateAddProductHelper.ClearAddProductFormNormal();
                    DuePaymentData = [];
                    CreateAddProductHelper.GetDuePaymentDataTable();
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
            data: JSON.stringify(CreateAddProductHelper.GetDuePaymentData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateAddProductManager.GetDuePaymentDataTable();
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
                    $("#txtRetailPrice").val(response.result[0].RetailPrice);
                    $("#txtItemName").val(response.result[0].ItemName);
                    $("#txtSize").val(response.result[0].SizeName);
                    $("#txtUoM").val(response.result[0].UoMShortName);
                    $("#txtBarcode").val(response.result[0].Barcode);
                    $("#txtPrice").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
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
                    $("#txtCurrentStock").val(response.result[0].OutletStockQuantity);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },

    GetDetailsbyOutletInvoiceMasterId: function (outletInvoiceMasterId) {
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
                CreateAddProductManager.LoadViewData(response);
                if (response.result[0] != null) {

                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


    LoadViewData: function (aData) {
        debugger;
        DuePaymentData = [];
        DuePaymentData = aData.Data2;
        CreateAddProductHelper.GetDuePaymentDataTable();

        var data = aData.Data;
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
        $("#txtDueOrRefund").val(data[0].DueOrRefund);
    },

};


var CreateAddProductHelper = {
    CreateAddProductInit: function () {
        debugger;
        CreateAddProductHelper.GetDuePaymentDataTable();
        $("#btnSaveRequest").click(function () {
            debugger;
            CreateAddProductManager.SaveRequest();
        });

        $("#btnClearAddProductForm").click(function () {
            CreateAddProductHelper.ClearAddProductForm();
        });

        $('#myTableAddProduct tbody').on('click', '#btnEditAddProduct', function (e) {
            debugger;
            var table = $('#myTableAddProduct').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateAddProductHelper.populateDataForEditButton(data);
        });

        $('#myTableAddProduct tbody').on('click', '#btnRemoveAddProduct', function () {
            debugger;
            var table = $('#myTableAddProduct').DataTable();
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

            CreateAddProductHelper.GetDuePaymentDataTable();
            CreateAddProductHelper.GenerateBillForSaleUI();
        });
        CreateAddProductHelper.loadProductsDropDown();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            $("#txtProductQuantity").val(1);
            CreateAddProductManager.loadASingleProductDetails(productId);
            CreateAddProductManager.getStockQuantityOfAProduct(productId);
        });

        $("#txtProductQuantity").on("input", function () {
            debugger;
            $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
        });

        $('#btnAddProduct').on('click', function () {
            debugger;
            var porductQuantity = parseFloat($("#txtProductQuantity").val());
            var currentStock = parseFloat($("#txtCurrentStock").val());
            if (($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Product and product quantiy fields are required.");
                $('#myModal').appendTo("body").modal('show');

            }
            else if (($("#cmbProductId").val() === '')) {
                $("#myModal #modal-body #rif").html("Please select a product.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Please provide product quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtProductQuantity").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Please provide a Valid quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtCurrentStock").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Product is out of stock.");
                $('#myModal').appendTo("body").modal('show');
            }

            else if (porductQuantity > currentStock) {
                $("#myModal #modal-body #rif").html("Quantity must be less than or equal  to currrent stock.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {

                var productQuantity = $('#txtProductQuantity').val();
                var aProductDetails = CreateAddProductHelper.GetProductObj();
                debugger;
                for (var i = DuePaymentData.length - 1; i >= 0; i--) {
                    if (DuePaymentData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = DuePaymentData[i].ProductQuantity;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        DuePaymentData.splice(i, 1);
                    }
                }
                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.TotalPrice = totalPrice;
                var vat = ((totalPrice) * .15);
                aProductDetails.VAT = vat;

                DuePaymentData.push(aProductDetails);
                CreateAddProductHelper.PopulateGrandTotalPriceQuentity();
                CreateAddProductHelper.GetDuePaymentDataTable();
                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
                $("#txtVATForInvididualProduct").val('');
            }
            else {
                $("#myModal #modal-body #rif").html("Error product can not be add.");
                $('#myModal').appendTo("body").modal('show');
            }
            $("#txtSubTotal").val(parseFloat($("#txtTotalPrice").val()));
            $("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()));
           // CreateAddProductHelper.GenerateBillForSaleUI();
        });

        $("#txtDiscount").click(function () {
            CreateAddProductHelper.GenerateBillForSaleUI();
            $("#txtDiscount").on("input", function () {
                debugger;
                CreateAddProductHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtCashAmount").click(function () {
            debugger;
            CreateAddProductHelper.GenerateBillForSaleUI();
            $("#txtCashAmount").on("input", function () {
                CreateAddProductHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtCreditAmount").click(function () {
            debugger;
            CreateAddProductHelper.GenerateBillForSaleUI();
            $("#txtCreditAmount").on("input", function () {
                CreateAddProductHelper.GenerateBillForSaleUI();
            });
        });

        $("#txtSubTotal").change(function () {
            debugger;
            CreateAddProductHelper.GenerateBillForSaleUI();
            $("#txtSubTotal").on("input", function () {
                CreateAddProductHelper.GenerateBillForSaleUI();
            });
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateAddProductManager.loadProductsForDropDown();
        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },

    ClearAddProductFormNormal: function () {
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
    },

    ClearAddProductForm: function () {

        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $("#txtProductName").val('');
        $("#cmbWarehouseId").val('').trigger("change");
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
        $("#txtTotalWarehousePOPrice").val('');
        $("#txtAmountPayable").val('');
        $("#txtBranchName").val('');
        $("#txtSalePerson").val('');
        $("#txtOutletSaleInvoiceNo").val('');
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
        $("#txtDueOrRefund").val('');
        DuePaymentData = [];
    },

    GetDuePaymentData: function () {
        debugger;
        var aObj = new Object();

        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#txtOutletSaleInvoiceNo").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ProductPriceId = $("#hdnProductPriceId").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.UoMId = $("#cmbUoMId").val();

        aObj.ProductName = $("#txtProductName").val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.VAT = $("#txtVat").val();
        aObj.SubTotal = $("#txtSubTotal").val();

        return aObj;
    },

    LoadAProductDetailsData: function (aObj) {
        debugger;
        $("#txtProductId").val(aObj.result[0].ProductId);
        $("#txtProductCode").val(aObj.result[0].ProductCode);
        $("#txtProductName").val(aObj.result[0].ProductName);
        $("#txtBarcode").val(aObj.result[0].ProductMainBarcode);
        $("#cmbSizeId").val(aObj.result[0].SizeId).trigger("change");
        $("#cmbUoMId").val(aObj.result[0].UoMId).trigger("change");
        $("#txtCostPrice").val(aObj.result[0].CostPrice);
        $("#txtRetailPrice").val(aObj.result[0].RetailPrice);
        $("#txtWholeSalePrice").val(aObj.result[0].WholeSalePrice);
    },

    GetDuePaymentDataTable: function () {
        debugger;
        $('#myTableDuePay').dataTable().fnDestroy();
        $('#myTableDuePay').DataTable({
            data: DuePaymentData,
          "columns": [
              { "data": "ProductId", "autoWidth": false, "visible": false },
              { "data": "OutletInvoiceMasterId", "autoWidth": false, "visible": false },
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
              { "defaultContent": '<button class="btn btn-primary" id="btnAddProduct" type="button">Return</button>', "width": "5%" },
          ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletInvoiceMasterId = $("#hdnOutletInvoiceMasterId").val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.Size = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.VAT = $("#txtVatForInvididualProduct").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.Status = "Not Sent";
        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalAddProductPrice = 0;
        for (var i = 0; i < DuePaymentData.length; i++) {
            totalProduct += parseFloat(DuePaymentData[i].ProductQuantity);
            totalAddProductPrice += parseFloat(DuePaymentData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalAddProductPrice);
    },

    populateDataForEditButton: function (aObj) {
        CreateAddProductHelper.ClearAddProductFormNomal();
        $('#hdnOutletInvoiceMasterId').val(aObj.OutletInvoiceMasterId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbOutletId").val(aObj.OutletId).trigger("change");
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        $("#txtPrice").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtBarcode").val(aObj.ProductMainBarcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.Size);
        $("#txtUoM").val(aObj.UoMShortName);
        $("#txtAmountPayable").val((aObj.RetailPrice) * (aObj.ProductQuantity));
    },
}



