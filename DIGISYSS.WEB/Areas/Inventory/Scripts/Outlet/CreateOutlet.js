
var CreateOutletManager = {
    SaveOutlet: function () {
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
            url: "/Inventory/Outlet/CreateOutlet",
            data: JSON.stringify(CreateOutletHelper.GetOutletData()),
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

                    viewOutletManager.GetOutletDataTable();
                    CreateOutletHelper.ClearOutletForm();
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
};

var CreateOutletHelper = {

    CreateOutletInit: function () {

        $("#btnSaveOutlet").click(function () {
            debugger;
            CreateOutletManager.SaveOutlet();

        });
        $("#btnClearOutletForm").click(function () {
            $("#btnSaveOutlet").Text = "Update";
            CreateOutletHelper.ClearOutletForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearOutletForm: function () {
        debugger;
        $('#hdnOutletId').val(0);
        $("#txtOutletName").val('');
        $("#txtOutletCode").val('');
        $("#txtOutletNumber").val('');
        $("#txtOutletRegistrationNumber").val('');
        $("#txtOutletDetails").val('');

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

    },

    GetOutletData: function () {
        var aObj = new Object();

        aObj.OutletId = $('#hdnOutletId').val();
        aObj.OutletName = $("#txtOutletName").val();
        aObj.OutletCode = $("#txtOutletCode").val();
        aObj.OutletNumber = $("#txtOutletNumber").val();
        aObj.OutletRegistrationNumber = $("#txtOutletRegistrationNumber").val();
        aObj.OutletDetails = $("#txtOutletDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;
    },




    //populateOutletDataForEditButton: function (aObj) {           //// Useless to add populateOutletDataForEditButton here rateher add it to view to work
    //    debugger;

    //    createOutletHelper.ClearOutletForm();

    //    $('#hdnOutletId').val(aObj.OutletId);
    //    $("#txtOutletCode").val(aObj.OutletCode);
    //    $("#txtOutletName").val(aObj.OutletName);
    //    $("#txtOutletDetails").val(aObj.OutletDetails);        

    //    if (aObj.IsActive == 1) {
    //        $("#chkIsActive").prop('checked', 'checked');
    //    } else  {
    //        $("#chkIsActive").removeProp('checked', 'checked');
    //    }


    //},

};