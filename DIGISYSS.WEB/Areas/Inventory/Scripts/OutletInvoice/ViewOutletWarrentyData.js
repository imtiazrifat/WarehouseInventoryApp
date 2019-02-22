var viewOutletWarrentyDataManager = {
    GetOutletWarrentyDataDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/OutletWarrentyData/GetAllOutletWarrentyData",
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
                { "data": "OutletSaleInvoiceNo", "autoWidth": true },
                {
                      "data": "PurchaseDate",
                      "type": "date ",
                      "render": function (value) {
                          if (value === null) return "";
                          var pattern = /Date\(([^)]+)\)/;
                          var results = pattern.exec(value);
                          var dt = new Date(parseFloat(results[1]));
                          return (dt.getDate()) + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
                      }
                },
                {
                      "data": "ReturnDate",
                      "type": "date ",
                      "render": function (value) {
                          if (value === null) return "";
                          var pattern = /Date\(([^)]+)\)/;
                          var results = pattern.exec(value);
                          var dt = new Date(parseFloat(results[1]));
                          return (dt.getDate()) + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
                      }
                },
                { "data": "ProductName", "autoWidth": true },
                { "data": "WarrentyType", "autoWidth": true },
                { "data": "Problem", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletWarrentyData" type="button">View</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [7],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Active' : 'Inactive';
        }
    },
            ]
        });
    },
};

var viewOutletWarrentyDataHelper = {

    populateDataForEditButton: function (aObj) {

        CreateOutletWarrentyDataHelper.ClearOutletWarrentyDataForm();

        $('#hdnOutletWarrentyId').val(aObj.OutletWarrentyId);
        $("#txtOutletSaleInvoiceNo").val(aObj.OutletSaleInvoiceNo);
        $("#txtPurchaseDate").val(aObj.PurchaseDate);
        $("#txtReturnDate").val(aObj.ReturnDate);
        $("#txtProductName").val(aObj.ProductName);
        $("#txtWarrentyType").val(aObj.WarrentyType);
        $("#txtProblem").val(aObj.Problem);
        $("#txtStatus").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },
};


