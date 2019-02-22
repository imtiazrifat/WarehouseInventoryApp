var a = 0;
var WarehousePOReturnData = [];

var CreateWarehousePOReturnManager = {
    SendRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(WarehousePOReturnData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/WarehousePOReturn/CreateWarehousePOReturnDetails ",
            data: JSON.stringify({ WarehousePOReturnData: CreateWarehousePOReturnHelper.GetWarehousePOReturnData(), productList: WarehousePOReturnData }),
            //data: JSON.stringify(WarehousePOReturnData),
            success: function (response) {
                debugger;
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    viewWarehousePOReturnManager.GetWarehousePOReturnDataTable();
                    //CreateWarehousePOReturnHelper.ClearWarehousePOReturnForm();
                    WarehousePOReturnData = [];
                    CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();
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
            data: JSON.stringify(CreateWarehousePOReturnHelper.GetWarehousePOReturnData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateWarehousePOReturnManager.GetWarehousePOReturnDataTable();
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
        WarehousePOReturnData = [];
        WarehousePOReturnData = aData;
        CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();
    }
};


var CreateWarehousePOReturnHelper = {

    CreateWarehousePOReturnInit: function () {

        CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();

        $("#btnSendRequest").click(function () {
            debugger;
                CreateWarehousePOReturnManager.SendRequest();
                viewWarehousePOReturnManager.GetWarehousePOReturnDataTable();
            });

        $("#btnClearWarehousePOReturnForm").click(function () {
            CreateWarehousePOReturnHelper.ClearWarehousePOReturnForm();
        });

        $('#myTable tbody').on('click', '#btnEditWarehousePOReturn', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateWarehousePOReturnHelper.populateDataForEditButton(data);
        });

         $('#myTable tbody').on('click', '#btnRemoveWarehousePOReturn', function () {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
            var removedQuantity = parseFloat(data.ProductQuantity);
            $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
            var oldTotalPrice = parseFloat($("#txtTotalPrice").val());
            var removedPriceAmount = parseFloat(data.PriceAmount);
            $("#txtTotalPrice").val(parseFloat(oldTotalPrice) - parseFloat(removedPriceAmount));

            for (var i = WarehousePOReturnData.length - 1; i >= 0; i--) {
                if (WarehousePOReturnData[i].ProductId == data.ProductId) {
                    WarehousePOReturnData.splice(i, 1);
                }
            }
            CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();
        });

        CreateWarehousePOReturnHelper.loadProductsDropDown();
        CreateWarehousePOReturnHelper.LoadWarehouseNameDDD();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            CreateWarehousePOReturnManager.loadASingleProductDetails(productId);
        });

        $("#txtProductQuantity").click(function () {

            $("#txtProductQuantity").on("input", function () {
                $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
            });
        });
      
        $('#btnAddProduct').on('click', function () {
            debugger;

            if (($("#cmbSupplierId").val() === '') && ($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html(" WarehousePOReturn Name, Product and Product Quantiy Fields are Required.");
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
          
            else if (($("#hdnWarehousePOMasterId").val() <= 1) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;
                
                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateWarehousePOReturnHelper.GetProductObj();
               
                for (var i = WarehousePOReturnData.length - 1; i >= 0; i--) {
                    if (WarehousePOReturnData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = WarehousePOReturnData[i].ProductQuantity;
                        var oldPrice = WarehousePOReturnData[i].PriceAmount;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        priceAmount = parseInt(oldPrice) + parseInt(priceAmount);
                        WarehousePOReturnData.splice(i, 1);
                    }
                }

                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                WarehousePOReturnData.push(aProductDetails);
                CreateWarehousePOReturnHelper.PopulateGrandTotalPriceQuentity();
                CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();
                CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();    ///////

                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
            }
            else if (($("#hdnWarehousePOMasterId").val() > 0) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;
                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateWarehousePOReturnHelper.GetProductObj();

                for (var i = WarehousePOReturnData.length - 1; i >= 0; i--) {
                    if (WarehousePOReturnData[i].ProductId == aProductDetails.ProductId) {

                        productQuantity = parseInt(productQuantity);
                        priceAmount = parseInt(priceAmount);
                        WarehousePOReturnData.splice(i, 1);
                    }
                }

                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                WarehousePOReturnData.push(aProductDetails);
                CreateWarehousePOReturnHelper.PopulateGrandTotalPriceQuentity();
                CreateWarehousePOReturnHelper.GetWarehousePOReturnDataTable();
                CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();    ///////

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
        var warehouseData = CreateWarehousePOReturnManager.LoadWarehouseNameDD();

        $("#cmbWarehouseId").select2({
            placeholder: "Select a Warehouse",
            data: warehouseData
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateWarehousePOReturnManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearWarehousePOReturnFormForNormalButtons: function () {
       
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

    ClearWarehousePOReturnForm: function () {
    CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();
        $('#hdnWarehousePOMasterId').val(0);
        $('#hdnWarehousePODetailsId').val(0);
        $("#cmbWarehouseId").val('').trigger("change");
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
        $("#txtTotalWarehousePOReturnPrice").val('');
    },

    GetWarehousePOReturnData: function () {
        var aObj = new Object();
        debugger;
        aObj.WarehousePOMasterId = $('#hdnWarehousePOMasterId').val();
        aObj.WarehousePODetailsId = $("#hdnWarehousePODetailsId").val();
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
        aObj.WarehousePOReturnIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
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

    GetWarehousePOReturnDataTable: function () {

        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            data: WarehousePOReturnData,
            "columns": [
                { "data": "WarehousePOMasterId", "autoWidth": false, "visible": false },
                { "data": "WarehousePODetailsId", "autoWidth": false, "visible": false},
                { "data": "WarehouseId", "autoWidth": false, "visible": false },
                { "data": "ProductId", "autoWidth": false, "visible": false },
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductMainBarcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "SizeName", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditWarehousePOReturn" type="button">Edit</button>', "width": "5%" },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemoveWarehousePOReturn" type="button">Remove</button>' },
            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.WarehousePOMasterId = $('#hdnWarehousePOMasterId').val();
        aObj.WarehousePODetailsId = $('#hdnWarehousePODetailsId').val();
        aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
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
        var totalWarehousePOReturnPrice = 0;
        for (var i = 0; i < WarehousePOReturnData.length; i++) {

            totalProduct += parseFloat(WarehousePOReturnData[i].ProductQuantity);
            totalWarehousePOReturnPrice += parseFloat(WarehousePOReturnData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalWarehousePOReturnPrice);
    },

    populateDataForEditButton: function (aObj) {

        CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();
        $('#hdnWarehousePOMasterId').val(aObj.WarehousePOMasterId);
        $('#hdnWarehousePODetailsId').val(aObj.WarehousePODetailsId);
        $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtBarcode").val(aObj.ProductMainBarcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.SizeName);
        $("#txtUoM").val(aObj.UoMShortName);
    },
}