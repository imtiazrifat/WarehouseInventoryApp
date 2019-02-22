var ReceivedOutletPOManager = {

    GetOutletPODataTable: function () {

        $('#myTable2').dataTable().fnDestroy();
        $('#myTable2').DataTable({  
            "ajax": {
                "url": "/Inventory/OutletPO/GetAllReceivedOutletPoByWarehouse",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },

            "columns": [
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "1%"
                },
                { "data": "OutletName", "width": "20%" },
                { "data": "ProductQuantity", "width": "10%" },
                //{ "data": "Status", "width": "15%" },
                { "data": "IsReturned", "width": "15%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletPO" type="button">View</button>', "width": "5%" },
                //{ "data": "Status", "width": "10%" },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [3],
        render: function (data, type, row) {
            debugger;
            if (data == 1) {
                return 'Pending';
            }
            else if (data == 2) {
                return 'Return Successful';
            }
            else {
                return "No Request";
            }
        }
    },
      //{
      //    // The `data` parameter refers to the data for the cell (defined by the
      //    // `data` option, which defaults to the column being worked with, in
      //    // this case `data: 0`.
      //    targets: [5],
      //    render: function (data, type, row) {
      //        debugger;
      //        return ((data == 4) ) ? '<button class="btn btn-primary" id="btnReturnOutletPOByMaster" type="button">Return All</button>' : ''
      //    },

      //},

            ]

        });
    },


    IndividualOutletPOView: function (masterId) {
        debugger;

        $.ajax({
            "url": "/Inventory/OutletPO/GetIndividualOutletPOView",
            "type": "GET",
            "datatype": "json",
            "data": { OutletPOMasterId: masterId },
            success: function (response) {
                debugger;
                if (response != null) {
                    debugger;
                    CreateOutletPOReturnManager.LoadViewData(response.data);
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },
};

var ReceivedOutletPOHelper = {
    populateDataForEditButton: function (aObj) {

        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtOutletName").val(aObj.OutletName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
     },
};

var ReceivedOutletPOForClear = {
    populateDataForReceivedButton: function (aObj) {
        CreateOutletPOReturnHelper.ClearOutletPOReturnForm();
   },
};
