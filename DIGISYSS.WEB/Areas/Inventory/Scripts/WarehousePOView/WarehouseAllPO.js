var viewAllOutletPOManager = {

    GetAllOutletPODataTable: function () {

        $('#myTableAllOutletPO').dataTable().fnDestroy();
        $('#myTableAllOutletPO').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPO/GetAllOutletPO",
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
                { "data": "OutletName", "autoWidth": true },
                {
                    "data": "ApplyDate",
                    "type": "date ",
                    "render": function (value) {
                        if (value === null) return "";
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(value);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getDate()) + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
                    }
                },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "TotalGrandPrice", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewAllOutletPODetails" type="button">View Details</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
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







var viewAllOutletPOHelper = {

    populateDataForViewDetailsButton: function (aObj) {

        CreateWareHouseHelper.ClearForm();
        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductQuantity").val(aObj.ProductQuantity);

    },

};

