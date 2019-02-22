var a = 0;
var OutletPOData = [];

var CreateOutletPOManager = {
    SendRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(OutletPOData));
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPO/CreateOutletPODetails",
            data: JSON.stringify({ OutletPOData: CreateOutletPOHelper.GetOutletPOData(), productList: OutletPOData }),
            //data: JSON.stringify(OutletPOData),
            success: function (response) {
                debugger;
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    viewOutletPOManager.GetOutletPODataTable();
                    //CreateOutletPOHelper.ClearOutletPOForm();
                    OutletPOData = [];
                    CreateOutletPOHelper.GetOutletPODataTable();
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
            data: JSON.stringify(CreateOutletPOHelper.GetOutletPOData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateOutletPOManager.GetOutletPODataTable();
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


    ///////Load all Warehouse Name for Warehouse Drop Down
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
        // CreateWarehousePOManager.GetWarehousePODataTable();
        CreateOutletPOHelper.GetOutletPODataTable();
    }
};


var CreateOutletPOHelper = {

    CreateOutletPOInit: function () {

        CreateOutletPOHelper.GetOutletPODataTable();

        $("#btnSendRequest").click(function () {
            //alert("Request from Send request Button JS");
            debugger;
            //$("#myModalFroSendRequest #modal-body #rif").html("Are you sure to Send Request?Click 'Yes' to send request else 'No'.");
            //$('#myModalFroSendRequest').appendTo("body").modal('show');
            //$("#btnYes").click(function () {
                CreateOutletPOManager.SendRequest();
                viewOutletPOManager.GetOutletPODataTable();
            });

        //});

        $("#btnClearOutletPOForm").click(function () {
            CreateOutletPOHelper.ClearOutletPOForm();
        });

        $('#myTable tbody').on('click', '#btnEditOutletPO', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateOutletPOHelper.populateDataForEditButton(data);
        });


        //$('#myTable tbody').on('click', '#btnRemoveOutletPO', function () {
        //    debugger;
        //    var table = $('#myTable').DataTable();
        //    var data = table.row($(this).parents('tr')).data();
        //    // OutletPOData.find(data.ProductId).remove();
            
        //    var oldTotalQuantity = parseFloat($("#txtTotalProduct").val());
        //    var removedQuantity = parseFloat(data.ProductQuantity);
        //    $("#txtTotalProduct").val(parseFloat(oldTotalQuantity) - parseFloat(removedQuantity));
        //    var oldTotalPrice = parseFloat($("#txtTotalPrice").val());
        //    var removedPriceAmount = parseFloat(data.PriceAmount);
        //    $("#txtTotalPrice").val(parseFloat(oldTotalPrice) - parseFloat(removedPriceAmount));

        //    for (var i = OutletPOData.length - 1; i >= 0; i--) {
        //        if (OutletPOData[i].ProductId == data.ProductId) {
        //            OutletPOData.splice(i, 1);
        //        }
        //    }
        //    CreateOutletPOHelper.GetOutletPODataTable();

        //    //     OutletPOData.splice(data);
        //    //    $(this).closest('tr').remove();
        //});

         $('#myTable tbody').on('click', '#btnRemoveOutletPO', function () {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            // OutletPOData.find(data.ProductId).remove();
            
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
            CreateOutletPOHelper.GetOutletPODataTable();

            //     OutletPOData.splice(data);
            //    $(this).closest('tr').remove();
        });

        CreateOutletPOHelper.loadProductsDropDown();
        CreateOutletPOHelper.LoadWarehouseNameDDD();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            CreateOutletPOManager.loadASingleProductDetails(productId);
        });

        $("#txtProductQuantity").click(function () {

            $("#txtProductQuantity").on("input", function () {
                $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                //////////$("#txtTotalOutletPOPrice").val(totalOutletPOPrice);
            });
        });

        ////////Automatically add a first row of data
        $('#btnAddProduct').on('click', function () {
            debugger;

            if (($("#cmbSupplierId").val() === '') && ($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html(" OutletPO Name, Product and Product Quantiy Fields are Required.");
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
          
            else if (($("#hdnOutletPOMasterId").val() <= 0) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;
                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateOutletPOHelper.GetProductObj();
               
                for (var i = OutletPOData.length - 1; i >= 0; i--) {
                    if (OutletPOData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = OutletPOData[i].ProductQuantity;
                        var oldPrice = OutletPOData[i].PriceAmount;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        priceAmount = parseInt(oldPrice) + parseInt(priceAmount);
                        OutletPOData.splice(i, 1);
                    }
                }
                var tempOutletInvoiceMasterId = $("#hdnOutletPOMasterId").val();
                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                OutletPOData.push(aProductDetails);
                CreateOutletPOHelper.PopulateGrandTotalPriceQuentity();
                CreateOutletPOHelper.GetOutletPODataTable();
                //CreateOutletPOHelper.ClearOutletPOForm();    ////If I call clear tene then "OutletPOMasterId" contail zero value,but I cant understand that after clearing all I set the "OutletPOMasterId" in hidden field also,so whats the problem(Must be dubug properly in deep)
                CreateOutletPOHelper.ClearOutletPOFormForNormalButtons();    ///////

                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
            }
            else if (($("#hdnOutletPOMasterId").val() > 0) && ($("#cmbWarehouseId").val() !== '') && ($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                debugger;
                //alert(JSON.stringify(OutletPOData));
                var productQuantity = $('#txtProductQuantity').val();
                var priceAmount = $('#txtPriceAmount').val();
                var aProductDetails = CreateOutletPOHelper.GetProductObj();

                for (var i = OutletPOData.length - 1; i >= 0; i--) {
                    if (OutletPOData[i].ProductId == aProductDetails.ProductId) {

                        productQuantity = parseInt(productQuantity);
                        priceAmount = parseInt(priceAmount);
                        OutletPOData.splice(i, 1);
                    }
                }

                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.PriceAmount = priceAmount;
                aProductDetails.TotalPrice = totalPrice;

                OutletPOData.push(aProductDetails);
                CreateOutletPOHelper.PopulateGrandTotalPriceQuentity();
                CreateOutletPOHelper.GetOutletPODataTable();
                //CreateOutletPOHelper.ClearOutletPOForm();    ////If I call clear tene then "OutletPOMasterId" contail zero value,but I cant understand that after clearing all I set the "OutletPOMasterId" in hidden field also,so whats the problem(Must be dubug properly in deep)
                CreateOutletPOHelper.ClearOutletPOFormForNormalButtons();    ///////

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
        var warehouseData = CreateOutletPOManager.LoadWarehouseNameDD();

        $("#cmbWarehouseId").select2({
            placeholder: "Select a Warehouse",
            data: warehouseData
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateOutletPOManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearOutletPOFormForNormalButtons: function () {
       
        $("#txtProductName").val('');
        //$("#txtOutletPOName").val('');/////  "OutletPO Name",  Total Product and Todal OutletPO price will not be clear(reamin)  in text boxes,also OutletPO Name will not be changed while Tolat OutletPO Price will be change aacording to Total Product 
       
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

    ClearOutletPOForm: function () {

        $('#hdnOutletPOMasterId').val(0);
        $('#hdnOutletPODetailsId').val(0);
        $("#cmbWarehouseId").val('').trigger("change");
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
        $("#txtTotalOutletPOPrice").val('');
        CreateOutletPOHelper.ClearOutletPOFormForNormalButtons();
        //$("#txtProductName").val('');
        //$("#txtOutletPOName").val('');/////  "OutletPO Name",  Total Product and Todal OutletPO price will not be clear(reamin)  in text boxes,also OutletPO Name will not be changed while Tolat OutletPO Price will be change aacording to Total Product 
        //$("#cmbWarehouseId").val('').trigger("change");
        //$("#cmbProductId").val('').trigger("change");
        //$("#txtProductQuantity").val('');
        //$("#txtTotalProduct").val('');
        //$("#txtPriceAmount").val('');
        //$("#txtWholeSalePrice").val('');
        //$("#txtTotalPrice").val('');
        //$("#txtRetailPrice").val('');
        //$("#txtPriceAmount").val('');
        //$("#txtTotalWarehousePOPrice").val('');
        //$("#txtSize").val('');
        //$("#txtBarcode").val('');
        //$("#txtItemName").val('');
        //$("#txtUoM").val('');
    },

    GetOutletPOData: function () {
        var aObj = new Object();
        debugger;
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
        //alert("Save Product Purchase Informaiton");
        //alert(JSON.stringify(aObj));              ////To check data pass through to object or not
        aObj.OutletPOIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
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
                { "data": "OutletPOMasterId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "OutletPODetailsId", "autoWidth": false, "visible": false},//"visible": false},
                { "data": "WarehouseId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "ProductId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductMainBarcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "SizeName", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletPO" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemoveOutletPO" type="button">Remove</button>' },
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
        var totalOutletPOPrice = 0;
        for (var i = 0; i < OutletPOData.length; i++) {

            totalProduct += parseFloat(OutletPOData[i].ProductQuantity);
            totalOutletPOPrice += parseFloat(OutletPOData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletPOPrice);
    },

    populateDataForEditButton: function (aObj) {

        CreateOutletPOHelper.ClearOutletPOFormForNormalButtons();////If I call clear "CreateOutletPOHelper.ClearOutletPOForm()" then "OutletPOMasterId" contains zero value,but the "OutletPOMasterId" in hidden field will contain a positave value also.
       
        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
        $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        ///$("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
        $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
        $("#txtBarcode").val(aObj.ProductMainBarcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.SizeName);
        $("#txtUoM").val(aObj.UoMShortName);
    },
}



//===========//
//$.ajax({
//          type: 'POST',
//          url: "/Inventory/OutletPO/ChangeStatusValue",
//          data: JSON.stringify({ OutletPOMasterId: OutletPOMasterId, setStatusValue: OutletPOMasterId }),
//          //data: JSON.stringify(OutletPOData),
//          success: function (response) {
//              debugger;
//              if (response != null) {


//              }
//          },
//          error: function (response) {

//          },
//          dataType: "json",
//          contentType: "application/json",
//      });