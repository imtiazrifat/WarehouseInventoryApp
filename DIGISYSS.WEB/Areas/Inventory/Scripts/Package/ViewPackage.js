var viewPackageManager = {

    GetPackageDataTable: function () {

        $('#myTable2').dataTable().fnDestroy();
        $('#myTable2').DataTable({
            "ajax": {
                "url": "/Inventory/Package/GetAllPackageData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },

            "columns": [
                //{ "data": "PackageMasterId", "autoWidth": false },//"visible": false},
                //{ "data": "PackageDetailsId", "autoWidth": false },//"visible": false},
                 {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                { "data": "ProductId", "autoWidth": false },
               
                { "data": "PackageName", "autoWidth": true },
                { "data": "ProductQuantity", "width": "%1" },

                { "defaultContent": '<button class="btn btn-primary" id="btnViewPackage" type="button">View</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditPackage" type="button">Edit</button>' },
            ],
            "columnDefs": [
                {
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    //targets: [9],
                    //render: function (data, type, row) {
                    //    return data == '1' ? 'Active' : 'Inactive';
                    //}
                },
            ]
        });
    },
};

var viewPackageHelper = {

    populateDataForEditButton: function (aObj) {

        CreatePackageHelper.ClearPackageForm();
        //alert("View Package Informaiton for Edit Button");
        $('#hdnPackageMasterId').val(aObj.PackageId);
        $('#hdnPackageDetailsId').val(aObj.ProductId);
        $("#cmbProductId").val(aObj.ProductId).trigger("change");
        $("#txtPackageName").val(aObj.PackageName);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
    },
};
