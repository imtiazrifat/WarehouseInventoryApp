var a = 0;
var  porductMainBarcode;
var productFactoryBarcode;

        
var CreateProductPurchaseManager = {
    SaveProductPurchase: function () {


        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/ProductPurchase/CreateProductPurchase",
            data: JSON.stringify(CreateProductPurchaseHelper.GetProductPurchaseData()),
            //success: function (returnPayload) {
            //    
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {

                if (response != null) {
                    //$("#myModal #modal-body #rif").html(response.data.Message);

                    //$('#myModal').appendTo("body").modal('show');

                    $("#myModal #modal-body #rif").html(response.data.Message);

                    $('#myModal').appendTo("body").modal('show');

                    viewProductPurchaseManager.GetProductPurchaseDataTable();
                    CreateProductPurchaseHelper.ClearProductPurchaseForm();

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

    loadFactoryNameDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Factory/GetAllFactoryDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
            }
        });
        return b;

    },



    loadItemCodeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Item/GetAllItemDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
            }
        });
        return b;

    },

    loadSizeCodeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Size/GetAllSizeDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
            }
        });
        return b;

    },

    loadColorCodeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Color/GetAllColorDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
            }
        });
        return b;

    },


    loadUoMCodeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/UoM/GetAllUoMDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" }
            }
        });
        return b;

    },

    loadASingleProductDetails: function (productId) {

        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Product/LoadASingleProductDetails',
            data: { productId: productId },
            success: function (response, textStatus) {
                debugger;
                if (response != null) {
                    CreateProductPurchaseHelper.LoadAProductDetailsData(response);

                }
            },
            error: function (textStatus, errorThrown) {

            }
        });


    },


    loadProductDropDownData: function (factoryId, itemId, uoMId, sizeId, colorId) {

        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            data: {
                factoryId: 0,
                itemId: itemId,
                uoMId: uoMId,
                sizeId: sizeId,
                colorId: colorId
            },
            url: ' /Inventory/Product/LoadAllProductDD',
            success: function (response, textStatus) {

                b = response.result;

            },
            error: function (textStatus, errorThrown) {

                b = { id: 0, text: "No Data" }
            }
        });
        return b;
    },

}

