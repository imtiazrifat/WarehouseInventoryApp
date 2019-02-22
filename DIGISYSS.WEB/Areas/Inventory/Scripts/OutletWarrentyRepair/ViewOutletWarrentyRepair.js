var ViewOutletWarrentyRepairtManager = {

    ViewOutletWarrentyRepairtDataTable: function () {
        debugger;

        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/OutletWarrentyRepair/GetAllOutletWarrentyRepairRequest",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },
            "columns": [
                
                { "data": "OutletWarrentyRepairId", "autoWidth": false, "visible": false },
                { "data": "OutletId", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { "data": "RepairTokenNo", "autoWidth": true },
                {
                    "data": "PurchaseDate",
                    "type": "date ",
                    "render": function (value) {
                        if (value === null) return "";
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(value);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getDate()) + "." + (dt.getMonth() + 1) + "." + dt.getFullYear();
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
                        return (dt.getDate()) + "." + (dt.getMonth() + 1) + "." + dt.getFullYear();
                    }
                },
                { "data": "ProductName", "autoWidth": true },
                //{ "data": "WarrentyType", "autoWidth": true },
                { "data": "Problem", "autoWidth": true },
                { "data": "RepairCost", "autoWidth": true },
                { "data": "RepairStatus", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletWarrentyRepairRequestedData" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        //targets: [9],
        //render: function (data, type, row) {
        //    //return data == '1' ? 'Repaired' : 'Pending';
        //    debugger;
        //    if (data == null) {
        //        return 'Not Viewed';
        //    }
        //}
    },
            ]

        });
    },

};

var EditOutletWarrentyRepairHelper = {

    populateDataForEditButton: function (aObj) {
        debugger;
        //var purchaseDate = (parseInt(aObj.PurchaseDate.substr(6)));
        //if (isNull(purchaseDate)) { purchaseDate = "No Date"; }
        var purchaseDate = aObj.PurchaseDate;
        if ((purchaseDate)==null) { purchaseDate = ''; }
        else {
            purchaseDate = new Date(parseInt(aObj.PurchaseDate.substr(6)));
            purchaseDate = purchaseDate.getDate() + "." + (purchaseDate.getMonth() + 1) + "." + purchaseDate.getFullYear();
            }
       
         //var returnDate = (parseInt(aObj.EstimatedReturnDate.substr(6)));
        //if (isNull(returnDate)) { returnDate = "No Date"; }
        var returnDate = aObj.ReturnDate;
        if ((returnDate)==null) { returnDate = ''; }
        else {
            returnDate = new Date(parseInt(aObj.ReturnDate.substr(6)));
            returnDate = returnDate.getDate() + "." + (returnDate.getMonth() + 1) + "." + returnDate.getFullYear();
        }

        $('#hdnOutletWarrentyRepairId').val(aObj.OutletWarrentyRepairId);
        $('#hdnOutletInvoiceId').val(aObj.OutletInvoiceId);
        $('#hdnRepairTokenNo').val(aObj.RepairTokenNo);
        $('#hdnWarehouseId').val(aObj.WarehouseId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbRepairStatus").val(aObj.RepairStatus).trigger("change");
        $("#txtWarrentyType").val(aObj.WarrentyType);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPurchaseDate").val(purchaseDate);
        $("#txtReturnDate").val(returnDate);
        $("#txtProblem").val(aObj.Problem);
        $("#txtRepairCost").val(aObj.RepairCost);
    },
};



