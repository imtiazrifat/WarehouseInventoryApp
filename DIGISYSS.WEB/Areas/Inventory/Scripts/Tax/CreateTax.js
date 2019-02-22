
var CreateTaxManager = {
    SaveTax: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetTaxHelper.GetData(), createAssetTaxHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/Tax/CreateTax",
            data: JSON.stringify(CreateTaxHelper.GetTaxData()),
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

                    viewTaxManager.GetTaxDataTable();
                    //CreateTaxHelper.ClearForm();
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
var CreateTaxHelper = {

    CreateTaxInit: function () {

        $("#btnSaveTax").click(function () {
            debugger;
            CreateTaxManager.SaveTax();

        });
        $("#btnClearTaxForm").click(function () {
            CreateTaxHelper.ClearForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnTaxId').val(0);
        $("#txtTaxCode").val('');
        $("#txtTaxName").val('');
        $("#txtPercentAmount").val('');
        $("#txtFixedAmount").val('');
        //$("#txtStudentCode").val('');

        //$("#txtPhone").val('');
        //$("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetTaxData: function () {
        var aObj = new Object();
        aObj.TaxId = $("#hdnTaxId").val();
        aObj.TaxCode = $("#txtTaxCode").val();
        aObj.TaxName = $('#txtTaxName').val();
        aObj.PercentAmount = $('#txtPercentAmount').val();
        aObj.FixedAmount = $('#txtFixedAmount').val();

        //aObj.Address = $("#txtTaxCode").val();
        //aObj.Phone = $("#txtPhone").val();
        //aObj.Note = $("#taNote").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },
    

};