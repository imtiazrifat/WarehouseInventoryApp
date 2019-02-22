$(document).ready(function () {

    CreateSupplierHelper.CreateSupplierInit();
    viewSupplierManager.GetSupplierDataTable();

   $('#myTable tbody').on('click', '#btnEdit', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewSupplierHelper.populateDataForEditButton(data);
    });
});