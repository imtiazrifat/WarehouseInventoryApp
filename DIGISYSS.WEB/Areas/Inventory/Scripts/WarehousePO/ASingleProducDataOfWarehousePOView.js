var ASingleProducDataOfWarehousePOViewManager = {
    UpdteASingleProducDataOfWarehousePOView: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/WarehousePO/UpdateASingleProducDataOfWarehousePOView",
            data: JSON.stringify(UpdateASingleProducDataOfWarehousePOViewHelper.GetWarehousePOViewDataForUpdate()),
            
            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    UpdateASingleProducDataOfWarehousePOViewHelper.GetWarehousePOViewDataForUpdate();
                    viewWarehousePOManager.GetWarehousePOSavedDataTable();
                    IndividualWarehousePOViewManager.GetIndividualWarehousePOViewDataTable();
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

    getASingleProducDataOfWarehousePOView: function (WarehousePODetailsId) {
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/WarehousePO/GetASingleProducDataOfWarehousePOView',
            data: { WarehousePODetailsId: WarehousePODetailsId },
            success: function (response, textStatus) {
                debugger;
                if (response.data[0] != null) {
                    //alert(JSON.stringify(response));
                    $("#hdnProductId").val(response.data[0].ProductId);
                    $("#hdnWarehousePOMasterId").val(response.data[0].WarehousePOMasterId);
                    $("#hdnWarehousePODetailsId").val(response.data[0].WarehousePODetailsId);
                    $("#hdnWarehousePOItemReceivedId").val(response.data[0].WarehousePOItemReceivedId);
                    $("#txtProductName").val(response.data[0].ProductName);
                    $("#txtOrderedQuantity").val(response.data[0].OrderedQuantity);
                    $("#txtTempProductQuantity").val(response.data[0].OrderedQuantity);
                    $("#txtItemReceivedQuantity").val(response.data[0].ReceivedQuantity);
                    $("#txtTempItemReceivedQuantity").val(response.data[0].ReceivedQuantity);
                    $("#txtRemainingQuentity").val(response.data[0].RemainingQuantity);
                } 
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },
}


var UpdateASingleProducDataOfWarehousePOViewHelper = {

    CreateASingleProducDataOfWarehousePOViewInit: function () {



    //    $("#txtNewReceiveQuantity").click(function () {
    //        UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
    //        $("#txtNewReceiveQuantity").on("input", function () {
    //            UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
    //    });
        //});


        


        $("#txtNewReceiveQuantity").click(function () {

           //UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
            $("#txtNewReceiveQuantity").on("input", function () {
                UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
            });
        });

      


        $("#btnUpdateReceivedAmount").click(function () {
            debugger;

            //UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
            ASingleProducDataOfWarehousePOViewManager.UpdteASingleProducDataOfWarehousePOView();
            viewWarehousePOManager.GetWarehousePOSavedDataTable();
            IndividualWarehousePOViewManager.GetIndividualWarehousePOViewDataTable();
            UpdateASingleProducDataOfWarehousePOViewHelper.ClearASingleProducDataOfWarehousePOViewForm();
        });

        $("#btnClearTextboxesofASingleProductIfoForm").click(function () {
            debugger;
            UpdateASingleProducDataOfWarehousePOViewHelper.ClearASingleProducDataOfWarehousePOViewForm();
        });
    },

    POViewpupInit: function () {
        debugger;
    },



    CalculatePartialReceiveForASingleProduct: function () {
        debugger;
        var orderedQuantity = parseFloat($("#txtOrderedQuantity").val());
        var itemReceivedQuantity = parseFloat(($("#txtItemReceivedQuantity").val()));
        var remainingQuantity = parseFloat($("#txtRemainingQuentity").val());
        var oldReceivedQuantity = parseFloat($("#txtTempItemReceivedQuantity").val());
        var newReceivedQuantity = parseFloat(($("#txtNewReceiveQuantity").val()));
        
        if (isNaN(orderedQuantity)) { orderedQuantity = 0; }
        if (isNaN(remainingQuantity)) { remainingQuantity = 0; }
        if (isNaN(oldReceivedQuantity)) { oldReceivedQuantity = 0; }
        if (isNaN(itemReceivedQuantity)) { itemReceivedQuantity = 0; }
        if (isNaN(newReceivedQuantity)) { newReceivedQuantity = 0; }
        if (isNaN(itemReceivedQuantity)) { itemReceivedQuantity = 0; }

        if ((remainingQuantity >= 0) && (orderedQuantity >= itemReceivedQuantity)) {
            $("#txtItemReceivedQuantity").val(parseFloat(oldReceivedQuantity) + parseFloat(newReceivedQuantity));
            $("#txtRemainingQuentity").val(parseFloat($("#txtOrderedQuantity").val()) - parseFloat($("#txtItemReceivedQuantity").val()));

            //UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
        }
        else {
            $("#myModal #modal-body #rif").html("Receive Quantity Must be Less or Equal  of Ordered Quantity.");
            $('#myModal').appendTo("body").modal('show');

            parseFloat($("#txtRemainingQuentity").val(remainingQuantity));
            parseFloat(($("#txtItemReceivedQuantity").val(oldReceivedQuantity)));
            $("#txtRemainingQuentity").val(parseFloat($("#txtOrderedQuantity").val()) - parseFloat($("#txtItemReceivedQuantity").val()));
            $("#txtNewReceiveQuantity").val('');
            //UpdateASingleProducDataOfWarehousePOViewHelper.CalculatePartialReceiveForASingleProduct();
        }
    },
    
    GetWarehousePOViewDataForUpdate: function () {
        var aObj = new Object();
        debugger;
        aObj.WarehousePOMasterId = $('#hdnWarehousePOMasterId').val();
        aObj.WarehousePODetailsId = $("#hdnWarehousePODetailsId").val();
        aObj.WarehousePOItemReceivedId = $("#hdnWarehousePOItemReceivedId").val();
        aObj.OutletId = $("#hdnOutletId").val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.ItemReceivedQuantity = $("#txtItemReceivedQuantity").val();
        return aObj;
    },


    ClearASingleProducDataOfWarehousePOViewForm: function () {
        debugger;
        $('#hdnWarehousePOMasterId').val(0);
        $('#hdnWarehousePODetailsId').val(0);
        $("#txtProductName").val('');
        $("#txtProductQuantity").val('');
        $("#txtOrderedQuantity").val('');
        $("#txtItemReceivedQuantity").val('');
        $("#txtRemainingQuentity").val('');
        $("#txtNewReceiveQuantity").val('');
    },

}
