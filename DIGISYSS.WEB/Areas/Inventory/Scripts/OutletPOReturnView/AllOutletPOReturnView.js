var AllOutletPOReturnViewManager = {

    GetAllOutletPOReturnViewDataTable: function () {
        debugger;

        $('#myTableAllOutletPOReturnView').dataTable().fnDestroy();
        $('#myTableAllOutletPOReturnView').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPOReturn/GetAllOutletPoReturnRequest",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },
            "columns": [

                { "data": "OutletPOReturnMasterId", "autoWidth": false, "visible": false },
                { "data": "WarehouseId", "autoWidth": false, "visible": false },
                { "data": "OutletId", "autoWidth": false, "visible": false },
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
               {
               "data": "ApplyDate",
                    "type": "date ",
                    "render": function (value) {
                        if (value === null) return "";
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(value);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getDate()) + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
                    }
                },
                { "data": "OutletName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "TotalGrandPrice", "autoWidth": true },
                { "data": "IsReturned", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnAllOutletPOReturnViewDetails" type="button">View Details</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [8],
        render: function (data, type, row) {
            debugger;
           debugger;
           if (data == 1) {
               return 'Pending';
           }
           else if (data == 2) {
               return 'Return Successful';
           }
           else {
               return "No Retrun Request";
           }
        }
    },
            ]

        });
    },

};

var AllOutletPOReturnViewHelper = {

    populateDataForAllOutletPOReturnViewDetailsButton: function (aObj) {
        debugger;
        CreateWareHouseHelper.ClearForm();
        var table = $('#myTableIndividualOutletPOReturnView').DataTable();
        var data = table.row($(this).parents('tr')).data();

        $('#hdnOutletPOReturnMasterId').val(aObj.OutletPOReturnMasterId);
        $('#hdnOutletPOReturnDetailsId').val(aObj.OutletPOReturnDetailsId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
       // $("#txtTotalPrice").val(aObj.TotalGrandPrice);
    },
};

