var viewASingleProducDataOfOutletPOManager = {
    UpdteASingleProducDataOfOutletPO: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPO/UpdateASingleProducDataOfOutletPO",
            data: JSON.stringify(UpdateASingleProducDataOfOutletPOHelper.GetOutletPODataForUpdate()),
            
            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    viewOutletPOManager.GetOutletPODataForUpdate();
                    CreateOutletPOHelper.ClearOutletPOForm();
                    viewAllOutletPOManager.GetAllOutletPODataTable();
                    viewIndividualyOutletPOManager.GetIndividualyOutletPODataTable();
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

    getASingleProducDataOfOutletPO: function (OutletPODetailsId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletPO/GetASingleProducDataOfOutletPO',
            data: { OutletPODetailsId: OutletPODetailsId },
            success: function (response, textStatus) {
                debugger;
                if (response.data[0] != null) {
                    // alert("get a single 111");
                    //alert(JSON.stringify(response));
                    $("#hdnProductId").val(response.data[0].ProductId);
                    $("#hdnOutletPOMasterId").val(response.data[0].OutletPOMasterId);
                    $("#hdnOutletPODetailsId").val(response.data[0].OutletPODetailsId);
                    $("#txtProductName").val(response.data[0].ProductName);
                    $("#txtRetailPrice").val(response.data[0].RetailPrice);
                    $("#txtProductQuantity").val(response.data[0].ProductQuantity);
                    $("#txtItemName").val(response.data[0].ItemName);
                    $("#txtSize").val(response.data[0].SizeName);
                    $("#txtUoM").val(response.data[0].UoMShortName);
                    $("#txtBarcode").val(response.data[0].ProductMainBarcode);
                    $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                    $("#txtProductQuantity").on("input", function () {
                        $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
                    });
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },
}


var UpdateASingleProducDataOfOutletPOHelper = {

    CreateASingleProducDataOfOutletPOInit: function () {

        $("#btnUpdateProduct").click(function () {
            debugger;
            viewASingleProducDataOfOutletPOManager.UpdteASingleProducDataOfOutletPO();
            viewIndividualyOutletPOManager.GetIndividualyOutletPODataTable();
        });

        $("#btnClearASingleProducDataOfOutletPOForm").click(function () {
            UpdateASingleProducDataOfOutletPOHelper.ClearASingleProducDataOfOutletPOForm();
        });
    },

    popupInit: function () {
        debugger;
    },

  

    GetOutletPODataForUpdate: function () {
        var aObj = new Object();
        debugger;
        aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
        aObj.OutletPODetailsId = $("#hdnOutletPODetailsId").val();
        aObj.OutletId = $("#hdnOutletId").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
         //alert(JSON.stringify(aObj));             ////To check data pass through to object or not

        return aObj;
    },

    ClearASingleProducDataOfOutletPOForm: function () {
        debugger;
        $('#hdnOutletPOMasterId').val(0);
        $('#hdnOutletPODetailsId').val(0);
        $('#hdnProductId').val(0);
        $("#hdnProductId").val('');
        $("#hdnOutletPOMasterId").val('');
        $("#hdnOutletPODetailsId").val('');
        $("#txtProductName").val('');
        $("#txtRetailPrice").val('');
        $("#txtProductQuantity").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
    },
}
