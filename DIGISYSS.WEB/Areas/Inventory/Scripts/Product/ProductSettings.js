$(document).ready(function () {

    CreateProductHelper.CreateProductInit();
    viewProductManager.GetProductDataTable();

    $('#myTable tbody').on('click', '#btnEditProduct', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewProductHelper.populateDataForEditButton(data);
    });
});