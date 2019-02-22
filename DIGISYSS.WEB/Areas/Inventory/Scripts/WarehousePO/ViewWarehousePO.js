var viewWarehousePOManager = {

    GetWarehousePOSavedDataTable: function () {

        $('#myTableViewWarehousePO').dataTable().fnDestroy();
        $('#myTableViewWarehousePO').DataTable({
            "ajax": {
                "url": "/Inventory/WarehousePO/GetAllWarehousePOData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },
            "columns": [
            {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                { "data": "SupplierName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewWarehousePO" type="button">View</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnProcessforIndividualWarehousePOTable" type="button">Process</button>' }
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [3],
        render: function (data, type, row) {
            debugger;
            if (data == 2) {
                return 'Approved';
            }
            else if (data == 3) {
                return 'On the Way';
            }
            else if (data == 4) {
                return 'Received';
            }
            else {
                return "Pending";
            }
        }
    },
            ]
        });
    },
};

var viewWarehousePOHelper = {

    populateDataForViewButton: function (aObj) {
        debugger;

         $('#hdnWarehousePOMasterId').val(aObj.WarehousePOMasterId) ;
         //$("#hdnWarehousePODetailsId").val(aObj.WarehousePODetailsId);
         $("#cmbProductId").val(aObj.ProductId).trigger("change");
         $("#hdnProductPriceId").val(aObj.ProductPriceId);
         $("#hdnProductPriceId").val(aObj.ProductPriceId);

         $("#cmbSizeId").val( aObj.SizeId);
         $("#cmbUoMId").val( aObj.UoMId);
         $("#txtProductName").val(aObj.ProductName);
         $("#cmbSupplierId").val(aObj.SupplierId).trigger("change");
         $("#txtSupplierName").val(aObj.SupplierName);
         $("#txtProductMainBarcode").val(aObj.ProductMainBarcode);
         $("#txtProductQuantity").val(aObj.ProductQuantity);
         $("#txtWholeSalePrice").val(aObj.WholeSalePrice);
         $("#txtRetailPrice").val(aObj.RetailPrice);
         $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
    },

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/WarehousePO/ChangeStatusValue',
            data: JSON.stringify({ aObj }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response, textStatus) {
                debugger;
                $("#myModal #modal-body #rif").html(response.Message);
                $('#myModal').appendTo("body").modal('show');
            },
            error: function (textStatus, errorThrown) {
                $("#dialog_simple").html(data.Message);
                $('#dialog_simple').dialog('open');
            }
        });
    },
   

    processButtonForIndividualWarehousePOTable: function (aObj) {

        //CreateWareHouseHelper.ClearForm();
        $('#hdnWarehousePOMasterId').val(aObj.WarehousePOMasterId);
        $('#hdnWarehousePOViewDetailsId').val(aObj.WarehousePOViewDetailsId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
    },
};


var viewWarehousePOForClear = {

    populateDataForReceivedButton: function (aObj) {
        //CreateWarehousePOHelper.ClearWarehousePOForm();
    },
};