var CreateProductPurchaseHelper = {

    
    CreateProductPurchaseInit: function () {

        $("#btnSaveProductPurchase").click(function () {

            CreateProductPurchaseManager.SaveProductPurchase();

        });
        $("#btnClearProductPurchaseForm").click(function () {
            CreateProductPurchaseHelper.ClearProductPurchaseForm();

        });

        CreateProductPurchaseHelper.loadFactoryNameDropDown();
        CreateProductPurchaseHelper.loadItemCodeDropDown();
        CreateProductPurchaseHelper.loadSizeCodeDropDown();
        CreateProductPurchaseHelper.loadColorCodeDropDown();
        CreateProductPurchaseHelper.loadUoMCodeDropDown();
        // CreateProductPurchaseHelper.loadCurrentDate();
        CreateProductPurchaseHelper.loadProductDropDown(0, 0, 0, 0, 0);

        // To show and hide searchable Parameters

        $("#btnShowSearchableParameter").click(function () {
            debugger;
            //$(this).text(function (i, text) {
            //    return text === "Show Searchable Parameter(s)" ? "Hide Searchable Parameter(s)" : "Show Searchable Parameter(s)";
            //});
            var div = document.getElementById("divSearchableParameter");

            if (div.style.display !== 'none') {
                // div.style.display = 'none';
                $("#divSearchableParameter").hide(1000);
                $("#btnShowSearchableParameter").html('Show Searchable Parameters');
            }
            else {
                //   div.style.display = 'block';
                $("#divSearchableParameter").show(1000);
                $("#btnShowSearchableParameter").html('Hide Searchable Parameters');
            }
        });


        $('#cmbFactoryId,#cmbItemId,#cmbUoMId,#cmbSizeId,#cmbColorId').change(function () {

            //  var factoryId = $("#cmbFactoryId").val();
            //var itemId = $("#cmbItemId").val();
            //var uoMId = $("#cmbUoMId").val();
            //var sizeId = $("#cmbSizeId").val();
            //var colorId = $("#cmbColorId").val();

            var factoryId = $("#cmbFactoryId").val();
            if (factoryId == "") {
                factoryId = 0;
            }
            var itemId = $("#cmbItemId").val();
            if (itemId == "") {
                itemId = 0;
            }
            var uoMId = $("#cmbUoMId").val();
            if (uoMId == "") {
                uoMId = 0;
            }
            var sizeId = $("#cmbSizeId").val();
            if (sizeId == "") {
                sizeId = 0;
            }
            var colorId = $("#cmbColorId").val();
            if (colorId == "") {
                colorId = 0;
            }
            CreateProductPurchaseHelper.loadProductDropDown(factoryId, itemId, uoMId, sizeId, colorId);
        });


        // My working to load a single porduct all  information through the text boxes or othre fields.And any change of "Search Product" Dropdown,two div  "divProductPurchaseDetails" and div "divSaveAndClear" will be shown whose will hide while page load.


        $('#cmbProductId').change(function () {
            debugger;
            var productId = parseInt($("#cmbProductId").val());

            var div = document.getElementById("divProductPurchaseDetails");
            //if ((div.style.display !== 'none') && (productId > 0)) {
            //    // div.style.display = 'none';
            //    $("#divProductPurchaseDetails").hide();
            //    $("#divSaveAndClear").hide();
            //}
            //else {
            //    //   div.style.display = 'block';
            //    $("#divProductPurchaseDetails").show();
            //    $("#divSaveAndClear").show();

            //}
            $("#divProductPurchaseDetails").show(1000);
            CreateProductPurchaseManager.loadASingleProductDetails(productId);
        });


        // To auto show factory varcode to main barcode; also reaload the main barcode and factory barcode.

      
        //////1.a
        //$("#txtProductFactoryBarcode").click(function () {
        //    $("#txtProductMainBarcode").val('');
        //    $("#txtProductFactoryBarcode").val('');

        //    $("#txtProductFactoryBarcode").on("input", function () {
        //        $('#txtProductMainBarcode').val($('#txtProductFactoryBarcode').val());
        //    });
        //});

        //////1.b
        //$("#btnReloadProductMainBarcode").click(function () {
        //    $('#txtProductMainBarcode').val(porductMainBarcode);
        //    $('#txtProductFactoryBarcode').val(productFactoryBarcode);
        //});




    },

    loadProductDropDown: function (factoryId, itemId, uoMId, sizeId, colorId) {
        var productData = CreateProductPurchaseManager.loadProductDropDownData(factoryId, itemId, uoMId, sizeId, colorId);
        debugger;
        //  $("#cmbProductId").val('').trigger("change");
        // $("#cmbProductId").select2("destroy");
        if (a != 0) {
            $("#cmbProductId").select2('destroy');
            //   $("#cmbProductId").select2("open");
            //   $("#cmbProductId").select2('data', null);
        }
        a = 2;

        $('#cmbProductId').html('').select2({
            placeholder: "Select a product",
            data: { id: null, text: null }
        });
        $("#cmbProductId").select2({
            placeholder: "Select a product",
            data: productData
        });


    },

    loadFactoryNameDropDown: function () {
        var factoryNameData = CreateProductPurchaseManager.loadFactoryNameDropDownData();

        $("#cmbFactoryId").select2({
            placeholder: "Select a Factory",
            data: factoryNameData
        });
    },
    loadItemCodeDropDown: function () {
        var itemCodeData = CreateProductPurchaseManager.loadItemCodeDropDownData();

        $("#cmbItemId").select2({
            placeholder: "Select an Item",
            data: itemCodeData


        });
    },
    loadSizeCodeDropDown: function () {
        var sizeCodeData = CreateProductPurchaseManager.loadSizeCodeDropDownData();

        $("#cmbSizeId").select2({
            placeholder: "Select a Size",
            data: sizeCodeData

        });
    },
    loadColorCodeDropDown: function () {
        var colorCodeData = CreateProductPurchaseManager.loadColorCodeDropDownData();

        $("#cmbColorId").select2({
            placeholder: "Select a Color",
            data: colorCodeData

        });
    },


    loadUoMCodeDropDown: function () {
        var uomCodeData = CreateProductPurchaseManager.loadUoMCodeDropDownData();

        $("#cmbUoMId").select2({
            placeholder: "Select a Unit",
            data: uomCodeData

        });
    },



    popupInit: function () {


    },

    ClearProductPurchaseForm: function () {


        $('#hdnProductPurchaseId').val(0);
        $("#cmbFactoryId").val('').trigger("change");
        $("#cmbItemId").val('').trigger("change");
        $("#cmbSizeId").val('').trigger("change");
        $("#cmbColorId").val('').trigger("change");
        $("#cmbUoMId").val('').trigger("change");
        $("#txtProductPurchaseDate").val('').trigger("change");
        $("#txtProductCode").val('');
        $("#txtProductName").val('');
        $("#txtProductMainBarcode").val('');
        $("#txtProductFactoryBarcode").val('');
        porductMainBarcode = '';
        productFactoryBarcode = '';
        $("#txtMinimumStock").val('');
        $("#txtCurrentStock").val('');
        $("#txtPurchaseQuantity").val('');
        $("#txtNewStock").val('');
        $("#txtCostPrice").val('');
        $("#txtWholeSalePrice").val('');
        $("#txtRetailPrice").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

    },

    GetProductPurchaseData: function () {


        var aObj = new Object();

        aObj.ProductPurchaseId = $('#hdnProductPurchaseId').val();
        aObj.FactoryId = $("#cmbFactoryId").val();
        aObj.ItemId = $("#cmbItemId").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.ColorId = $("#cmbColorId").val();
        aObj.UoMId = $("#cmbUoMId").val();
        aObj.ProductCode = $("#txtProductCode").val();
        aObj.ProductName = $("#txtProductName").val();
        aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        aObj.ProductFactoryBarcode = $("#txtProductFactoryBarcode").val();
        aObj.MinimumStock = $("#txtMinimumStock").val();
        aObj.CurrentStock = $("#txtCurrentStock").val();
        aObj.NewStock = $("#txtNewStock").val();
        aObj.PurchaseQuantity = $("#txtPurchaseQuantity").val();
        aObj.CostPrice = $("#txtCostPrice").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();

        //alert("Save Product Purchase Informaiton");
        //alert(JSON.stringify(aObj));              ////To check data pass through object or not


        aObj.ProductPurchaseIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;

    },


    LoadAProductDetailsData: function (aObj) {

        debugger;
        CreateProductPurchaseHelper.ClearProductPurchaseForm();

        $("#txtProductMainBarcode").val(aObj.result[0].ProductMainBarcode);
        $("#txtProductFactoryBarcode").val(aObj.result[0].ProductFactoryBarcode);

        porductMainBarcode = $("#txtProductMainBarcode").val();   //These two(porductMainBarcode,productFactoryBarcode) variable are used when "Reload"(Beside of Factory Main Barcode) button is pressed.
        productFactoryBarcode = $("#txtProductFactoryBarcode").val();

        $("#txtProductCode").val(aObj.result[0].ProductCode);
        $("#txtProductName").val(aObj.result[0].ProductName);
        $("#txtMinimumStock").val(aObj.result[0].MinimumStock);
        $("#txtCostPrice").val(aObj.result[0].CostPrice);
        $("#txtWholeSalePrice").val(aObj.result[0].WholeSalePrice);
        $("#txtRetailPrice").val(aObj.result[0].RetailPrice);


        $("#cmbFactoryId").val(aObj.result[0].FactoryId).trigger("change");
        //$("#cmbItemId").val(aObj.result[0].ItemId).trigger("change");
        //$("#cmbSizeId").val(aObj.result[0].SizeId).trigger("change");
        //$("#cmbColorId").val(aObj.result[0].ColorId).trigger("change");
        //$("#cmbUoMId").val(aObj.result[0].UoMId).trigger("change");
        $("#txtProductPurchaseDate").val(aObj.result[0].ProductPurchaseDate).trigger("change");

        //if (aObj.result[0].IsActive == 1) {
        //    $("#chkIsActive").prop('checked', 'checked');
        //} else  {
        //    $("#chkIsActive").removeProp('checked', 'checked');
        //}

        //alert(JSON.stringify(aObj));

    }

}