var IndividualOutletInvoiceManager = {
    
    GetIndividualOutletInvoiceDataTable: function () {
        // alert(typeof (OutletInvoiceMasterId));
        debugger;
        $('#myTableIndividualOutletInvoiceView').dataTable().fnDestroy();
        $('#myTableIndividualOutletInvoiceView').DataTable({
            "ajax": {
                "url": "/Inventory/OutletInvoice/GetIndividualOutletInvoiceData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
                "data": { OutletInvoiceMasterId: OutletInvoiceMasterId },
            },
            "columns": [
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                }, 
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Discount", "autoWidth": true },
                { "data": "VAT", "autoWidth": true },
                { "data": "IsChanged", "autoWidth": true },
                { "data": "IsReturned", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [8],
        render: function (data, type, row) {
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

