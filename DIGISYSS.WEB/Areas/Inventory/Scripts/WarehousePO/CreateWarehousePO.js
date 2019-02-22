var a = 0;
var WarehousePOData = [];
var CreateWarehousePOManager = {
    SendRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(WarehousePOData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/WarehousePO/CreateWarehousePODetails",
            data: JSON.stringify({ WarehousePOData: CreateWarehousePOHelper.GetWarehousePOData(), productList: WarehousePOData }),
            //data: JSON.stringify(WarehousePOData),
            success: function (data) {  
            debugger;
            if (data != null) {
                   
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    
                    WarehousePOData = [];
                    CreateWarehousePOHelper.ClearWarehousePOForm();
                    CreateWarehousePOHelper.GetWarehousePODataTable();
                    viewWarehousePOManager.GetWarehousePOSavedDataTable();
                    // CreateWarehousePOHelper.ClearWarehousePOForm();
                    
                }
            },
            error: function (data) {
                $("#dialog_simple").html(data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
           
        });
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(CreateWarehousePOHelper.GetWarehousePOData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreateWarehousePOManager.GetWarehousePODataTable();
                    viewWarehousePOManager.GetWarehousePOSavedDataTable();
                   
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Message);
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
                    $("#hdnProductId").val(response.result[0].ProductId);
                    $("#hdnProductName").val(response.result[0].ProductName);
                    $("#txtRetailPrice").val(response.result[0].RetailPrice);
                    $("#txtItemName").val(response.result[0].ItemName);
                    $("#txtSize").val(response.result[0].SizeName);
                    $("#txtUoM").val(response.result[0].UoMShortName);
                    $("#txtBarcode").val(response.result[0].ProductMainBarcode);
                    $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },


    ///////Load all Warehouse Name for Warehouse Drop Down
     LoadSupplierNameDD: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Supplier/GetAllSupplierNameForDd',
            success: function (response, textStatus) {
                b = response.data;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
     },

     LoadViewData: function(aData) {
         WarehousePOData = [];
         WarehousePOData = aData;
        // CreateWarehousePOManager.GetWarehousePODataTable();
         CreateWarehousePOHelper.GetWarehousePODataTable();
     }
};


