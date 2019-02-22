
var CreateColorManager = {
    SaveColor: function () {
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
            url: "/Inventory/Color/CreateColor",
            data: JSON.stringify(CreateColorHelper.GetColorData()),
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

                    viewColorManager.GetColorDataTable();
                    CreateColorHelper.ClearColorForm();
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

var CreateColorHelper = {

    CreateColorInit: function () {

        $("#btnSaveColor").click(function () {
            debugger;
            CreateColorManager.SaveColor();
            });

        $("#btnClearColorForm").click(function () {
            $("#btnSaveColor").Text = "Update";
            CreateColorHelper.ClearColorForm();
        });
    },

    popupInit: function () {
        debugger;
    },

    ClearColorForm: function () {
        debugger;
        $('#hdnColorId').val(0);
        $('#txtColorCode').val('');
        $("#txtColorName").val('');
        $("#txtColorDetails").val(''); 
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetColorData: function () {
        debugger;
        var aObj = new Object();
        aObj.ColorId = $('#hdnColorId').val();
        aObj.ColorCode = $('#txtColorCode').val();
        aObj.ColorName = $("#txtColorName").val();
        aObj.ColorDetails = $("#txtColorDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;        

        return aObj;
    },
};