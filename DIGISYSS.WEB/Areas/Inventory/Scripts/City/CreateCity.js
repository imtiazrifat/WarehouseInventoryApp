
var CreateCityManager = {
    SaveCity: function () {
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
            url: "/Inventory/City/CreateCity",
            data: JSON.stringify(CreateCityHelper.GetCityData()),
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

                    viewCityManager.GetCityDataTable();
                    CreateCityHelper.ClearCityForm();
                    
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
var CreateCityHelper = {

    CreateCityInit: function () {

        $("#btnSaveCity").click(function () {
            debugger;
            CreateCityManager.SaveCity();

        });
        $("#btnClearCityForm").click(function () {
            CreateCityHelper.ClearCityForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearCityForm: function () {
        debugger;

        $('#hdnCityId').val(0);
        $("#txtCityName").val('');
        $("#txtCityDetails").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

       
        
    },

    GetCityData: function () {
        var aObj = new Object();

        aObj.CityId = $('#hdnCityId').val();
        aObj.CityName = $("#txtCityName").val();
        aObj.CityDetails = $("#txtCityDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;


        return aObj;
    },
    //populateCityDataForEditButton: function (aObj) {
    //    debugger;

    //    createCityHelper.ClearCityForm();
    //    $('#hdnCityId').val(aObj.CityId);
    //    $("#txtCityName").val(aObj.CityName);
    //    $("#txtCityDetails").val(aObj.CityDetails);
        
       

        
    //},

};