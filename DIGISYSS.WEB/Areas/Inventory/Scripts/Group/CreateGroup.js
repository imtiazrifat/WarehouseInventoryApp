
var CreateGroupManager = {
    SaveGroup: function () {
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
            url: "/Inventory/Group/CreateGroup",
            data: JSON.stringify(CreateGroupHelper.GetGroupData()),
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

                    viewGroupManager.GetGroupDataTable();
                    CreateGroupHelper.ClearGroupForm();

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
var CreateGroupHelper = {

    CreateGroupInit: function () {

        $("#btnSaveGroup").click(function () {
            debugger;
            CreateGroupManager.SaveGroup();

        });
        $("#btnClearGroupForm").click(function () {
            CreateGroupHelper.ClearGroupForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearGroupForm: function () {
        debugger;
        $('#hdnGroupId').val(0);
        $("#cmbCategoryId").val('').trigger('change');
        $("#txtGroupCode").val('');
        $("#txtGroupName").val('');
        $("#txtGroupDetails").val('');

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

    },

    GetGroupData: function () {
        var aObj = new Object();

        aObj.GroupId = $('#hdnGroupId').val();
        aObj.GroupCode = $("#txtGroupCode").val();
        //aObj.CategoryId = $("#cmbCategoryId").val();
        aObj.GroupName = $("#txtGroupName").val();
        aObj.GroupDetails = $("#txtGroupDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;
    },
  

};