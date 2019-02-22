var viewInvProductPriceManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetInvProductPriceDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/InvProductPrice/GetAllInvProductPrice",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',

            },
            "columns": [
                
                { "data": "SysProductPriceId", "autoWidth": true },
                { "data": "ProductCode", "autoWidth": true },
                { "data": "ManufacturingPrice", "autoWidth": true },
                { "data": "WholeSalePrice", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },
              
                { "defaultContent": '<button class="btn btn-primary" id="btnEditInvProductPrice" type="button">Edit</button>' },
          
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Active' : 'Inactive'
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



}
var viewInvProductPriceHelper = {

    populateDataForEditButton: function (aObj) {

        CreateInvProductPriceHelper.ClearInvProductPriceForm();
        
        $('#hdnSysProductPriceId').val(aObj.SysProductPriceId);
        $("#txtProductPriceCode").val(aObj.ProductPriceCode);
        $("#txtProductPriceName").val(aObj.ProductPriceName);
        $("#txtProductPriceDetails").val(aObj.ProductPriceDetails);       

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else  {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        

    },

}
