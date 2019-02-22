var IndividualWarehousePOViewManager = {

    GetIndividualWarehousePOViewDataTable: function () {
        // alert(typeof (WarehousePOViewMasterId));
        debugger;
        $('#myTableIndividualWarehousePOView').dataTable().fnDestroy();
        $('#myTableIndividualWarehousePOView').DataTable({

            "ajax": {

                "url": "/Inventory/WarehousePO/GetIndividualWarehousePOView",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
                "data": { WarehousePOMasterId: WarehousePOMasterId },
            },             
             
            

            "columns": [
                 {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                { "data": "ProductName", "autoWidth": true },
                { "data": "OrderedQuantity", "autoWidth": true },
                { "data": "ReceivedQuantity", "autoWidth": true },
                { "data": "RemainingQuantity", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnReceiveForIndividualWarehousePoView" type="button">Receive</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnPartialReceive" type="button">Partial Receive</button>' },
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [6],
        render: function (data, type, row) {
            debugger;
            return data == '4' ? 'Received' : 'Pending';
        }
    },
            ]

        });
    },
    GetIndividualWarehousePOViewOnly: function (masterId) {
        // alert(typeof (WarehousePOViewMasterId));
        debugger;

        $.ajax({
            "url": "/Inventory/WarehousePO/GetIndividualWarehousePOView",
            "type": "GET",
            "datatype": "json",
            "data": { WarehousePOMasterId: masterId },
            success: function (response) {
                debugger;
                if (response != null) {
                    debugger;
                   // CreateWarehousePOManager.GetWarehousePODataTable();
                    CreateWarehousePOManager.LoadViewData(response.data);

                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
        
        
        //    $('#myTableAddProductToSendRequest').dataTable().fnDestroy();
        //    $('#myTableAddProductToSendRequest').DataTable({

        //        "ajax": {

        //            "url": "/Inventory/WarehousePO/GetIndividualWarehousePOView",
        //            "type": "GET",
        //            "datatype": "json",
        //            "contentType": 'application/json; charset=utf-8',
        //            "data": { WarehousePOMasterId: masterId },
        //        },

        //        "columns": [
        //      { "data": "ProductId", "autoWidth": false, "visible": false },//"visible": false},
        //      { "data": "ProductName", "autoWidth": true },
        //      { "data": "Barcode", "autoWidth": true },
        //      { "data": "ItemName", "autoWidth": true },
        //      { "data": "Size", "autoWidth": true },
        //      { "data": "UoMShortName", "autoWidth": true },
        //      { "data": "ProductQuantity", "autoWidth": true },
        //      { "data": "RetailPrice", "autoWidth": true },
        //      { "data": "TotalPrice", "autoWidth": true },
        //      { "defaultContent": '<button class="btn btn-primary" id="btnEditWarehousePO" type="button">Edit</button>' },
        //      { "defaultContent": '<button class="btn btn-danger" id="btnRemoveWarehousePO" type="button">Remove</button>' },
        //        ],

        //        "columnDefs": [
        //{
        //    targets: [3],
        //    render: function (data, type, row) {
        //        debugger;
        //        return data == '1' ? 'Yes' : 'No';
        //    }
        //},
        //        ]

        //    });
    },
};

//$('#myTableAddProductToSendRequest').DataTable({
//    data: WarehousePOData,
//    "columns": [
//        { "data": "ProductId", "autoWidth": false, "visible": false },//"visible": false},
//        { "data": "ProductName", "autoWidth": true },
//        { "data": "Barcode", "autoWidth": true },
//        { "data": "ItemName", "autoWidth": true },
//        { "data": "Size", "autoWidth": true },
//        { "data": "UoMShortName", "autoWidth": true },
//        { "data": "ProductQuantity", "autoWidth": true },
//        { "data": "RetailPrice", "autoWidth": true },
//        { "data": "TotalPrice", "autoWidth": true },
//        { "defaultContent": '<button class="btn btn-primary" id="btnEditWarehousePO" type="button">Edit</button>' },
//        { "defaultContent": '<button class="btn btn-danger" id="btnRemoveWarehousePO" type="button">Remove</button>' },
//    ],
//});

var IndividualWarehousePOViewHelper = {
    ClearASingleProducDataOfWarehousePOViewForm: function () {
        debugger;
        $("#hdnProductId").val('0');
        $("#hdnProductName").val('0');
        $("#txtRetailPrice").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
        $("#txtProductQuantity").val('');
        $("#txtPriceAmount").val('');
    },

  changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/WarehousePO/ChangeStatusValue',
            //data: { WarehousePOViewMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(WarehousePOViewMasterId, setStatusValue),
            data: JSON.stringify({ aObj }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response, textStatus) {
                debugger;
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },
};
