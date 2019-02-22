var viewColorManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetColorDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Color/GetAllColor",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',

            },
            "columns": [
                
                { "data": "ColorId", "autoWidth": true },
                { "data": "ColorCode", "autoWidth": true },
                { "data": "ColorName", "autoWidth": true },
                { "data": "ColorDetails", "autoWidth": true },               
                { "data": "IsActive", "autoWidth": true },
              
                { "defaultContent": '<button class="btn btn-primary" id="btnEditColor" type="button">Edit</button>' },
          
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
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
var viewColorHelper = {

    populateDataForEditButton: function (aObj) {

        CreateColorHelper.ClearColorForm();
        
        $('#hdnColorId').val(aObj.ColorId);
        $("#txtColorCode").val(aObj.ColorCode);
        $("#txtColorName").val(aObj.ColorName);
        $("#txtColorDetails").val(aObj.ColorDetails);       

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else  {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        

    },

};


