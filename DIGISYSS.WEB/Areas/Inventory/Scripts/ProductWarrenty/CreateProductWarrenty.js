/// <reference path="CreateProductWarrenty.js" />

var CreateProductWarrentyManager = {
    SaveProductWarrenty: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetProductWarrentyHelper.GetData(), createAssetProductWarrentyHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/ProductWarrenty/CreateProductWarrenty",
            data: JSON.stringify(CreateProductWarrentyHelper.GetProductWarrentyData()),
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

                    viewProductWarrentyManager.GetProductWarrentyDataTable();
                    //CreateProductWarrentyHelper.ClearForm();
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
var CreateProductWarrentyHelper = {

    CreateProductWarrentyInit: function () {

        $("#btnSaveProductWarrenty").click(function () {
            debugger;
            CreateProductWarrentyManager.SaveProductWarrenty();

        });
        $("#btnClearProductWarrentyForm").click(function () {
            CreateProductWarrentyHelper.ClearForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnProductWarrentyId').val(0);
        $("#txtProductId").val('');
        $('#chkIsReplacementWarrenty').removeAttr('checked', 'checked');
        $("#txtWarrentyPeriodId").val('');
        $("#txtWarrentyExpireDate").val('');
        $("#txtServicePeriod").val('');
        $("#txtWarrentyDescription").val('');
        $("#txtEx1").val('');
        //$("#txtStudentCode").val('');

        //$("#txtPhone").val('');
        //$("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
        $('#chkIsReplacementWarrenty').removeAttr('checked', 'checked');
    },

    GetProductWarrentyData: function () {
        var aObj = new Object();
        aObj.ProductWarrentyId = $("#hdnProductWarrentyId").val();
        aObj.ProductId = $("#txtProductId").val();
        aObj.IsReplacementWarrenty = $("#chkIsReplacementWarrenty").is(":checked") == true ? 1 : 0;
        aObj.WarrentyPeriodId = $('#txtWarrentyPeriodId').val();
        aObj.WarrentyExpireDate = $('#txtWarrentyExpireDate').val();
        aObj.ServicePeriod = $('#txtServicePeriod').val();
        aObj.WarrentyDescription = $('#txtWarrentyDescription').val();
        aObj.Ex1 = $('#txtEx1').val();

        //aObj.Address = $("#txtProductWarrentyCode").val();
        //aObj.Phone = $("#txtPhone").val();
        //aObj.Note = $("#taNote").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },


};