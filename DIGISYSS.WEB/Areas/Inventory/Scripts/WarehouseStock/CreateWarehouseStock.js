
var CreateWarehouseStockManager = {
    SaveWarehouseStock: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/WarehouseStock/CreateWarehouseStock",
            data: JSON.stringify(CreateWarehouseStockHelper.GetWarehouseStockData()),
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
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    viewWarehouseStockManager.GetWarehouseStockDataTable();
                    CreateWarehouseStockHelper.ClearWarehouseStockForm();
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
        debugger;
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
};

var CreateWarehouseStockHelper = {

    CreateWarehouseStockInit: function () {

        $("#btnSaveWarehouseStock").click(function () {
            debugger;
            alert("Save Button Is disabled");
            //CreateWarehouseStockManager.SaveWarehouseStock();
        });

        $("#btnClearWarehouseStockForm").click(function () {
            $("#btnSaveWarehouseStock").Text = "Update";
            CreateWarehouseStockHelper.ClearWarehouseStockForm();
        });
    },

    loadProductsDropDown: function () {
        var productName = CreateWarehouseStockManager.loadProductsForDropDown();
        debugger;
        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },

    popupInit: function () {
        debugger;
    },

    ClearWarehouseStockForm: function () {
        debugger;
        $('#hdnWarehouseStockId').val(0);
        $("#cmbWarehouseId").val('').trigger("change");
        $("#txtWarehouseName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductName").val('');
        $("#cmbAdjustedReason").val('').trigger("change");
        $("#txtWarehouseStockQuantity").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetWarehouseStockData: function () {
        var aObj = new Object();
        aObj.WarehouseStockId = $('#hdnWarehouseStockId').val();
        aObj.ProductId = $('#cmbProductId').val();
        aObj.ProductName = $('#cmbProductName').val();
        aObj.WarehouseStockCode = $('#txtProductName').val();
        aObj.WarehouseStockName = $("#txtWarehouseName").val();

        aObj.WarehouseId = $("#txtWarehouseId").val();
        
        aObj.AdjustedReasonId = $("#cmbAdjustedReasonId").val();
        aObj.AdjustedReason = $("#cmbAdjustedReason").val();
        aObj.Note = $("#cmbAdjustedReason").val();
        aObj.WarehouseStockDetails = $("#txtWarehouseStockQuantity").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0; 
        
        if ((aObj.Note) === 'Damage') {aObj.InOut = 2;}
        else if ((aObj.Note) === 'Overflow') {aObj.InOut = 1;}
        else {aObj.InOut = 2;}

        return aObj;
    },
};