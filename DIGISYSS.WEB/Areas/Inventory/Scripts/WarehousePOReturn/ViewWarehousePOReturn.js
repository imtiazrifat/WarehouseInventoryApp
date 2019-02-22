var viewWarehousePOReturnManager = {

    GetWarehousePOReturnDataTable: function () {

        $('#myTableWarehousePO').dataTable().fnDestroy();
        $('#myTableWarehousePO').DataTable({  
            "ajax": {
                "url": "/Inventory/WarehousePOReturn/GetAllReceivedWarehousePOByWarehouse",
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
                { "defaultContent": '<button class="btn btn-primary" id="btnViewWarehousePO" type="button">View</button>', "width": "5%" },
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
              return data == 4 ? '<button class="btn btn-primary" id="btnReturnWarehousePO" type="button">Return</button>' : ''
          },

      },

            ]

        });
    },


    GetIndividualWarehousePOReturnViewOnly: function (masterId) {
        debugger;

        $.ajax({
            "url": "/Inventory/WarehousePOReturn/GetIndividualWarehousePO",
            "type": "GET",
            "datatype": "json",
            "data": { WarehousePOMasterId: masterId },
            success: function (response) {
                debugger;
                if (response != null) {
                    debugger;
                    CreateWarehousePOReturnManager.LoadViewData(response.data);
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

var viewWarehousePOReturnHelper = {

    populateDataForEditButton: function (aObj) {

        $('#hdnWarehousePOMasterId').val(aObj.WarehousePOMasterId);
        $('#hdnWarehousePODetailsId').val(aObj.WarehousePODetailsId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtOutletName").val(aObj.OutletName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
     },

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/WarehousePOReturn/ChangeStatusValueInMasterTable',
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


var viewWarehousePOReturnForClear = {

    populateDataForReceivedButton: function (aObj) {
        CreateWarehousePOReturnHelper.ClearWarehousePOReturnForm();
   },
};
