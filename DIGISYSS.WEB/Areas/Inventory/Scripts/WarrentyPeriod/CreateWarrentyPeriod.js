
var CreateWarrentyPeriodManager = {
    SaveWarrentyPeriod: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetWarrentyPeriodHelper.GetData(), createAssetWarrentyPeriodHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/WarrentyPeriod/CreateWarrentyPeriod",
            data: JSON.stringify(CreateWarrentyPeriodHelper.GetWarrentyPeriodData()),
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

                    viewWarrentyPeriodManager.GetWarrentyPeriodDataTable();
                    //CreateWarrentyPeriodHelper.ClearForm();
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
var CreateWarrentyPeriodHelper = {

    CreateWarrentyPeriodInit: function () {

        $("#btnSaveWarrentyPeriod").click(function () {
            debugger;
            CreateWarrentyPeriodManager.SaveWarrentyPeriod();

        });
        $("#btnClearWarrentyPeriodForm").click(function () {
            CreateWarrentyPeriodHelper.ClearForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnWarrentyPeriodId').val(0);
        $("#txtWarrentyPeriodName").val('');
        $("#txtWarrentyDays").val('');
        $("#txtWarrentyDetails").val('');
       
        //$("#txtStudentCode").val('');

        //$("#txtPhone").val('');
        //$("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetWarrentyPeriodData: function () {
        var aObj = new Object();
        aObj.WarrentyPeriodId = $("#hdnWarrentyPeriodId").val();
        aObj.WarrentyName = $("#txtWarrentyPeriodName").val();
        aObj.WarrentyDays = $('#txtWarrentyDays').val();
        aObj.WarrentyDetails = $('#txtWarrentyDetails').val();
        

        //aObj.Address = $("#txtWarrentyPeriodCode").val();
        //aObj.Phone = $("#txtPhone").val();
        //aObj.Note = $("#taNote").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },


};