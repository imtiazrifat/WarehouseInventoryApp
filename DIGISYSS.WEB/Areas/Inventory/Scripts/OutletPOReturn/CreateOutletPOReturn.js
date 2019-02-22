var a = 0;
var OutletPOData = [];

var CreateOutletPOReturnManager = {
    ReturnRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(OutletPOData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPOReturn/CreateOutletPoReturnDetails ",
            data: JSON.stringify({ OutletPOData: CreateOutletPOReturnHelper.GetOutletPOData(), productList: OutletPOData }),
            //data: JSON.stringify(OutletPOData),
            success: function (response) {
                debugger;
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    setTimeout(function () {
                        $("#myModal").modal('hide');
                    }, 2000);
                    ReceivedOutletPOManager.GetOutletPODataTable();
                    //CreateOutletPOReturnHelper.ClearOutletPOReturnForm();
                    OutletPOData = [];
                    CreateOutletPOReturnHelper.GetOutletPODataTable();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
                setTimeout(function () {
                    $("#myModal").modal('hide');
                }, 2000);
            },
            dataType: "json",
            contentType: "application/json",
        });

        $.ajax({
            type: 'POST',
            data: JSON.stringify(CreateOutletPOReturnHelper.GetOutletPOData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateOutletPOReturnManager.GetOutletPODataTable();
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
    OutletPoReturn: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPOReturn/OutletPoReturn",
            data: JSON.stringify({ OutletPOData: CreateOutletPOReturnHelper.GetOutletPOData(), productList: OutletPOData }),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    IndividualOutletPOReturnViewManager.GetIndividualOutletPOReturnViewDataTable();
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
                    debugger;
                    $("#hdnProductId").val(response.result[0].ProductId);
                    $("#hdnProductName").val(response.result[0].ProductName);
                    $("#txtRetailPrice").val(response.result[0].RetailPrice);
                    $("#txtItemName").val(response.result[0].ItemName);
                    $("#txtSize").val(response.result[0].SizeName);
                    $("#txtUoM").val(response.result[0].UoMShortName);
                    $("#txtBarcode").val(response.result[0].ProductMainBarcode);
                    $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                    debugger;
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },

    LoadWarehouseNameDD: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/WareHouse/GetAllWarehouseNameForDd',
            success: function (response, textStatus) {
                b = response.data;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },
    LoadViewData: function (aData) {
        OutletPOData = [];
        OutletPOData = aData;
        CreateOutletPOReturnHelper.GetOutletPODataTable();
    }
};


var CreateOutletPOReturnHelper = {

    CreateOutletPOReturnInit: function () {

        CreateOutletPOReturnHelper.GetOutletPODataTable();

        //$("#btnReturnRequest").click(function () {
        //    debugger;
        //    //CreateOutletPOReturnManager.ReturnRequest();
        //    //ReceivedOutletPOManager.GetOutletPODataTable();
        //});

        $("#btnReturnOutletPOByMaster").click(function () {
            debugger;
            //alert("return button of mytable");
            //var table = $('#myTable').DataTable();
            //var data = table.row($(this).parents('tr')).data();
            //var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            //var removedQuantity = parseFloat(data.ProductQuantity);
            //$("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            //var oldTotalPrice = parseFloat($("#txtTotalPrice").val());
            //var removedPriceAmount = parseFloat(data.PriceAmount);
            //$("#txtTotalPrice").val(parseFloat(oldTotalPrice) - parseFloat(removedPriceAmount));

            //for (var i = OutletPOData.length - 1; i >= 0; i--) {
            //    if (OutletPOData[i].ProductId == data.ProductId) {
            //        OutletPOData.splice(i, 1);
            //    }
            //}
            CreateOutletPOReturnManager.ReturnRequest();
            ReceivedOutletPOManager.GetOutletPODataTable();
        });

     

        $("#btnClearOutletPOReturnForm").click(function () {
          CreateOutletPOReturnHelper.ClearOutletPOReturnForm();
        
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 2000);
            
        });

        
        $('#myTable tbody').on('click', '#btnViewOutletPOReturn', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateOutletPOReturnHelper.populateDataForViewButton(data);
        });


        $('#myTable tbody').on('click', '#btnSingleOutletPOReturn', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateOutletPOReturnHelper.populateDataForViewButton(data);
        });

    
        $('#myTable tbody').on('click', '#btnReturnOutletPO', function () {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldTotalPrice = parseFloat($("#txtTotalPrice").val());
            var removedPriceAmount = parseFloat(data.PriceAmount);
            $("#txtTotalPrice").val(parseFloat(oldTotalPrice) - parseFloat(removedPriceAmount));

            for (var i = OutletPOData.length - 1; i >= 0; i--) {
                if (OutletPOData[i].ProductId == data.ProductId) {
                    OutletPOData.splice(i, 1);
                }
            }
            ////CreateOutletPOReturnHelper.GetOutletPODataTable();
        });


        CreateOutletPOReturnHelper.loadProductsDropDown();
        CreateOutletPOReturnHelper.LoadWarehouseNameDDD();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            CreateOutletPOReturnManager.loadASingleProductDetails(productId);
        });

        $("#txtProductQuantity").click(function () {

            $("#txtProductQuantity").on("input", function () {
                $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
            });
        });

        $('#btnAddProduct').on('click', function () {
            debugger;

            if (($("#cmbSupplierId").val() === '') && ($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html(" OutletPOReturn Name, Product and Product Quantiy Fields are Required.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbSupplierId").val() === '')) {
                $("#myModal #modal-body #rif").html("Please Provide Supplier Name.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbProductId").val() === '')) {
                $("#myModal #modal-body #rif").html("Please Select a Product.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Please Provide Product Quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtProductQuantity").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Please Provide a Valid Quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }

            else if (($("#hdnOutletPOMasterId").val() <= 1) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;

                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateOutletPOReturnHelper.GetProductObj();

                for (var i = OutletPOReturnData.length - 1; i >= 0; i--) {
                    if (OutletPOReturnData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = OutletPOReturnData[i].ProductQuantity;
                        var oldPrice = OutletPOReturnData[i].PriceAmount;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        priceAmount = parseInt(oldPrice) + parseInt(priceAmount);
                        OutletPOReturnData.splice(i, 1);
                    }
                }

                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                OutletPOReturnData.push(aProductDetails);
                CreateOutletPOReturnHelper.PopulateGrandTotalPriceQuentity();
                OutletPOReturnHelper.GetOutletPOReturnDataTable();
                CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();    ///////

                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
            }
            else if (($("#hdnOutletPOMasterId").val() > 0) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;
                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateOutletPOReturnHelper.GetProductObj();

                for (var i = OutletPOReturnData.length - 1; i >= 0; i--) {
                    if (OutletPOReturnData[i].ProductId == aProductDetails.ProductId) {

                        productQuantity = parseInt(productQuantity);
                        priceAmount = parseInt(priceAmount);
                        OutletPOReturnData.splice(i, 1);
                    }
                }

                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                OutletPOReturnData.push(aProductDetails);
                OutletPOReturnHelper.PopulateGrandTotalPriceQuentity();
                OutletPOReturnHelper.GetOutletPOReturnDataTable();
                CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();     ///////

                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
            }
            else {
                $("#myModal #modal-body #rif").html("Error Product Can not be Add.");
                $('#myModal').appendTo("body").modal('show');
            }
        });
    },

    LoadWarehouseNameDDD: function () {
        var warehouseData = CreateOutletPOReturnManager.LoadWarehouseNameDD();

        $("#cmbWarehouseId").select2({
            placeholder: "Select a Warehouse",
            data: warehouseData
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateOutletPOReturnManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearOutletPOReturnFormForNormalButtons: function () {
        
        $("#txtWarehouseName").val('');
        $("#txtProductName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtPriceAmount").val('');
        $("#txtWholeSalePrice").val('');
        $("#txtRetailPrice").val('');
        $("#txtPriceAmount").val('');
        $("#txtSize").val('');
        $("#txtBarcode").val('');
        $("#txtItemName").val('');
        $("#txtUoM").val('');
    },

    ClearOutletPOReturnForm: function () {
       
        CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
        $('#hdnOutletPOMasterId').val(0);
        $('#hdnOutletPODetailsId').val(0);
        $("#cmbWarehouseId").val('').trigger("change");
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
        $("#txtTotalOutletPOReturnPrice").val('');
    },

    GetOutletPOData: function () {
        var aObj = new Object();
        debugger;
        //aObj.OutletPOInvoiceMasterId = $('#hdnOutletPOInvoiceMasterId').val();
        //aObj.OutletPOInvoiceDetailsId = $('#hdnOutletPOInvoiceDetailsId').val();
        aObj.OutletPOReturnMasterId = $('#hdnOutletPOReturnMasterId').val();
        aObj.OutletPOReturnDetailsId = $('#hdnOutletPOReturnDetailsId').val();
        aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
        aObj.OutletPODetailsId = $("#hdnOutletPODetailsId").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ProductPriceId = $("#hdnProductPriceId").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.UoMId = $("#cmbUoMId").val();
        aObj.ProductName = $("#txtProductName").val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.SupplierId = $("#cmbSupplierId").val();
        aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();
        aObj.OutletPOReturnIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
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

    GetOutletPODataTable: function () {

        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            data: OutletPOData,
            "columns": [
                
                { "data": "OutletPOMasterId", "autoWidth": false, "visible": false },
                { "data": "OutletPODetailsId", "autoWidth": false, "visible": false },
                { "data": "WarehouseId", "autoWidth": false, "visible": false },
                { "data": "ProductId", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "1%"
                },
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductMainBarcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "SizeName", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Status", "autoWidth": true },

                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletPOReturn" type="button">View</button>', "width": "5%" },
                { "defaultContent": '<button class="btn btn-danger" id="btnSingleOutletPOReturn" type="button">Return</button>', "width": "5%" },
            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
        aObj.OutletPODetailsId = $('#hdnOutletPODetailsId').val();
        aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#txtProductName').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.SizeName = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.Status = "Not Sent";
        aObj.PriceAmount = $('#txtRetailPrice').val() * $("#txtProductQuantity").val();

        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalOutletPOReturnPrice = 0;
        for (var i = 0; i < OutletPOData.length; i++) {
            totalProduct += parseFloat(OutletPOData[i].ProductQuantity);
            totalOutletPOReturnPrice += parseFloat(OutletPOData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletPOReturnPrice);
    },
    

    populateDataForViewButton: function (aObj) {

        CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
        $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtWarehouseName").val(aObj.WarehouseName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtBarcode").val(aObj.ProductMainBarcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.SizeName);
        $("#txtUoM").val(aObj.UoMShortName);
    },
}