var OutletInvoiceMasterId;
var OutletInvoiceDetailsId;


$(document).ready(function () {
    AllOutletInvoiceManager.AllOutletInvoiceDataTable();
    $('#myTableAllOutletInvoice tbody').on('click', '#btnSingleOutletInvoiceView', function (e) {
        debugger;
        var table = $('#myTableAllOutletInvoice').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletInvoiceMasterId = parseInt(JSON.stringify(data.OutletInvoiceMasterId));
        OutletInvoiceDetailsId = parseInt(JSON.stringify(data.OutletInvoiceDetailsId));
        $("#hdnProductId").val(data.ProductId);
        $("#textOutletName").val(data.OutletName);
        $("#txtTotalQuantity").val(data.ProductQuantity);
        $("#txtTotalPrice").val(data.TotalGrandPrice);
       // AllOutletInvoiceManager.GetIndividualOutletInvoiceData();
       // AllOutletInvoiceManager.AllOutletInvoiceDataTable();
    });
});



var AllOutletInvoiceManager = {

    AllOutletInvoiceDataTable: function () {
        debugger;
        $('#myTableAllOutletInvoice').dataTable().fnDestroy();
        $('#myTableAllOutletInvoice').DataTable({
            "ajax": {
                "url": "/Inventory/OutletSaleUI/GetAllOutletInvoiceData",
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
                   "data": "BuyDate",
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
                { "defaultContent": '<button class="btn btn-primary" id="btnSingleOutletInvoiceView" type="button">View Details</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
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



