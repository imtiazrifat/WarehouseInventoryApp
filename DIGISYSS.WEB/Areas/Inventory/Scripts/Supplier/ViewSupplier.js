


var viewSupplierManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetSupplierDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Supplier/GetAllSupplier",
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
                { "data": "SupplierCode", "autoWidth": true },

                { "data": "SupplierName", "autoWidth": true },
                 { "data": "SupplierDetails", "autoWidth": true },
                  { "data": "SupplierNumber", "autoWidth": true },
                  { "data": "AddressCode", "autoWidth": true },
                  { "data": "Ex1", "autoWidth": true },


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewSupplierHelper = {

    populateDataForEditButton: function (aObj) {

        CreateSupplierHelper.ClearForm();
        $('#hdnSupplierId').val(aObj.SupplierId);
        $("#txtSupplierCode").val(aObj.SupplierCode);
        $("#txtSupplierName").val(aObj.SupplierName);
        $("#txtSupplierDetails").val(aObj.SupplierDetails);
        $("#txtSupplierNumber").val(aObj.SupplierNumber);
        $("#txtAddressCode").val(aObj.AddressCode);
        $("#txtEx1").val(aObj.Ex1);
        //$("#txtSupplierCode").val(aObj.SupplierCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
