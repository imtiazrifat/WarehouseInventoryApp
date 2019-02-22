var productId;


$(document).ready(function () {

    CreatePackageHelper.CreatePackageInit();
    viewPackageManager.GetPackageDataTable();
   
    $('#myTable2 tbody').on('click', '#btnEditPackage', function (e) {
        debugger;
        var table = $('#myTable2').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewPackageHelper.populateDataForEditButton(data);
    });
});