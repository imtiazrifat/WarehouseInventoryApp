
var CreateItemManager = {
    SaveItem: function () {

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/Inventory/Item/CreateItem",
            data: JSON.stringify(CreateItemHelper.GetItemData()),
            //success: function (returnPayload) {
            //    
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {

                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    viewItemManager.GetItemDataTable();
                    CreateItemHelper.ClearItemForm();
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

    loadGroupCodeDropDownData: function () {
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/Group/GetAllGroupDd',
            success: function (response, textStatus) {
                b = response.result;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },
};

var CreateItemHelper = {
    CreateItemInit: function () {
        $("#btnSaveItem").click(function () {
            CreateItemManager.SaveItem();
        });

        $("#btnClearItemForm").click(function () {
            CreateItemHelper.ClearItemForm();
        });
        CreateItemHelper.loadGroupCodeDropDown();

    },
    loadGroupCodeDropDown: function () {
        var groupCodeData = CreateItemManager.loadGroupCodeDropDownData();

        $("#cmbGroupId").select2({
            placeholder:"Select a Group",
            data: groupCodeData
        });
    },
    popupInit: function () {


    },

    ClearItemForm: function () {
        $('#hdnItemId').val(0);
        $("#txtItemCode").val('');
        $("#txtItemName").val('');
        $("#cmbGroupId").val('').trigger("change");
        $("#txtItemDetails").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetItemData: function () {
        var aObj = new Object();

        aObj.ItemId = $('#hdnItemId').val();
        aObj.GroupCode = $('#cmbGroupId').val();
        aObj.ItemCode = $("#txtItemCode").val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.ItemDetails = $("#txtItemDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;
    },
};