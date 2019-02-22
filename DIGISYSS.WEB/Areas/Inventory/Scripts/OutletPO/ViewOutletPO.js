var viewOutletPOManager = {

    GetOutletPODataTable: function () {

        $('#myTable2').dataTable().fnDestroy();
        $('#myTable2').DataTable({  
            "ajax": {
                "url": "/Inventory/OutletPO/GetAllOutletPOData",
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
                { "data": "WarehouseName", "width": "20%" },
                { "data": "ProductQuantity", "width": "10%" },
                { "data": "Status", "width": "15%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnViewOutletPO" type="button">View</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-primary" id="btnReceived" type="button">Received</button>' },
                 { "data": "Status", "width": "10%" },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [3],
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
      {
          // The `data` parameter refers to the data for the cell (defined by the
          // `data` option, which defaults to the column being worked with, in
          // this case `data: 0`.
          targets: [5],
          render: function (data, type, row) {
              debugger;
              return data == 3 ? '<button class="btn btn-primary" id="btnReceived" type="button">Received</button>' : ''
          },

      },

            ]

        });
    },


    GetIndividualOutletPOViewOnly: function (masterId) {
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
                    CreateOutletPOManager.LoadViewData(response.data);
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.Message);
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

var viewOutletPOHelper = {

    populateDataForEditButton: function (aObj) {

        /////CreateOutletPOHelper.ClearOutletPOForm();////If I call clear tene then "OutletPOMasterId" contail zero value,but I cant understand that after clearing all I set the "OutletPOMasterId" in hidden field also,so whats the problem(Must be dubug properly in deep)

        //alert("View OutletPO Informaiton for Edit Button");
        $('#hdnOutletPOMasterId').val(aObj.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(aObj.OutletPODetailsId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtOutletName").val(aObj.OutletName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
        //alert(JSON.stringify(aObj));
    },

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletPO/ChangeStatusValueInMasterTable',
            //data: { OutletPOMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(OutletPOMasterId, setStatusValue),
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


var viewOutletPOForClear = {

    populateDataForReceivedButton: function (aObj) {

        CreateOutletPOHelper.ClearOutletPOForm();

       // alert("View OutletPO Informaiton for Received Button");
        //alert(JSON.stringify(aObj));
    },
};
