


var viewWareHouseManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetWareHouseDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/WareHouse/GetAllWareHouse",
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
                { "data": "WarehouseCode", "autoWidth": true },

                { "data": "WarehouseName", "autoWidth": true },
                 { "data": "WarehouseDetails", "autoWidth": true },
                  { "data": "WarehouseNumber", "autoWidth": true },
                  { "data": "AddressCode", "autoWidth": true },
                  { "data": "Ex1", "autoWidth": true },


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewWareHouseHelper = {

    populateDataForEditButton: function (aObj) {

        CreateWareHouseHelper.ClearForm();
        $('#hdnWarehouseId').val(aObj.WarehouseId);
        $("#txtWarehouseCode").val(aObj.WarehouseCode);
        $("#txtWarehouseName").val(aObj.WarehouseName);
        $("#txtWarehouseDetails").val(aObj.WarehouseDetails);
        $("#txtWarehouseNumber").val(aObj.WarehouseNumber);
        $("#txtAddressCode").val(aObj.AddressCode);
        $("#txtEx1").val(aObj.Ex1);
        //$("#txtWareHouseCode").val(aObj.WareHouseCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
