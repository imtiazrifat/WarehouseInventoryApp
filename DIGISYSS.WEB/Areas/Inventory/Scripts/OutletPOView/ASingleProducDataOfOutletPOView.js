var ASingleProducDataOfOutletPOViewManager = {
    UpdteASingleProducDataOfOutletPOView: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPO/UpdateASingleProducDataOfOutletPOView",
            data: JSON.stringify(UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate()),

            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    UpdateASingleProducDataOfOutletPOViewHelper.ClearOutletPOViewForm();
                    UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate();
                    AllOutletPOViewManager.GetAllOutletPOViewDataTable();
                    IndividualOutletPOViewManager.GetIndividualOutletPOViewDataTable();
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

    getASingleProducDataOfOutletPOView: function (OutletPODetailsId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletPO/GetASingleProducDataOfOutletPOView',
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
                    $('#txtTempProductQuantity').val(response.data[0].ProductQuantity);
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


var UpdateASingleProducDataOfOutletPOViewHelper = {

    CreateASingleProducDataOfOutletPOViewInit: function () {

        $("#btnUpdateProduct").click(function () {
            debugger;
            //$("#myModalUpdte #modal-body #rif").html("Are you sure to Update Product Quantity?Click 'Yes' to update else 'No'.");
            //$('#myModalUpdte').appendTo("body").modal('show');
            //$("#btnYes").click(function () {

                ASingleProducDataOfOutletPOViewManager.UpdteASingleProducDataOfOutletPOView();
                AllOutletPOViewManager.GetAllOutletPOViewDataTable();
                IndividualOutletPOViewManager.GetIndividualOutletPOViewDataTable();
                UpdateASingleProducDataOfOutletPOViewHelper.ClearASingleProducDataOfOutletPOViewForm();
            //});

        });

        //$("#txtNewQuantity").click(function () {
        //    $("#txtNewQuantity").on("input", function () {
        //        var oldProductQuantity = parseFloat($("#txtTempProductQuantity").val());
        //        var newProductQuantity = parseFloat(($("#txtNewQuantity").val()));
        //        $("#txtProductQuantity").val(parseFloat(oldProductQuantity) + parseFloat(newProductQuantity));
        //    });
        //});

        $("#btnClearASingleProducDataOfOutletPOViewForm").click(function () {
            UpdateASingleProducDataOfOutletPOViewHelper.ClearASingleProducDataOfOutletPOViewForm();
        });
    },

    POViewpupInit: function () {
        debugger;
    },



    GetOutletPOViewDataForUpdate: function () {
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

    ClearASingleProducDataOfOutletPOViewForm: function () {
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
        $("#txtPriceAmount").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
        $("#txtNewQuantity").val('');
        
    },
}
