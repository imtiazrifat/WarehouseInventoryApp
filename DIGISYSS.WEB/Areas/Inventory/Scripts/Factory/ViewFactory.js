var viewFactoryManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetFactoryDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Factory/GetAllFactory",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',

            },
            "columns": [
                {"data": "SL.", render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { "data": "FactoryName", "autoWidth": true },
                { "data": "FactoryCode", "autoWidth": true },
                { "data": "FactoryNumber", "autoWidth": true },
                { "data": "FactoryDetails", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },

                { "defaultContent": '<button class="btn btn-primary" id="btnEditFactory" type="button">Edit</button>' },

            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // this case `data: 0`.
        targets: [5],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Active' : 'Inactive';
        }
    },
            ]//"fnRowCallback": function (nRow, aData, iDisplayIndex) {

        });

    },

};
var viewFactoryHelper = {

    populateDataForEditButton: function (aObj) {

        CreateFactoryHelper.ClearFactoryForm();

        $('#hdnFactoryId').val(aObj.FactoryId);
        $("#txtFactoryName").val(aObj.FactoryName);
        $("#txtFactoryCode").val(aObj.FactoryCode);
        $("#txtFactoryNumber").val(aObj.FactoryNumber);
        $("#txtFactoryDetails").val(aObj.FactoryDetails);

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }



    },

};


