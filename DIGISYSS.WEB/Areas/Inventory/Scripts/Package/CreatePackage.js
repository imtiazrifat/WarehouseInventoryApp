var a = 0;

//var totalPackagePrice=0;
//var wholeSalePrice=0;
//var retailPrice=0;
//var purchaseQuantity = 0;
var packageData = [];
//var packageData = [


//    { ProductId:"1212",ProductName: "AAAAA", Barcode: "11111", ItemName: "asdsad", Size: "SSS", UoMName: "sadsa", ProductQuantity: "sadsad", RetailPrice: "asdsad", TotalPrice: "100" },
//     { ProductId: "1212", ProductName: "AAAAA", Barcode: "11111", ItemName: "asdsad", Size: "SSS", UoMName: "sadsa", ProductQuantity: "sadsad", RetailPrice: "asdsad", TotalPrice: "100" }
//];

var CreatePackageManager = {
    SavePackage: function () {


        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(packageData));

        $.ajax({
            type: 'POST',
            url: "/Inventory/Package/CreatePackageDetails",
            //  data: JSON.stringify(CreatePackageHelper.GetPackageDataTable()),
            data: JSON.stringify({ packageData: CreatePackageHelper.GetPackageData(), productList: packageData }),
            //data: JSON.stringify(packageData),
            success: function (response) {

                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    CreatePackageHelper.ClearPackageForm();
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
            data: JSON.stringify(CreatePackageHelper.GetPackageData()),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    CreatePackageManager.GetPackageDataTable();
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
                    //  CreatePackageHelper.LoadAProductDetailsData(response);
                    //var b = response.result[0].RetailPrice;
                    $("#hdnProductId").val(response.result[0].ProductId);
                    $("#hdnProductName").val(response.result[0].ProductName);
                    $("#txtRetailPrice").val(response.result[0].RetailPrice);
                    $("#txtItemName").val(response.result[0].ItemName);
                    $("#txtSize").val(response.result[0].SizeName);
                    // $("#txtUoM").val("N/a");
                    $("#txtUoM").val(response.result[0].UoMShortName);
                    $("#txtBarcode").val(response.result[0].ProductMainBarcode);
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },
};


var CreatePackageHelper = {

    CreatePackageInit: function () {
        debugger;
        CreatePackageHelper.GetPackageDataTable();

        $("#btnSavePackage").click(function () {
            CreatePackageManager.SavePackage();
        });

        $("#btnClearPackageForm").click(function () {
            CreatePackageHelper.ClearPackageForm();
        });

        $('#myTable tbody').on('click', '#btnEditPackage', function (e) {
            debugger;
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            CreatePackageHelper.populateDataForEditButton(data);
        });


        $('#myTable tbody').on('click', '#btnRemovePackage', function () {
            var table = $('#myTable').DataTable();
            var data = table.row($(this).parents('tr')).data();
            //alert(JSON.stringify(packageData));
            //alert(JSON.stringify(data));
            packageData.splice(data);
            //alert(JSON.stringify(packageData));
            $(this).closest('tr').remove();
        });

        CreatePackageHelper.loadProductsDropDown();

        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());
            CreatePackageManager.loadASingleProductDetails(productId);
        });

        $("#txtProductQuantity").click(function () {
            $("#txtProductQuantity").on("input", function () {
                $("#txtTotalPackagePrice").val(totalPackagePrice);
            });
        });

        ////////Automatically add a first row of data

        $('#btnAddPackage').on('click', function () {
            if (($("#txtPackageName").val() === '') || ($("#cmbProductId").val() === '') || ($("#txtProductQuantity").val() === '')) {

                if (($("#txtPackageName").val() === '') && ($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                    $("#myModal #modal-body #rif").html(" Package Name, Product and Product Quantiy Fields are Required.");
                    $('#myModal').appendTo("body").modal('show');
                }
                else if (($("#txtPackageName").val() === '')) {
                    $("#myModal #modal-body #rif").html("Please Provide Package Name.");
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
                else {
                    $("#myModal #modal-body #rif").html(" Please check Package Name, Product and Product Quantity Fields are not Empty.");
                    $('#myModal').appendTo("body").modal('show');
                }

            }
            else if (($("#txtPackageName").val() !== '') && ($("#cmbProductId").val() !== '') && ($("#txtProductQuantity").val() !== '')) {
                //debugger;
                var productQuantity = $('#txtProductQuantity').val();
                var aProductDetails = CreatePackageHelper.GetProductObj();
                var totalPrice = aProductDetails.RetailPrice * productQuantity;
                aProductDetails.ProductQuantity = productQuantity;
                aProductDetails.TotalPrice = totalPrice;

                packageData.push(aProductDetails);
                CreatePackageHelper.PopulateGrandTotalPriceQuentity();
                CreatePackageHelper.GetPackageDataTable();
                CreatePackageHelper.ClearPackageForm();
            }
            else {
                $("#myModal #modal-body #rif").html("Error Product Can not be Add.");
                $('#myModal').appendTo("body").modal('show');
            }
        });
    },


    loadProductsDropDown: function () {
        var productName = CreatePackageManager.loadProductsForDropDown();

        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },


    ClearPackageForm: function () {

        $('#hdnPackageMasterId').val(0);
        $('#hdnPackageDetailsId').val(0);
        $("#txtProductName").val('');
        //$("#txtPackageName").val('');/////  "Package Name",  Total Product and Todal Package price will not be clear(reamin)  in text boxes,also Package Name will not be changed while Tolat Package Price will be change aacording to Total Product 
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtRetailPrice").val('');
        $("#txtSize").val('');
        $("#txtBarcode").val('');
        $("#txtItemName").val('');
        $("#txtUoM").val('');
        $("#txtWholeSalePrice").val('');

        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetPackageData: function () {
        var aObj = new Object();
        debugger;
        aObj.PackageMasterId = $('#hdnPackageMasterId').val();
        aObj.PackageDetailsId = $("#hdnPackageDetailsId").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ProductPriceId = $("#hdnProductPriceId").val();

        aObj.SizeId = $("#cmbSizeId").val();
        aObj.UoMId = $("#cmbUoMId").val();
        aObj.ProductName = $("#txtProductName").val();
        aObj.PackageName = $("#txtPackageName").val();
        aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();
        //alert("Save Product Purchase Informaiton");
        //alert(JSON.stringify(aObj));              ////To check data pass through to object or not
        aObj.PackageIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
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
        //if (aObj.result[0].IsActive == 1) {
        //    $("#chkIsActive").prop('checked', 'checked');
        //} else  {
        //    $("#chkIsActive").removeProp('checked', 'checked');//}
        //alert(JSON.stringify(aObj));
    },

    GetPackageDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            data: packageData,
            "columns": [
              //{ "data": "ProductPriceId", "autoWidth": false },//"visible": false},
                { "data": "ProductId", "autoWidth": false, "visible": false },//"visible": false},
                { "data": "ProductName", "autoWidth": true },
                { "data": "Barcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "Size", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "TotalPrice", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditPackage" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemovePackage" type="button">Remove</button>' },
            ],
        });
    },

    GetProductObj: function () {
        debugger;
        var aObj = new Object();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.PackageName = $("#txtPackageName").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.Size = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.Barcode = $("#txtBarcode").val();
        return aObj;

    },
    PopulateGrandTotalPriceQuentity: function () {
        //debugger;
        var totalProduct = 0;
        var totalPackagePrice = 0;

        for (var i = 0; i < packageData.length; i++) {
            totalProduct += parseFloat(packageData[i].ProductQuantity);
            totalPackagePrice += parseFloat(packageData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalPackagePrice);
    },

    populateDataForEditButton: function (aObj) {

        CreatePackageHelper.ClearPackageForm();
        $('#hdnProductId').val(aObj.ProductId);
        $('#cmbProductId').val(aObj.ProductId).trigger("change");
        $("#hdnProductName").val(aObj.ProductName);
        $("#txtPackageName").val(aObj.PackageName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtBarcode").val(aObj.Barcode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtSize").val(aObj.Size);
        $("#txtUoM").val(aObj.UoMShortName);
        $("#txtRetailPrice").val(aObj.RetailPrice);
    },
}