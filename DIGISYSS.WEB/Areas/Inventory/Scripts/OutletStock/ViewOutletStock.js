var viewOutletStockManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetOutletStockDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/OutletStock/GetAllOutletStock",
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
                { "data": "OutletStockQuantity", "autoWidth": true },
                { "data": "OutletName", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletStock" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewDetailsOutletStock" type="button">View Details</button>' },
            
            ]
    ,        "columnDefs": [
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

var viewOutletStockHelper = {

    populateDataForEditButton: function (aObj) {

        CreateOutletStockHelper.ClearOutletStockForm();

        $('#hdnOutletStockId').val(aObj.OutletStockId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbOutletId").val(aObj.OutletId).trigger("change");
        $("#txtOutletName").val(aObj.OutletName);
        $("#txtOutletStockQuantity").val(aObj.OutletStockQuantity);
        $("#cmbAdjustedReason").val(aObj.AdjustedReason).trigger("change");
        

        aObj.OutletStockId = $('#hdnOutletStockId').val();
        aObj.OutletName = $("#txtOutletName").val();
        aObj.OutletStockQuantity = $("#txtOutletStockQuantity").val();

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },
};


