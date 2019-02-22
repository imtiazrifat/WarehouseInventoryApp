var viewOutletSaleUIManager = {

    GetOutletSaleUIDataTable: function () {

        $('#myTable2').dataTable().fnDestroy();
        $('#myTable2').DataTable({  
            "ajax": {
                "url": "/Inventory/OutletSaleUI/GetAllOutletSaleUIData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },
            "columns": [
                //{ "data": "OutletSaleUIMasterId", "autoWidth": false },//"visible": false},
                //{ "data": "OutletSaleUIDetailsId", "autoWidth": false },//"visible": false},
                //{ "data": "ProductId", "autoWidth": false },//"visible": false},
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                { "data": "WarehouseName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletSaleUI" type="button">View</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnReceived" type="button">Received</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [2],
        render: function (data, type, row) {
            debugger;
             if (data == 2) {
                return 'Approved';
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

var viewOutletSaleUIHelper = {

    populateDataForEditButton: function (aObj) {

        CreateOutletSaleUIHelper.ClearOutletSaleUIForm();
        //alert("View OutletSaleUI Informaiton for Edit Button");
        $('#hdnOutletSaleUIMasterId').val(aObj.OutletSaleUIMasterId);
        $('#hdnOutletSaleUIDetailsId').val(aObj.OutletSaleUIDetailsId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtWarehouseName").val(aObj.WarehouseName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
        //alert(JSON.stringify(aObj));
    },

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletSaleUI/ChangeStatusValue',
            //data: { OutletSaleUIMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(OutletSaleUIMasterId, setStatusValue),
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


var viewOutletSaleUIForClear = {

    populateDataForReceivedButton: function (aObj) {

        CreateOutletSaleUIHelper.ClearOutletSaleUIForm();

       // alert("View OutletSaleUI Informaiton for Received Button");
        //alert(JSON.stringify(aObj));
    },
};
