
var CreateSizeManager = {
    SaveSize: function () {
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
            url: "/Inventory/Size/CreateSize",
            data: JSON.stringify(CreateSizeHelper.GetSizeData()),
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

                    viewSizeManager.GetSizeDataTable();
                    CreateSizeHelper.ClearForm();
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
var CreateSizeHelper = {

    CreateSizeInit: function () {

        $("#btnSaveSize").click(function () {
            debugger;
            CreateSizeManager.SaveSize();
        });
        $("#btnClearSizeForm").click(function () {
            CreateSizeHelper.ClearForm();
        });
    },

    popupInit: function () {
        debugger;
    },

    ClearForm: function () {
        debugger;
        $('#hdnSizeId').val(0);
        $("#txtSizeCode").val('');
        $("#txtSizeName").val('');
        $("#txtSizeDetails").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');        
    },

    GetSizeData: function () {

        var aObj = new Object();
        aObj.SizeId = $('#hdnSizeId').val();
        aObj.SizeCode = $("#txtSizeCode").val();
        aObj.SizeName = $("#txtSizeName").val();
        aObj.SizeDetails = $("#txtSizeDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;       
        return aObj;
    },
};