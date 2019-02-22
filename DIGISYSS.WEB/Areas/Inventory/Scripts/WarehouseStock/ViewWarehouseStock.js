var viewWarehouseStockManager = {

   
    GetWarehouseStockDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/WarehouseStock/GetAllWarehouseStock",
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
              
                { "data": "ProductName", "autoWidth": true },
                { "data": "WarehouseStockQuantity", "autoWidth": true },
                { "data": "WarehouseName", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditWarehouseStock" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewDetailsWarehouseStock" type="button">View Details</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Active' : 'Inactive';
        }
    },
            ]
        });
    },
};

var viewWarehouseStockHelper = {

    populateDataForEditButton: function (aObj) {

        CreateWarehouseStockHelper.ClearWarehouseStockForm();

        $('#hdnWarehouseStockId').val(aObj.WarehouseStockId);
        $("#cmbWarehouseId").val(aObj.WarehouseId).trigger("change");
        $("#txtWarehouseName").val(aObj.WarehouseName);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbAdjustedReason").val(aObj.AdjustedReason).trigger("change");
        $("#txtWarehouseStockQuantity").val(aObj.WarehouseStockQuantity);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },
};