var CreateWarehousePOHelper = {

    CreateWarehousePOInit: function () {
        debugger;
        CreateWarehousePOHelper.GetWarehousePODataTable();

        $("#btnSendRequest").click(function () {
            //alert("Request from Send request Button JS");
            debugger;
            //$("#myModalFroSendRequest #modal-body #rif").html("Are you sure to Send Request?Click 'Yes' to send request else 'No'.");
            //$('#myModalFroSendRequest').appendTo("body").modal('show');
            //$("#btnYes").click(function () {
                 CreateWarehousePOManager.SendRequest();
            //});
        });

        $("#btnClearWarehousePOForm").click(function () {
            CreateWarehousePOHelper.ClearWarehousePOForm();
        });

        $('#myTableAddProductToSendRequest tbody').on('click', '#btnEditWarehousePO', function (e) {
            debugger;
            var table = $('#myTableAddProductToSendRequest').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreateWarehousePOHelper.populateDataForEditButton(data);
        });
        

        $('#myTableAddProductToSendRequest tbody').on('click', '#btnRemoveWarehousePO', function () {
            debugger;
            var table = $('#myTableAddProductToSendRequest').DataTable();
            var data = table.row($(this).parents('tr')).data();
           
            // alert(JSON.stringify(data));

            $(this).closest('tr').remove();
            var index = data.indexOf(data.ProductId);
            WarehousePOData.splice(index  , 1);

            //var table = $('#myTableAddProductToSendRequest').DataTable();
            //var data = table.row($(this).parents('tr')).data();
            //WarehousePOData.find(data.ProductId).remove();

            //for (var i = WarehousePOData.length - 1; i >= 0; i--) {
            //    if (WarehousePOData[i].ProductId == data.ProductId) {
            //        WarehousePOData.splice(i, 1);
            //    }
            //}
            CreateWarehousePOHelper.GetWarehousePODataTable();

        });
        
        CreateWarehousePOHelper.loadProductsDropDown();
        CreateWarehousePOHelper.LoadSupplierNameDDD();

        $('#cmbProductId').change(function () {
            debugger;
           
            var productId = parseInt($("#cmbProductId").val());
            CreateWarehousePOManager.loadASingleProductDetails(productId);
        });

        $("#txtProductQuantity").click(function () {

            $("#txtProductQuantity").on("input", function () {
                $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                //$("#txtTotalWarehousePOPrice").val(totalWarehousePOPrice);
            });
        });

      

        ////////Automatically add a first row of data
        $('#btnAddProduct').on('click', function () {
          

            if (($("#cmbWarehouseId").val() === '') && ($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                    $("#myModal #modal-body #rif").html("Supplier Name, Product and Product Quantiy Fields are Required.");
                    $('#myModal').appendTo("body").modal('show');
                }
            else if (($("#cmbWarehouseId").val() === '')) {
                    $("#myModal #modal-body #rif").html("Please Select a Supplier Name.");
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
               
               else if (($("#cmbWarehouseId").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() > 0)) {
                
                var productQuantity = $('#txtProductQuantity').val();
                var aProductDetails = CreateWarehousePOHelper.GetProductObj();
               

                //CreateWarehousePOHelper.ClearWarehousePOForm();
                debugger;
                for (var i = WarehousePOData.length - 1; i >= 0; i--) {
                    if (WarehousePOData[i].ProductId == aProductDetails.ProductId) {
                        var oldQuantity = WarehousePOData[i].OrderedQuantity;
                        productQuantity = parseInt(oldQuantity) + parseInt(productQuantity);
                        WarehousePOData.splice(i, 1);
                    }
                }


                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.OrderedQuantity = productQuantity;
                aProductDetails.TotalPrice = totalPrice;
                WarehousePOData.push(aProductDetails);
                CreateWarehousePOHelper.PopulateGrandTotalPriceQuentity();
                CreateWarehousePOHelper.GetWarehousePODataTable();

                $("#txtProductQuantity").val('');
                $("#txtPriceAmount").val('');
            }

            else {
                $("#myModal #modal-body #rif").html("Error Product Can not be Add.");
                $('#myModal').appendTo("body").modal('show');
            }
        });
    },

    LoadSupplierNameDDD: function () {
        var supplierData = CreateWarehousePOManager.LoadSupplierNameDD();

        $("#cmbSupplierId").select2({
            placeholder: "Select a Supplier",
            data: supplierData
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateWarehousePOManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearWarehousePOFormNoramlButton: function () {

        $("#cmbProductId").val('').trigger("change");
        $("#txtProductName").val('');
        $("#txtProductQuantity").val('');
        $("#txtPriceAmount").val('');
        $("#txtRetailPrice").val('');
        $("#txtSize").val('');
        $("#txtBarcode").val('');
        $("#txtItemName").val('');
        $("#txtUoM").val('');
        $("#txtWholeSalePrice").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
        
    },
    ClearWarehousePOForm: function () {

        CreateWarehousePOHelper.ClearWarehousePOFormNoramlButton();
        $('#hdnWarehousePOMasterId').val(0);
        $('#hdnWarehousePODetailsId').val(0);
        $("#txtProductName").val('');
        $("#cmbSupplierId").val('').trigger("change");
        $("#txtTotalWarehousePOPrice").val('');
        $("#txtTotalProduct").val('');
        $("#txtTotalPrice").val('');
      
    },

    GetWarehousePOData: function () {
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
        aObj.OrderedQuantity = $("#txtProductQuantity").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();
        aObj.WarehousePOIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
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


    // Below the datatable to Add diffrent  typers of proudct and to send request to Warehouse PO
    GetWarehousePODataTable: function () {
        debugger;
        $('#myTableAddProductToSendRequest').dataTable().fnDestroy();
        $('#myTableAddProductToSendRequest').DataTable({
            data: WarehousePOData, 
            "columns": [
                { "data": "WarehousePOMasterId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "WarehousePODetailsId", "autoWidth": false, "visible": false },//"visible": false},
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { "data": "ProductId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "SupplierId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductMainBarcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "SizeName", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "OrderedQuantity", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditWarehousePO" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemoveWarehousePO" type="button">Remove</button>' },
            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.WarehousePOMasterId = $('#hdnWarehousePOMasterId').val();
        aObj.WarehousePODetailsId = $('#hdnWarehousePODetailsId').val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.WarehouseId = $("#cmbWarehouseId").val();
        aObj.SupplierId = $("#cmbSupplierId").val();
        //aObj.SupplierName = $("#cmbSupplierName").val();
        aObj.OrderedQuantity = $("#txtProductQuantity").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.SizeName = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.PriceAmount=$("#txtPriceAmount").val();
        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        
        var totalProduct = 0;
        var totalWarehousePOPrice = 0;
        for (var i = 0; i < WarehousePOData.length; i++) {

            totalProduct += parseFloat(WarehousePOData[i].OrderedQuantity);
            totalWarehousePOPrice += parseFloat(WarehousePOData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalWarehousePOPrice);
    },

    populateDataForEditButton: function (aObj) {

        CreateWarehousePOHelper.ClearWarehousePOForm();
        $('#hdnWarehousePOMasterId').val(aObj.WarehousePOMasterId);
        $('#hdnWarehousePODetailsId').val(aObj.WarehousePODetailsId);
        $("#cmbSupplierId").val(aObj.SupplierId).trigger("change");
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#txtProductQuantity").val(aObj.OrderedQuantity);
        $("#txtRetailPrice").val(aObj.RetailPrice);
        $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.OrderedQuantity));
        $("#txtBarcode").val(aObj.ProductMainBarcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.SizeName);
        $("#txtUoM").val(aObj.UoMShortName);
    },
}