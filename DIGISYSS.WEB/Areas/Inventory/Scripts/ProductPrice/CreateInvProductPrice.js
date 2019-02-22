
var CreateInvProductManager = {
    SaveInvProduct: function () {
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
            url: "/Inventory/InvProduct/CreateInvProduct",
            data: JSON.stringify(CreateInvProductHelper.GetInvProductData()),
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

                    viewInvProductManager.GetInvProductDataTable();
                    CreateInvProductHelper.ClearInvProductForm();
                    
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


}

var CreateInvProductHelper = {

    CreateInvProductInit: function () {

        $("#btnSaveInvProduct").click(function () {
            debugger;
            CreateInvProductManager.SaveInvProduct();

        });
        $("#btnClearInvProductForm").click(function () {
            CreateInvProductHelper.ClearInvProductForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearInvProductForm: function () {
        debugger;
        $('#hdnSysProductId').val(0);
        $('#hdnProductCode').val();
        $("#txtProductName").val('');
        $("#txtProductDetails").val('');       

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
        
    },

    GetInvProductData: function () {
        var aObj = new Object();
        
        aObj.ProductCode = $('#txtProductCode').val();
        aObj.ProductName = $("#txtProductName").val();
        aObj.ProductDetails = $("#txtProductDetails").val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;        

        return aObj;
    },
    populateInvProductDataForEditButton: function (aObj) {
        debugger;

        createInvProductHelper.ClearInvProductForm();
        $('#hdnSysProductId').val(aObj.SysProductId);
        $("#txtProductCode").val(aObj.ProductCode);
        $("#txtProductName").val(aObj.ProductName);
        $("#txtProductDetails").val(aObj.ProductDetails);        
        
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else  {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        
    },

}