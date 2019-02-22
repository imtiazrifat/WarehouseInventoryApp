
var CreateDistrictManager = {
    SaveDistrict: function () {
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
            url: "/Inventory/District/CreateDistrict",
            data: JSON.stringify(CreateDistrictHelper.GetDistrictData()),
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

                    viewDistrictManager.GetDistrictDataTable();
                    CreateDistrictHelper.ClearDistrictForm();
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

var CreateDistrictHelper = {

    CreateDistrictInit: function () {

        $("#btnSaveDistrict").click(function () {
            debugger;
            CreateDistrictManager.SaveDistrict();
        });

        $("#btnClearDistrictForm").click(function () {
            CreateDistrictHelper.ClearDistrictForm();
        });
    },

    popupInit: function () {
        debugger;
    },

    ClearDistrictForm: function () {
        debugger;
        $('#hdnDistrictId').val(0);
        $("#cmbDistrictName").val('').trigger("change");
        $("#txtDistrictShortName").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetDistrictData: function () {
        var aObj = new Object();
        aObj.DistrictId = $('#hdnDistrictId').val();
        aObj.DistrictName = $("#cmbDistrictName").val();
        aObj.DistrictShortName = $("#txtDistrictShortName").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },  
};