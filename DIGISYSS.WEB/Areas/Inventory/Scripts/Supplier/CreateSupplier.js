
var CreateSupplierManager = {
    SaveSupplier: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetSupplierHelper.GetData(), createAssetSupplierHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/Supplier/CreateSupplier",
            data: JSON.stringify(CreateSupplierHelper.GetSupplierData()),
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

                    viewSupplierManager.GetSupplierDataTable();
                    //CreateSupplierHelper.ClearForm();
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
var CreateSupplierHelper = {

    CreateSupplierInit: function () {

        $("#btnSaveSupplier").click(function () {
            debugger;
            CreateSupplierManager.SaveSupplier();
        });
        $("#btnClearSupplierForm").click(function () {
            CreateSupplierHelper.ClearForm();
        });
    },


    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnSupplierId').val(0);
        $("#txtSupplierCode").val('');
        $("#txtSupplierName").val('');
        $("#txtSupplierDetails").val('');
        $("#txtSupplierNumber").val('');
        $("#txtAddressCode").val('');
        $("#txtEx1").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetSupplierData: function () {
        var aObj = new Object();
        aObj.SupplierId = $('#hdnSupplierId').val();
        aObj.SupplierCode = $("#txtSupplierCode").val();
        aObj.SupplierName = $('#txtSupplierName').val();
        aObj.SupplierDetails = $('#txtSupplierDetails').val();
        aObj.SupplierNumber = $('#txtSupplierNumber').val();
        aObj.AddressCode = $('#txtAddressCode').val();
        aObj.Ex1 = $('#txtEx1').val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },
};