var a = 0;
var OutletSaleUIData = [];

var CreateOutletSaleUIManager = {
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
            url: "/Inventory/OutletSaleUI/CreateOutletSaleUIDetails",
            data: JSON.stringify({ OutletSaleUIData: CreateOutletSaleUIHelper.GetOutletSaleUIData(), productList: OutletSaleUIData }),
            //data: JSON.stringify(OutletSaleUIData),
            success: function (response) {
                debugger;
                if ((response != null)) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    //ViewOutletSaleUIManager.GetOutletSaleUIDataTable();
                    if (response.Data) {
                        CreateOutletSaleUIHelper.ClearOutletSaleUIForm();
                    }
                    OutletSaleUIData = [];
                    CreateOutletSaleUIHelper.GetOutletSaleUIDataTable();
                    //var OutletSaleInvoiceNo = parseInt(1704260001);
                   
                    window.open("../OutletSaleUI/SaleInvoiceReport");
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

   
    loadOutletSaleInvoiceNo: function () {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletSaleUI/GetOutletSaleInvoiceNo',
            data: 'json',
            success: function (response, textStatus) {
                debugger;
                if (response.result[0] != null) {

                    $("#txtOutletSaleInvoiceNo").val(response.result[0].OutletSaleInvoiceNo);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


    //////Load List of All products  Saved in database from Controller to Drop Down " /Inventory/Product/GetAllProductsForDd ".
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


    //////Loads data for a single porduct form this controller location when ProductId is changed(Select a Product Drop Down) "'/Inventory/Product/LoadASingleProductDetails".
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
                    $("#txtBarcode").val(response.result[0].ProductMainBarcode);
                    $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                    $("#txtVATForInvididualProduct").val($("#txtTotalPrice").val() * (.15));
                    var dt = new Date();
                   // console.log(new Date().getFullYear().toString().substr(-2));
                    var invoiceId = dt.getFullYear().toString().substr(2) + "" + (dt.getMonth() + 1) + "" + (dt.getDate() + "" + 1);
                    //var test = invoiceId.toString().substr(0,6);
                    $("#txtOutletSaleInvoiceNo").val(invoiceId);
                    
                    //$("#txtAmountPayable").val(CreateOutletSaleUIHelper.PopulateGrandTotalPriceQuentity); ///////// If on then payAmount box get empty when select a porduct.
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

};







var CreateOutletSaleUIHelper = {
    CreateOutletSaleUIInit: function () {
        var dt = new Date();
        // console.log(new Date().getFullYear().toString().substr(-2));
        var invoiceId = dt.getFullYear().toString().substr(2) + "" + (dt.getMonth() + 1) + "" + (dt.getDate() + "" + 1);
        //var test = invoiceId.toString().substr(0,6);
        $("#txtOutletSaleInvoiceNo").val(invoiceId);
        debugger;
        CreateOutletSaleUIHelper.GetOutletSaleUIDataTable();
        $("#btnSaveRequest").click(function () {
            debugger;

           // alert(OutletSaleUIData.valueOf());
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }

            if (($("#txtOutletSaleInvoiceNo").val() === '')) {
                $("#myModal #modal-body #rif").html("Invoice No field is required.If this field is empty please reload the page.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if ((OutletSaleUIData.length === 0) ||($("#txtSubTotal").val() <= 0) || (($("#txtAmountPayable").val() <= 0))) {
                $("#myModal #modal-body #rif").html("Please add product in table.");
                $('#myModal').appendTo("body").modal('show');
            }
           
           

            //else if (($("#txtProductQuantity").val() === '')) {
            //    $("#myModal #modal-body #rif").html("Please provide product quantiy.");
            //    $('#myModal').appendTo("body").modal('show');
            //}
           
            else if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0) && (OutletSaleUIData.length !== 0) && ($("#txtSubTotal").val() !== null) && ($("#txtAmountPayable").val() !== '')) {
                debugger;
                CreateOutletSaleUIManager.SaveRequest();
            }
            else {
                $("#myModal #modal-body #rif").html("Please reload the page again and provide all required data.");
                $('#myModal').appendTo("body").modal('show');
            }
            
            //CreateOutletSaleUIManager.SaveRequest();
        });

        $("#btnClearOutletSaleUIForm").click(function () {
            debugger;
            CreateOutletSaleUIHelper.ClearOutletSaleUIForm();
        });

        $('#myTable tbody').on('click', '#btnEditOutletSaleUI', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateOutletSaleUIHelper.populateDataForEditButton(data);
        });

        $('#myTable tbody').on('click', '#btnRemoveOutletSaleUI', function () {
            debugger;
            //CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();

            var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldsSubTotal = parseFloat($("#txtSubTotal").val());
            var removedTotalPrice = parseFloat(data.TotalPrice);
            $("#txtSubTotal").val(parseFloat(oldsSubTotal) - parseFloat(removedTotalPrice));
            


            for (var i = OutletSaleUIData.length - 1; i >= 0; i--) {
                if (OutletSaleUIData[i].ProductId == data.ProductId) {
                    OutletSaleUIData.splice(i, 1);
                }
            }
            
            CreateOutletSaleUIHelper.GetOutletSaleUIDataTable();
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            
        });
        CreateOutletSaleUIHelper.loadProductsDropDown();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            $("#txtProductQuantity").val(1);
            CreateOutletSaleUIManager.loadASingleProductDetails(productId);
            CreateOutletSaleUIManager.getStockQuantityOfAProduct(productId);
        });

        $("#txtProductQuantity").click(function () {
            debugger;
            $("#txtProductQuantity").on("input", function () {
                $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
            });
        });



        ////////Automatically add a first row of data
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



            //else if (parseFloat($("#txtProductQuantity").val() <= parseFloat($("#txtCurrentStock").val()))) {
            else if (porductQuantity > currentStock) {
                $("#myModal #modal-body #rif").html("Quantity must be less than or equal  to currrent stock.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {

                var productQuantity = $('#txtProductQuantity').val();
                var aProductDetails = CreateOutletSaleUIHelper.GetProductObj();

                debugger;

                for (var i = OutletSaleUIData.length - 1; i >= 0; i--) {
                    if (OutletSaleUIData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = OutletSaleUIData[i].ProductQuantity;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        OutletSaleUIData.splice(i, 1);
                    }
                }
                var totalPrice = aProductDetails.UnitPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.TotalPrice = totalPrice;

                var vat = ((totalPrice) * .15);
                aProductDetails.VAT = vat;

                OutletSaleUIData.push(aProductDetails);
                CreateOutletSaleUIHelper.PopulateGrandTotalPriceQuentity();
                CreateOutletSaleUIHelper.GetOutletSaleUIDataTable();
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
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();

        });



        $("#txtDiscount").click(function () {
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            $("#txtDiscount").on("input", function () {
                debugger;
                //if (($("#txtDiscount").val() != null)) {
                //    $("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()) + parseFloat($("#txtVat").val()));
                //    $("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()) - parseFloat($("#txtDiscount").val()));
                //    $("#txtDueOrRefund").val(parseFloat($("#txtPaidAmount").val()) - parseFloat($("#txtAmountPayable").val()));
                //}
                //else {
                //    $("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()));
                //    $("#txtDueOrRefund").val(parseFloat($("#txtPaidAmount").val()) - parseFloat($("#txtAmountPayable").val()));
                //}
                CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            });
           

        });

        $("#txtCashAmount").click(function () {
            debugger;
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            $("#txtCashAmount").on("input", function () {
            //    var cashAmount = parseFloat($("#txtCashAmount").val());
            //    //var creditAmount = parseFloat($("#txtCreditAmount").val());
            //    $("#txtPaidAmount").val(cashAmount);
            //    $("#txtDueOrRefund").val(parseFloat($("#txtPaidAmount").val()) - parseFloat($("#txtAmountPayable").val()));
             CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            });
            
        });

        $("#txtCreditAmount").click(function () {
            debugger;
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            $("#txtCreditAmount").on("input", function () {
                //    var cashAmount = parseFloat($("#txtCashAmount").val());
                //    //var creditAmount = parseFloat($("#txtCreditAmount").val());
                //    $("#txtPaidAmount").val(cashAmount);
                //    $("#txtDueOrRefund").val(parseFloat($("#txtPaidAmount").val()) - parseFloat($("#txtAmountPayable").val()));
                CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            });
        });

        //$("#txtPaidAmount").click(function () {
        //    $("#txtPaidAmount").on("input", function () {
        //        $("#txtAmountPayable").val(parseFloat($("#txtTotalPrice").val()));
        //        var amountPayable=parseFloat($("#txtAmountPayable").val());
        //        var paidAmount=parseFloat($("#txtPaidAmount").val());

        //        $("#txtDueOrRefund").val(amountPayable - paidAmount);
        //    });
        //});



        $("#txtSubTotal").change(function () {
            debugger;
            CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            $("#txtSubTotal").on("input", function () {
                CreateOutletSaleUIHelper.GenerateBillForSaleUI();
            });
        });

    },

   
    loadProductsDropDown: function () {
        var productName = CreateOutletSaleUIManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearOutletSaleUIFormNormal: function () {
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


    ClearOutletSaleUIForm: function () {

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
        OutletSaleUIData = [];
        CreateOutletSaleUIHelper.GetOutletSaleUIDataTable();
    },


    GenerateBillForSaleUI: function () {
        debugger;
        // var aObj = new Object();
        var subTotal = parseFloat($("#txtSubTotal").val());
        var totalPrice = parseFloat($("#txtTotalPrice").val());

        var vat = parseFloat($("#txtVat").val());
        var discount = parseFloat($("#txtDiscount").val());
        var rounding = parseFloat($("#txtRounding").val());
        var payableAmount = parseFloat($("#txtAmountPayable").val());
        var cashAmount = parseFloat($("#txtCashAmount").val());
        var creditAmount = parseFloat($("#txtCreditAmount").val());
        var paidAmount = parseFloat($("#txtPaidAmount").val());
        var refund = parseFloat($("#txtDueOrRefund").val());

        //if (isNaN(subTotal) || (isNull(subTotal)) || (isNegative(subTotal))) { subTotal = 0; }   //////////// Not working for isNull,isNegative.
        //if (isNaN(subTotal) || (isNull(subTotal)===null) || (isNegative(subTotal))<0) { subTotal = 0; }
        if (isNaN(subTotal)) { subTotal = 0; }
        //if ((isNull(subTotal))) { subTotal = 0; }
        //if ( (isNegative(subTotal))) { subTotal = 0; }
        if (isNaN(totalPrice)) { totalPrice = 0; }
        if (isNaN(vat)) { vat = 0; }
        if (isNaN(discount)) { discount = 0; }
        if ((subTotal)===0) { discount = 0; }
        //if ((subTotal) === 0) { discount = 0; payableAmount = 0; cashAmount = 0; creditAmount = 0;  }
        if ((subTotal) === 0) { discount = 0; payableAmount = 0; }
        if (isNaN(rounding)) { rounding = 0; }
        if (isNaN(payableAmount)) { payableAmount = 0; }
        if (isNaN(cashAmount)) { cashAmount = 0; }
        if (isNaN(creditAmount)) { creditAmount = 0; }
        if (isNaN(paidAmount)) { paidAmount = 0; }
        if (isNaN(refund)) { refund = 0; }

        parseFloat($("#txtSubTotal").val(subTotal));
        parseFloat($("#txtTotalPrice").val(totalPrice));


        //////////////// Calcutation Starts ///////////////////////
        vat = (subTotal* (.15) );
        payableAmount = ((subTotal + vat) - discount);
        //rounding = 0;
        paidAmount = cashAmount + creditAmount;
        refund = ((payableAmount - paidAmount));


        parseFloat($("#txtSubTotal").val(subTotal));
        parseFloat($("#txtTotalPrice").val(totalPrice));

        parseFloat($("#txtVat").val(vat));
        parseFloat($("#txtDiscount").val(discount));
        parseFloat($("#txtRounding").val(rounding));
        parseFloat($("#txtAmountPayable").val(payableAmount));
        parseFloat($("#txtCashAmount").val(cashAmount));
        parseFloat($("#txtCreditAmount").val(creditAmount));
        parseFloat($("#txtPaidAmount").val(paidAmount));
        parseFloat($("#txtDueOrRefund").val(refund));

    },


    GetOutletSaleUIData: function () {
    debugger;
        var aObj = new Object();
        
        aObj.OutletInvoiceMasterId = $('#hdnOutletInvoiceMasterId').val();
        aObj.OutletInvoiceDetailsId = $("#hdnOutletInvoiceDetailsId").val();
        aObj.OutletSaleInvoiceNo = $("#txtOutletSaleInvoiceNo").val();
        aObj.ProductId = $("#hdnProductId").val();
        //aObj.ProductPriceId = $("#hdnProductPriceId").val();
        //aObj.SizeId = $("#cmbSizeId").val();
       // aObj.UoMId = $("#cmbUoMId").val();

        aObj.ProductName = $("#txtProductName").val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        //aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        //aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.TotalItem = $("#txtTotalProduct").val();
        //aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        //aObj.UnitPrice = $("#txtRetailPrice").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.Rounding = $("#txtRounding").val();
        aObj.VAT = $("#txtVat").val();
        aObj.PayableAmount = $("#txtAmountPayable").val();
        aObj.TotalGrandPrice = $("#txtSubTotal").val();
        aObj.Cash = $("#txtCashAmount").val();
        aObj.Credit = $("#txtCreditAmount").val();
        aObj.PaidAmount = $("#txtPaidAmount").val();
        aObj.DueOrRefund = $("#txtDueOrRefund").val();
      //  alert(JSON.stringify(aObj));
        return aObj;
        
    },

    LoadAProductDetailsData: function (aObj) {
        debugger;
        $("#txtProductId").val(aObj.result[0].ProductId);
        $("#txtProductCode").val(aObj.result[0].ProductCode);
        $("#txtProductName").val(aObj.result[0].ProductName);
        $("#txtProductMainBarcode").val(aObj.result[0].ProductMainBarcode);
        $("#cmbSizeId").val(aObj.result[0].SizeId).trigger("change");
        $("#cmbUoMId").val(aObj.result[0].UoMId).trigger("change");
        $("#txtCostPrice").val(aObj.result[0].CostPrice);
        $("#txtRetailPrice").val(aObj.result[0].RetailPrice);
        $("#txtWholeSalePrice").val(aObj.result[0].WholeSalePrice);
    },
    
    
    
    

    GetOutletSaleUIDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            data: OutletSaleUIData,
            "columns": [
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },

                //{ "data": "Discount", "autoWidth": false, "visible": false },
                ////{ "data": "Rounding", "autoWidth": false, "visible": false },
                //{ "data": "VAT", "autoWidth": false, "visible": false },
                //{ "data": "PayableAmount", "autoWidth": false, "visible": false },
                //{ "data": "TotalGrandPrice", "autoWidth": false, "visible": false },
                //{ "data": "PaidAmount", "autoWidth": false, "visible": false },
                //{ "data": "DueOrRefund", "autoWidth": false, "visible": false },
               {
                   "data": "SL.", render: function (data, type, row, meta) {
                       return meta.row + meta.settings._iDisplayStart + 1;
                   }, "width": "1%"
               },
                { "data": "ProductName", "width": "10%" },
                { "data": "Barcode", "width": "10%" },
                //{ "data": "ItemName", "autoWidth": true },
                //{ "data": "Size", "autoWidth": true },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "UnitPrice", "width": "10%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
                //{ "data": "Status", "autoWidth": true },
                //{ "defaultContent": '<button class="btn btn-primary" id="btnEditOutletSaleUI" type="button">Edit</button>' },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnRemoveOutletSaleUI" type="button">Remove</button>' },
                 { "defaultContent": '<button class="btn btn-danger" id="btnRemoveOutletSaleUI" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },


            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletSaleInvoiceNo = $("#txtOutletSaleInvoiceNo").val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.UnitPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.Size = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.Barcode = $("#txtBarcode").val();
        aObj.VAT = $("#txtVATForInvididualProduct").val();
        aObj.Discount = $("#txtDiscount").val();
        aObj.Status = "Not Sent";

        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalOutletSaleUIPrice = 0;
        for (var i = 0; i < OutletSaleUIData.length; i++) {

            totalProduct += parseFloat(OutletSaleUIData[i].ProductQuantity);
            totalOutletSaleUIPrice += parseFloat(OutletSaleUIData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletSaleUIPrice);
    },

    populateDataForEditButton: function (aObj) {

        CreateOutletSaleUIHelper.ClearOutletSaleUIFormNomal();
        $('#hdnOutletSaleInvoiceNo').val(aObj.OutletSaleInvoiceNo);
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



