var AllOutletPOViewManager = {

    GetAllOutletPOViewDataTable: function () {

        $('#myTableAllOutletPOView').dataTable().fnDestroy();
        $('#myTableAllOutletPOView').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPO/GetAllOutletPOView",
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
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnAllOutletPOViewDetails" type="button">View Details</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [5],
        render: function (data, type, row) {
            debugger;
           debugger;
            if (data == 2) {
                return  'Approved';
            }
            else if (data == 3) {
                return  'On the Way';
            }
            else if (data == 4) {
                return  'Received';
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

var AllOutletPOViewHelper = {

    populateDataForAllOutletPOViewDetailsButton: function (aObj) {
        debugger;
        CreateWareHouseHelper.ClearForm();
        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPOViewDetailsId').val(aObj.OutletPOViewDetailsId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
       // $("#txtTotalPrice").val(aObj.TotalGrandPrice);
    },
};

