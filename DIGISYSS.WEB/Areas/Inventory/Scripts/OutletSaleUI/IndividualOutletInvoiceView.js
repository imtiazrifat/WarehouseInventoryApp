var IndividualOutletInvoiceManager = {

    GetIndividualOutletInvoiceDataTable: function () {
        // alert(typeof (OutletInvoiceMasterId));

        $('#myTableIndividualOutletInvoice').dataTable().fnDestroy();
        $('#myTableIndividualOutletInvoice').DataTable({
            "ajax": {
                "url": "/Inventory/OutletSaleUI/GetIndividualOutletInvoiceData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
                "data":{ OutletInvoiceMasterId: OutletInvoiceMasterId },
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
                { "data": "IsEdited", "autoWidth": true },
                                        ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [3],
        render: function (data, type, row) {
            return data == '1' ? 'Yes' : 'No';
        }
    },
            ]

        });
    },

};





