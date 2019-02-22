
var CreateCategoryManager = {
    SaveCategory: function () {
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
            url: "/Inventory/Category/CreateCategory",
            data: JSON.stringify(CreateCategoryHelper.GetCategoryData()),
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

                    viewCategoryManager.GetCategoryDataTable();
                    //CreateCategoryHelper.ClearForm();
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
var CreateCategoryHelper = {

    CreateCategoryInit: function () {

        $("#btnSaveCategory").click(function () {
            debugger;
            CreateCategoryManager.SaveCategory();

        });
        $("#btnClearCategoryForm").click(function () {
            CreateCategoryHelper.ClearForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $("#hdnCategoryId").val(0);
        $("#txtCategoryCode").val('');
        $("#txtCategoryName").val('');
        $("#txtCategoryDetails").val('');
       
        //$("#txtStudentCode").val('');

        //$("#txtPhone").val('');
        //$("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetCategoryData: function () {
        var aObj = new Object();
        aObj.CategoryId = $("#hdnCategoryId").val();
        aObj.CategoryCode = $("#txtCategoryCode").val();
        aObj.CategoryName = $("#txtCategoryName").val();
        aObj.CategoryDetails = $("#txtCategoryDetails").val();
        

        //aObj.Address = $("#txtCategoryCode").val();
        //aObj.Phone = $("#txtPhone").val();
        //aObj.Note = $("#taNote").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },


};