
var CreateDiscountManager = {
    SaveDiscount: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetDiscountHelper.GetData(), createAssetDiscountHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/Discount/CreateDiscount",
            data: JSON.stringify(CreateDiscountHelper.GetDiscountData()),
            
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);

                    $('#myModal').appendTo("body").modal('show');

                    viewDiscountManager.GetDiscountDataTable();
                    //CreateDiscountHelper.ClearForm();
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
var CreateDiscountHelper = {

    CreateDiscountInit: function () {

        $("#btnSaveDiscount").click(function () {
            debugger;
            CreateDiscountManager.SaveDiscount();

        });
        $("#btnClearDiscountForm").click(function () {
            CreateDiscountHelper.ClearForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearForm: function () {
        debugger;
        $('#hdnDiscountId').val(0);
        $("#txtDiscountCode").val('');
        $("#txtDiscountName").val('');
        $("#txtDiscountFixedAmount").val('');
        //$("#txtFixedAmount").val('');
        //$("#txtStudentCode").val('');

        //$("#txtPhone").val('');
        //$("#taNote").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetDiscountData: function () {
        var aObj = new Object();
        aObj.DiscountId = $('#hdnDiscountId').val();
        aObj.DiscountCode = $("#txtDiscountCode").val();
        aObj.DiscountName = $('#txtDiscountName').val();
        aObj.DiscountFixedAmount = $("#txtDiscountFixedAmount").val();
        //aObj.FixedAmount = $('#txtFixedAmount').val();

        //aObj.Address = $("#txtDiscountCode").val();
        //aObj.Phone = $("#txtPhone").val();
        //aObj.Note = $("#taNote").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        return aObj;
    },


};