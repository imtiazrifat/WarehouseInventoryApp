/// <reference path="ViewWarrentyPeriod.js" />



var viewWarrentyPeriodManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetWarrentyPeriodDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/WarrentyPeriod/GetAllWarrentyPeriod",
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
                { "data": "WarrentyName", "autoWidth": true },

                { "data": "WarrentyDays", "autoWidth": true },
                 { "data": "WarrentyDetails", "autoWidth": true },
                 


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewWarrentyPeriodHelper = {

    populateDataForEditButton: function (aObj) {
    
        CreateWarrentyPeriodHelper.ClearForm();
        $('#hdnWarrentyPeriodId').val(aObj.WarrentyPeriodId);
        $("#txtWarrentyPeriodName").val(aObj.WarrentyName);
        $("#txtWarrentyDays").val(aObj.WarrentyDays);
        $("#txtWarrentyDetails").val(aObj.WarrentyDetails);
      
        //$("#txtWarrentyPeriodCode").val(aObj.WarrentyPeriodCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
