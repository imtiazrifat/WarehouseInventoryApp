
var CreateWareHouseManager = {
    SaveWareHouse: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetWareHouseHelper.GetData(), createAssetWareHouseHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/WareHouse/CreateWarehouse",
            data: JSON.stringify(CreateWareHouseHelper.GetWareHouseData()),
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

                    viewWareHouseManager.GetWareHouseDataTable();
                    //CreateWareHouseHelper.ClearForm();
                    //viewDepartmentManager.GetDepartmentDataTable();
                    //createDepartmentHelper.ClearForm();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
            //   processData: false,
            //  async: false
        });

    }
};
var CreateWareHouseHelper = {

    CreateWareHouseInit: function () {

        $("#btnSaveWareHouse").click(function () {
            debugger;
            CreateWareHouseManager.SaveWareHouse();
        });
        $("#btnClearWareHouseForm").click(function () {
            CreateWareHouseHelper.ClearForm();
        });
    },


    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnWarehouseId').val(0);
        $("#txtWarehouseCode").val('');
        $("#txtWarehouseName").val('');
        $("#txtWarehouseDetails").val('');
        $("#txtWarehouseNumber").val('');
        $("#txtAddressCode").val('');
        $("#txtEx1").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetWareHouseData: function () {
        var aObj = new Object();
        aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.WarehouseCode = $("#txtWarehouseCode").val();
        aObj.WarehouseName = $('#txtWarehouseName').val();
        aObj.WarehouseDetails = $('#txtWarehouseDetails').val();
        aObj.WarehouseNumber = $('#txtWarehouseNumber').val();
        aObj.AddressCode = $('#txtAddressCode').val();
        aObj.Ex1 = $('#txtEx1').val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },
};