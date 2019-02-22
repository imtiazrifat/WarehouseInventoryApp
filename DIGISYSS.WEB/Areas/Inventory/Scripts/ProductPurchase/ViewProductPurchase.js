var viewProductPurchaseManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetProductPurchaseDataTable: function () {
        
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/ProductPurchase/GetAllProductPurchaseData",
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
                //{ "data": "ProductPurchaseId", "autoWidth": false },
                { "data": "ProductCode", "autoWidth": true },
                { "data": "ProductName", "autoWidth": true },
                { "data": "FactoryName", "autoWidth": true },
                { "data": "ItemName", "autoWidth": true },
                { "data": "PurchaseQuantity", "autoWidth": true },
                { "data": "MinimumStock", "autoWidth": true },
                { "data": "CurrentStock", "autoWidth": true },
                { "data": "NewStock", "autoWidth": true },
                { "data": "CostPrice", "autoWidth": true },
                { "data": "WholeSalePrice", "autoWidth": true },
                { "data": "RetailPrice", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },
              
                { "defaultContent": '<button class="btn btn-primary" id="btnEditProductPurchase" type="button">Edit</button>' },
          
            ],

         "columnDefs": [
    {
    //    // The `data` parameter refers to the data for the cell (defined by the
    //    // `data` option, which defaults to the column being worked with, in
    //    // this case `data: 0`.
        targets: [12],
        render: function (data, type, row) {
            
            return data == '1' ? 'Active' : 'Inactive'
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



}
var viewProductPurchaseHelper = {

    populateDataForEditButton: function (aObj) {
        CreateProductPurchaseHelper.ClearProductPurchaseForm();
        
         $('#hdnProductPurchaseId').val(aObj.ProductPurchaseId);
         $("#cmbFactoryId").val(aObj.FactoryId).trigger("change");
         $("#cmbItemId").val(aObj.ItemId).trigger("change");
         $("#cmbSizeId").val(aObj.SizeId).trigger("change");
         $("#cmbUoMId").val(aObj.UoMId).trigger("change");
         $("#cmbColorId").val(aObj.ColorId).trigger("change");

         $("#txtProductCode").val(aObj.ProductCode);
         $("#txtProductName").val(aObj.ProductName);
         $("#txtProductMainBarcode").val(aObj.ProductMainBarcode);
         $("#txtProductFactoryBarcode").val(aObj.ProductFactoryBarcode);
         $("#txtMinimumStock").val(aObj.MinimumStock);
         $("#txtCurrentStock").val(aObj.CurrentStock);
         $("#txtNewStock").val(aObj.NewStock);
         $("#txtPurchaseQuantity").val(aObj.PurchaseQuantity);
         $("#txtCostPrice").val(aObj.CostPrice);
         $("#txtWholeSalePrice").val(aObj.WholeSalePrice);
         $("#txtRetailPrice").val(aObj.RetailPrice);

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else  {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

      //alert(JSON.stringify(aObj));

    },

}
