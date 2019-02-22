var a = 0;
var OutletPOReturnData = [];

var OutletPOReturnManager = {
    ReturnRequest: function () {
        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());
        //alert(JSON.stringify(OutletPOReturnData));
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletPOReturn/OutletPOReturnDetails ",
            data: JSON.stringify({ OutletPOReturnData: OutletPOReturnHelper.GetOutletPOReturnData(), productList: OutletPOReturnData }),
            //data: JSON.stringify(OutletPOReturnData),
            success: function (response) {
                debugger;
                if (response != null) {

                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    setTimeout(function () {
                        $("#myModal").modal('hide');
                    }, 2000);
                    ReceivedOutletPOManager.GetOutletPODataTable();
                    //OutletPOReturnHelper.ClearOutletPOReturnForm();
                    OutletPOReturnData = [];
                    OutletPOReturnHelper.GetOutletPOReturnDataTable();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
                setTimeout(function () {
                    $("#myModal").modal('hide');
                }, 2000);
            },
            dataType: "json",
            contentType: "application/json",
        });
    },
};


var OutletPOReturnHelper = {
    OutletPOReturnInit: function () {
        OutletPOReturnHelper.GetOutletPOReturnDataTable();

        $("#btnReturnOutletPO").click(function () {
            CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
            OutletPOReturnManager.ReturnRequest();
            setTimeout(function () {
                $("#myModal").modal('hide');
            }, 2000);
        });

         $("#btnClearOutletPOReturnForm").click(function () {
             CreateOutletPOReturnHelper.ClearOutletPOReturnForm();

             setTimeout(function () {
                 $("#myModal").modal('hide');
             }, 2000);
         });


    },




    //ClearOutletPOReturnFormForNormalButtons: function () {

    //    $("#txtWarehouseName").val('');
    //    $("#txtProductName").val('');
    //    $("#cmbProductId").val('').trigger("change");
    //    $("#txtProductQuantity").val('');
    //    $("#txtPriceAmount").val('');
    //    $("#txtWholeSalePrice").val('');
    //    $("#txtRetailPrice").val('');
    //    $("#txtPriceAmount").val('');
    //    $("#txtSize").val('');
    //    $("#txtBarcode").val('');
    //    $("#txtItemName").val('');
    //    $("#txtUoM").val('');
    //},



    GetOutletPOReturnDataTable: function () {
        //alert(JSON.stringify(OutletPOReturnData));
        debugger;
        $('#myTableReturnOutletPO').dataTable().fnDestroy();
        $('#myTableReturnOutletPO').DataTable({
            data: OutletPOReturnData,

            "columns": [
                { "data": "OutletPOReturnMasterId", "autoWidth": false, "visible": false },
                { "data": "OutletPOReturnDetailsId", "autoWidth": false, "visible": false },
                { "data": "OutletPOMasterId", "autoWidth": false, "visible": false },
                { "data": "OutletPODetailsId", "autoWidth": false, "visible": false },
                { "data": "WarehouseId", "autoWidth": false, "visible": false },
                { "data": "OutletId", "autoWidth": false, "visible": false },
                { "data": "ProductId", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "1%"
                },
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductMainBarcode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "SizeName", "autoWidth": true },
                { "data": "UoMShortName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Status", "autoWidth": true },

                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletPOReturn" type="button">View</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnSingleOutletPOReturn" type="button">Return</button>', "width": "5%" },
            ],
        });
    },

    GetOutletPOReturnData: function () {
        debugger;
        var aObj = new Object();
         aObj.OutletPOInvoiceMasterId = $('#hdnOutletPOInvoiceMasterId').val();
        aObj.OutletPOInvoiceDetailsId = $('#hdnOutletPOInvoiceDetailsId').val();
        aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
        aObj.OutletPODetailsId = $("#hdnOutletPODetailsId").val();
        aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.OutletId = $('#hdnOutletId').val();
        aObj.ProductId = $('#hdnProductId').val();
        aObj.ProductName = $('#hdnProductName').val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.RetailPrice = $('#txtRetailPrice').val();
        aObj.ItemName = $("#txtItemName").val();
        aObj.SizeName = $("#txtSize").val();
        aObj.UoMShortName = $("#txtUoM").val();
        aObj.ProductMainBarcode = $("#txtBarcode").val();
        aObj.Status = "Not Sent";
        aObj.PriceAmount = $('#txtRetailPrice').val() * $("#txtProductQuantity").val();
        return aObj;
    },

    PopulateGrandTotalPriceQuentity: function () {
        debugger;
        var totalProduct = 0;
        var totalOutletPOReturnPrice = 0;
        for (var i = 0; i < OutletPOReturnData.length; i++) {
            totalProduct += parseFloat(OutletPOReturnData[i].ProductQuantity);
            totalOutletPOReturnPrice += parseFloat(OutletPOReturnData[i].TotalPrice);
        }
        $("#txtTotalProduct").val(totalProduct);
        $("#txtTotalPrice").val(totalOutletPOReturnPrice);
    },


    //populateDataForViewButton: function (aObj) {

    //    OutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
    //    $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
    //    $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
    //    $('#hdnProductId').val(aObj.ProductId);
    //    $('#cmbProductId').val(aObj.ProductId).trigger("change");
    //    $("#txtProductName").val(aObj.ProductName);
    //    $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
    //    $("#txtWarehouseName").val(aObj.WarehouseName);
    //    $("#txtProductQuantity").val(aObj.ProductQuantity);
    //    $("#txtRetailPrice").val(aObj.RetailPrice);
    //    $("#txtPriceAmount").val((aObj.RetailPrice) * (aObj.ProductQuantity));
    //    $("#txtBarcode").val(aObj.ProductMainBarcode);
    //    $("#txtItemName").val(aObj.ItemName);
    //    $("#txtSize").val(aObj.SizeName);
    //    $("#txtUoM").val(aObj.UoMShortName);
    //},
}