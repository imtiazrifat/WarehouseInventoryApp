var viewOutletManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetOutletDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Outlet/GetAllOutlet",
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
                { "data": "OutletName", "autoWidth": true },
                { "data": "OutletCode", "autoWidth": true },
                { "data": "OutletNumber", "autoWidth": true },
                { "data": "OutletRegistrationNumber", "autoWidth": true },
                { "data": "OutletDetails", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },

                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutlet" type="button">Edit</button>' },

            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [6],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Active' : 'Inactive';
        }
    },

            ]
            //"fnRowCallback": function (nRow, aData, iDisplayIndex) {
            //  //  debugger;
            //    //$('td:eq(4)', nRow).html('<a class="glyphicon glyphicon-edit" href="/Accounting/Ledgers/Edit/' + aData.AssetCategoryId + '"></a>');

            //    $('td:eq(4)', nRow).html('<a class="glyphicon glyphicon-edit" onclick="viewAssetCategoryHelper.editButtonDataLoad()"></a>');

            //    return nRow;


            //}


        });

    },



};
var viewOutletHelper = {

    populateDataForEditButton: function (aObj) {

        CreateOutletHelper.ClearOutletForm();


        $('#hdnOutletId').val(aObj.OutletId);
        $("#txtOutletName").val(aObj.OutletName);
        $("#txtOutletCode").val(aObj.OutletCode);
        $("#txtOutletNumber").val(aObj.OutletNumber);
        $("#txtOutletRegistrationNumber").val(aObj.OutletRegistrationNumber);
        $("#txtOutletDetails").val(aObj.OutletDetails);


        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }



    },

};


