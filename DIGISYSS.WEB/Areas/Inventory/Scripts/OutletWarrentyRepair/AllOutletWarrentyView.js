var AllOutletWarrentyViewManager = {

    OutletWarrentyViewDataTable: function () {
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
                { "data": "RepairStatus", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletWarrentyData" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
            ],
            "columnDefs": [
     {
         // The `data` parameter refers to the data for the cell (defined by the
         // `data` option, which defaults to the column being worked with, in
         // this case `data: 0`.
         //targets: [8],
         //render: function (data, type, row) {
         //    //return data == '1' ? 'Repaired' : 'Pending';
         //    debugger;
         //    if (data == null) {
         //        return 'Pending';
         //    }

         //}
     },
            ]

        });
    },

};

var AllOutletPoWarrentyRepairViewHelper = {

    populateDataForAllOutletPoWarrentyRepairViewDetailsButton: function (aObj) {
        debugger;
        CreateWareHouseHelper.ClearForm();
        var table = $('#myTableIndividualOutletPOReturnView').DataTable();
        var data = table.row($(this).parents('tr')).data();

        //$('#hdnOutletPOReturnMasterId').val(aObj.OutletPOReturnMasterId);
        //$('#hdnOutletPOReturnDetailsId').val(aObj.OutletPOReturnDetailsId);
        //$('#hdnRepairTokenNo').val(aObj.RepairTokenNo);
        //$('#hdnOutletId').val(aObj.OutletId);
        //$('#hdnProductId').val(aObj.ProductId);
        //$("#txtProductQuantity").val(aObj.ProductQuantity);
      
    },
};

