
var CreateUoMManager = {
    SaveUoM: function () {
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
            url: "/Inventory/UoM/CreateUoM",
            data: JSON.stringify(CreateUoMHelper.GetUoMData()),
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

                    viewUoMManager.GetUoMDataTable();
                    CreateUoMHelper.ClearUoMForm();
                    
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
var CreateUoMHelper = {

    CreateUoMInit: function () {

        $("#btnSaveUoM").click(function () {
            debugger;
            CreateUoMManager.SaveUoM();

        });
        $("#btnClearUoMForm").click(function () {
            CreateUoMHelper.ClearUoMForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearUoMForm: function () {
        debugger;
        $('#hdnUoMId').val(0);
        $('#txtUoMCode').val();
        $("#txtUoMShortName").val('');
        $("#txtUoMDetails").val('');       

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
        
    },

    GetUoMData: function () {
        var aObj = new Object();
        aObj.UoMId = $('#hdnUoMId').val();
        aObj.UoMCode = $('#txtUoMCode').val();
        aObj.UoMShortName = $("#txtUoMShortName").val();
        aObj.UoMDetails = $("#txtUoMDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;        

        return aObj;
    },
    //populateUoMDataForEditButton: function (aObj) {
    //    debugger;

    //    createUoMHelper.ClearUoMForm();
    //    $('#hdnUoMId').val(aObj.SysUoMId);
    //    $("#txtUoMCode").val(aObj.UoMCode);
    //    $("#txtUoMShortName").val(aObj.UoMShortName);
    //    $("#txtUoMDetails").val(aObj.UoMDetails);        
        
    //    if (aObj.IsActive == 1) {
    //        $("#chkIsActive").prop('checked', 'checked');
    //    } else  {
    //        $("#chkIsActive").removeProp('checked', 'checked');
    //    }

        
    //},

};