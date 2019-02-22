
var CreateProductReceiveManager = {
    SaveProductReceive: function () {
        

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/ProductReceive/CreateProductReceive",
            data: JSON.stringify(CreateProductReceiveHelper.GetProductReceiveData()),
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

                    viewProductReceiveManager.GetProductReceiveDataTable();
                    CreateProductReceiveHelper.ClearProductReceiveForm();
                    
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
                b = { id: 0, text: "No Data" };
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
                b = { id: 0, text: "No Data" };
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
                b = { id: 0, text: "No Data" };
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
                b = { id: 0, text: "No Data" };
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
                b = { id: 0, text: "No Data" };
            }
        });
        return b;

},

    
loadProductDropDownData: function (itemId, uoMId, sizeId, colorId) {
    debugger;
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            data: {
                itemId: itemId,
                uoMId: uoMId,
                sizeId: sizeId,
                colorId: colorId
            },
            url: ' /Inventory/ProductReceive/LoadAllProductDD',
            success: function (response, textStatus) {
                debugger;
                b = response.result;

            },
            error: function (textStatus, errorThrown) {
                debugger;
                b = { id: 0, text: "No Data" };
            }
        });
        return b;

},




//loadCurrentDate1: function () {
//    var d = new Date();
//    var todaydate = d.getDate() + '/' + month_name[d.getMonth()] + '/' + d.getFullYear();
//    return todaydate;

//},

};
var CreateProductReceiveHelper = {

    CreateProductReceiveInit: function () {

        $("#btnSaveProductReceive").click(function () {
            debugger;
            CreateProductReceiveManager.SaveProductReceive();

        });
        $("#btnClearProductReceiveForm").click(function () {
            CreateProductReceiveHelper.ClearProductReceiveForm();

        });
        CreateProductReceiveHelper.loadFactoryNameDropDown();
        CreateProductReceiveHelper.loadItemCodeDropDown();
        CreateProductReceiveHelper.loadSizeCodeDropDown();
        CreateProductReceiveHelper.loadColorCodeDropDown();
        CreateProductReceiveHelper.loadUoMCodeDropDown();
        CreateProductReceiveHelper.loadCurrentDate();


          


        //
        $('#cmbItemId,#cmbUoMId,#cmbSizeId,#cmbColorId').change(function () {
            debugger;
          //  var factoryId = $("#cmbFactoryId").val();
            //var itemId = $("#cmbItemId").val();
            //var uoMId = $("#cmbUoMId").val();
            //var sizeId = $("#cmbSizeId").val();
            //var colorId = $("#cmbColorId").val();


            //var factoryId = $("#cmbFactoryId").val();
            //if (factoryId == "") {
            //    factoryId = 0;
            //}



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
            CreateProductReceiveHelper.loadProductDropDown( itemId, uoMId, sizeId, colorId);
        });
    },
    
    loadProductDropDown: function ( itemId, uoMId, sizeId, colorId) {
        var productData = CreateProductReceiveManager.loadProductDropDownData( itemId, uoMId, sizeId, colorId);

        $("#cmbProductId").select2({
                    placeholder: "Select a Product",
                    data: productData
        });
    },

    loadFactoryNameDropDown: function () {
        var factoryNameData = CreateProductReceiveManager.loadFactoryNameDropDownData();

        $("#cmbFactoryId").select2({
                    placeholder: "Select a Factory",
                    data: factoryNameData
        });
    },
    loadItemCodeDropDown: function () {
        var itemCodeData = CreateProductReceiveManager.loadItemCodeDropDownData();

        $("#cmbItemId").select2({
                    placeholder: "Select an Item",
                    data: itemCodeData
                
     
        });
    },
    loadSizeCodeDropDown: function () {
        var sizeCodeData = CreateProductReceiveManager.loadSizeCodeDropDownData();

        $("#cmbSizeId").select2({
                    placeholder: "Select a Size",
                    data: sizeCodeData

        });
    },
    loadColorCodeDropDown: function () {
        var colorCodeData = CreateProductReceiveManager.loadColorCodeDropDownData();

        $("#cmbColorId").select2({
                    placeholder: "Select a Color",
                    data: colorCodeData

        });
    },


     loadUoMCodeDropDown: function () {
        var uomCodeData = CreateProductReceiveManager.loadUoMCodeDropDownData();

        $("#cmbUoMId").select2({
                    placeholder: "Select a State",
                    data: uomCodeData

        });
     },

     loadCurrentDate: function () {
         var uomCodeData = CreateProductReceiveManager.loadUoMCodeDropDownData();

         $("#cmbUoMId").select2({
                    placeholder: "Select a Unit",
                    data: uomCodeData

         });
     },


     loadCurrentDate1: function () {
         var currentDate = CreateProductReceiveManager.loadCurrentDate();

         $('#txtProductReceiveDate').datepicker({
             "setDate": new Date(),
             "autoclose": true
         });
     },

    popupInit: function () {
        debugger;

    },

    ClearProductReceiveForm: function () {
        debugger;
        
        $('#hdnProductReceiveId').val(0);
        $("#cmbFactoryId").val('').trigger("change");
        $("#cmbItemId").val('').trigger("change");
        $("#cmbSizeId").val('').trigger("change");
        $("#cmbColorId").val('').trigger("change");
        $("#cmbUoMId").val('').trigger("change");
        $("#txtProductReceiveDate").val('').trigger("change");
        $("#txtProductCode").val('');
        $("#txtProductName").val('');
        $("#txtProductMainBarcode").val('');
        $("#txtProductFactoryBarcode").val('');
        $("#txtMinimumStock").val('');
        $("#txtCurrentStock").val('');
        $("#txtPurchaseQuantity").val('');
        $("#txtNewStock").val('');
        $("#txtCostPrice").val('');
        $("#txtWholeSalePrice").val('');
        $("#txtRetailPrice").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
       
        },

    GetProductReceiveData: function () {
        debugger;
        
        var aObj = new Object();

        aObj.ProductReceiveId = $('#hdnProductReceiveId').val();
        aObj.FactoryId = $("#cmbFactoryId").val();
        aObj.ItemId = $("#cmbItemId").val();
        aObj.SizeId = $("#cmbSizeId").val();
        aObj.ColorId = $("#cmbColorId").val();
        aObj.UoMId = $("#cmbUoMId").val();
        aObj.ProductReceiveDate = $("#txtProductReceiveDate").val();
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
        //alert(JSON.stringify(aObj));              ////To check data pass or not through Object 
        

        aObj.ProductReceiveIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
       
        return aObj;

    },

};