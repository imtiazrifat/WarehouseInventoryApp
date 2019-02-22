var viewItemManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetItemDataTable: function () {
       
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Item/GetAllItem",
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
                { "data": "ItemCode", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "ItemDetails", "autoWidth": true },               
                { "data": "IsActive", "autoWidth": true },
              
                { "defaultContent": '<button class="btn btn-primary" id="btnEditItem" type="button">Edit</button>' },
          
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
        render: function (data, type, row) {
           
            return data == '1' ? 'Active' : 'Inactive';
        }
    },

            ]
            //"fnRowCallback": function (nRow, aData, iDisplayIndex) {
            //  // 
            //    //$('td:eq(4)', nRow).html('<a class="glyphicon glyphicon-edit" href="/Accounting/Ledgers/Edit/' + aData.AssetCategoryId + '"></a>');

            //    $('td:eq(4)', nRow).html('<a class="glyphicon glyphicon-edit" onclick="viewAssetCategoryHelper.editButtonDataLoad()"></a>');

            //    return nRow;


            //}


        });

    },



};
var viewItemHelper = {

    populateDataForEditButton: function (aObj) {
        debugger;
        CreateItemHelper.ClearItemForm();
        
        $('#hdnItemId').val(aObj.ItemId);
        $("#txtItemCode").val(aObj.ItemCode);
        $("#txtItemName").val(aObj.ItemName);
        $("#txtItemDetails").val(aObj.ItemDetails); 
        $("#cmbGroupId").val(aObj.GroupCode).trigger("change");

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else  {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        

    },

};
