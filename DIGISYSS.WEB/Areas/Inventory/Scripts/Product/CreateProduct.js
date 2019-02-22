var porductMainBarcode;
var productFactoryBarcode;

var CreateProductManager = {
    SaveProductDetails: function () {


        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/Product/CreateProductDetails",
            data: JSON.stringify(CreateProductHelper.GetProductDetailsData()),
            //success: function (returnPayload) {
            //    debugger;
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {
                debugger;
                if (response != null) {
                    //$("#myModal #modal-body #rif").html(response.data.Message);
                    //$('#myModal').appendTo("body").modal('show');

                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    viewProductManager.GetProductDataTable();
                    CreateProductHelper.ClearProductForm();
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
        debugger;
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    loadItemCodeDropDownData: function () {
     debugger;
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    loadSizeCodeDropDownData: function () {
        debugger;
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    loadColorCodeDropDownData: function () {
        debugger;
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },


    loadUoMCodeDropDownData: function () {
     debugger;
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },

    loadBarcodeData: function (itemId, sizeId) {
        debugger;
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            //  data: JSON.stringify({ itemId: itemId, sizeId: sizeId }),
            data: {
                itemId: itemId, sizeId: sizeId
            },
            async: false,
            url: '/Inventory/Product/GenarateBarcode',
            success: function (response, textStatus) {
                debugger;
                b = response.result;
                // txtProductMainBarcode
                $("#txtProductMainBarcode").val(b);
                porductMainBarcode = $("#txtProductMainBarcode").val(b);
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    }
};

var CreateProductHelper = {

    CreateProductInit: function () {

        $("#btnSaveProduct").click(function () {
            debugger;
            CreateProductManager.SaveProductDetails();
        });

        $("#btnClearProductForm").click(function () {
            CreateProductHelper.ClearProductForm();
        });

        CreateProductHelper.loadFactoryNameDropDown();
        CreateProductHelper.loadItemCodeDropDown();
        CreateProductHelper.loadSizeCodeDropDown();
        CreateProductHelper.loadColorCodeDropDown();
        CreateProductHelper.loadUoMCodeDropDown();

        $("#txtProductFactoryBarcode").click(function () {
            $("#txtProductMainBarcode").val('');
            $("#txtProductFactoryBarcode").val('');
            $("#txtProductFactoryBarcode").on("input", function () {
                $('#txtProductMainBarcode').val($('#txtProductFactoryBarcode').val());
            });
        });

        $("#btnReloadProductMainBarcode").click(function () {
            $('#txtProductMainBarcode').val(porductMainBarcode);
            $('#txtProductFactoryBarcode').val(productFactoryBarcode);
        });

        //Rifat 20 Jan 17 Barcode Genaration Start
        $('#cmbItemId,#cmbSizeId').change(function () {
            debugger;
            var itemId = $("#cmbItemId").val();
            var sizeId = $("#cmbSizeId").val();
            if (itemId != "" && sizeId != "") {
                CreateProductManager.loadBarcodeData(itemId, sizeId);
            }
        });


        $("#btnReloadProductMainBarcode").click(function () {
            debugger;
            var itemId = $("#cmbItemId").val();
            var sizeId = $("#cmbSizeId").val();
            if (itemId != "" && sizeId != "") {
                CreateProductManager.loadBarcodeData(itemId, sizeId);
            }
        });
    },


    loadFactoryNameDropDown: function () {
        debugger;
        var factoryNameData = CreateProductManager.loadFactoryNameDropDownData();
        $("#cmbFactoryId").select2({
            placeholder: "Select  a Factory",
            data: factoryNameData
        });
    },

    loadItemCodeDropDown: function () {
     debugger;
        var itemCodeData = CreateProductManager.loadItemCodeDropDownData();
        $("#cmbItemId").select2({
            placeholder: "Select an Item",
            data: itemCodeData
        });
    },

    loadSizeCodeDropDown: function () {
     debugger;
        var sizeCodeData = CreateProductManager.loadSizeCodeDropDownData();
        $("#cmbSizeId").select2({
            placeholder: "Select a Size",
            data: sizeCodeData
        });
    },

    loadColorCodeDropDown: function () {
        debugger;
        var colorCodeData = CreateProductManager.loadColorCodeDropDownData();
        $("#cmbColorId").select2({
            placeholder: "Select a Color",
            data: colorCodeData
        });
    },

    loadUoMCodeDropDown: function () {
     debugger;
        var uomCodeData = CreateProductManager.loadUoMCodeDropDownData();
        $("#cmbUoMId").select2({
            placeholder: "Select a UoM",
            data: uomCodeData
        });
    },

    popupInit: function () {
    debugger;
    },

    ClearProductForm: function () {
        debugger;
        $('#hdnProductId').val(0);
        $('#hdnProductPriceId').val(0);
        $("#txtProductCode").val('');
        $("#txtProductName").val('');
        $("#cmbFactoryId").val('').trigger("change");
        $("#cmbItemId").val('').trigger("change");
        $("#cmbSizeId").val('').trigger("change");
        $("#cmbColorId").val('').trigger("change");
        $("#cmbUoMId").val('').trigger("change");
        $("#txtProductMainBarcode").val('');
        $("#txtProductFactoryBarcode").val('');
        porductMainBarcode = '';
        productFactoryBarcode = '';
        $("#txtMinimumStock").val('');
        $("#txtCostPrice").val('');
        $("#txtWholeSalePrice").val('');
        $("#txtRetailPrice").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },


    GetProductDetailsData: function () {
        debugger;
        var aObj = new Object();

        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductPriceId = $('#hdnProductPriceId').val();
        aObj.ProductCode = $("#txtProductCode").val();
        aObj.ProductName = $("#txtProductName").val();
        aObj.FactoryId = $("#cmbFactoryId").val();
        aObj.ItemId = $("#cmbItemId").val();
        aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
        aObj.ProductFactoryBarcode = $("#txtProductFactoryBarcode").val();
        aObj.MinimumStock = $("#txtMinimumStock").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.ColorId = $("#cmbColorId").val();
        aObj.UoMId = $("#cmbUoMId").val();
        aObj.CostPrice = $("#txtCostPrice").val();
        aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
        aObj.RetailPrice = $("#txtRetailPrice").val();
        aObj.ProductIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj; 
    },

};