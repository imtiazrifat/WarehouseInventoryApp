var AllOutletInvoiceManager = {

    AllOutletInvoiceDataTable: function () {
        debugger;
        $('#myTableAllOutletInvoiceView').dataTable().fnDestroy();
        $('#myTableAllOutletInvoiceView').DataTable({
            "ajax": {
                "url": "/Inventory/OutletInvoice/GetAllOutletInvoiceData",
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

                { "data": "OutletSaleInvoiceNo", "width": "20%" },
                {
                   "data": "BuyDate","width": "30%",
                   "type": "date ",
                   "render": function (value) {
                       if (value === null) return "";
                       var pattern = /Date\(([^)]+)\)/;
                       var results = pattern.exec(value);
                       var dt = new Date(parseFloat(results[1]));
                       return (dt.getDate()) + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
                   }
                },
                { "data": "OutletName", "width": "30%" },
                { "data": "ProductQuantity", "width": "2%"},
                { "data": "TotalGrandPrice", "width": "18%" },
                { "data": "Status", "width": "10%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnSingleOutletInvoiceView" type="button">View Details</button>', "width": "15%" },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [5],
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


var AllOutletInvoiceHelper = {

    populateDataForAllOutletInvoiceDetailsButton: function (aObj) {

       
        $('#hdnOutletInvoiceMasterId ').val(aObj.OutletInvoiceMasterId );
        $('#hdnOutletInvoiceDetailsId ').val(aObj.OutletInvoiceDetailsId );
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
         $("#txtTotalPrice").val(aObj.TotalGrandPrice);
    },
};

