/// <reference path="ViewTax.js" />



var viewTaxManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetTaxDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Tax/GetAllTax",
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
                { "data": "TaxCode", "autoWidth": true },

                { "data": "TaxName", "autoWidth": true },
                 { "data": "PercentAmount", "autoWidth": true },
                  { "data": "FixedAmount", "autoWidth": true },


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewTaxHelper = {

    populateDataForEditButton: function (aObj) {
    
        CreateTaxHelper.ClearForm();
        $('#hdnTaxId').val(aObj.TaxId);
        $("#txtTaxCode").val(aObj.TaxCode);
        $("#txtTaxName").val(aObj.TaxName);
        $("#txtPercentAmount").val(aObj.PercentAmount);
        $("#txtFixedAmount").val(aObj.FixedAmount);
        //$("#txtTaxCode").val(aObj.TaxCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
