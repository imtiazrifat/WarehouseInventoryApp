
var CreateFactoryManager = {
    SaveFactory: function () {
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
            url: "/Inventory/Factory/CreateFactory",
            data: JSON.stringify(CreateFactoryHelper.GetFactoryData()),
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

                    viewFactoryManager.GetFactoryDataTable();
                    CreateFactoryHelper.ClearFactoryForm();

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
var CreateFactoryHelper = {

    CreateFactoryInit: function () {

        $("#btnSaveFactory").click(function () {
            debugger;
            CreateFactoryManager.SaveFactory();

        });
        $("#btnClearFactoryForm").click(function () {
            $("#btnSaveFactory").Text = "Update";
            CreateFactoryHelper.ClearFactoryForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearFactoryForm: function () {
        debugger;
        $('#hdnFactoryId').val(0);
        $("#txtFactoryName").val('');
        $("#txtFactoryCode").val('');
        $("#txtFactoryNumber").val('');
        $("#txtFactoryDetails").val('');

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

    },

    GetFactoryData: function () {
        var aObj = new Object();

        aObj.FactoryId = $('#hdnFactoryId').val();
        aObj.FactoryName = $("#txtFactoryName").val();
        aObj.FactoryCode = $("#txtFactoryCode").val();
        aObj.FactoryNumber = $("#txtFactoryNumber").val();
        aObj.FactoryDetails = $("#txtFactoryDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;
    },




    //populateFactoryDataForEditButton: function (aObj) {           //// Useless to add populateFactoryDataForEditButton here rateher add it to view to work
    //    debugger;

    //    createFactoryHelper.ClearFactoryForm();

    //    $('#hdnFactoryId').val(aObj.FactoryId);
    //    $("#txtFactoryCode").val(aObj.FactoryCode);
    //    $("#txtFactoryName").val(aObj.FactoryName);
    //    $("#txtFactoryDetails").val(aObj.FactoryDetails);        

    //    if (aObj.IsActive == 1) {
    //        $("#chkIsActive").prop('checked', 'checked');
    //    } else  {
    //        $("#chkIsActive").removeProp('checked', 'checked');
    //    }


    //},

};