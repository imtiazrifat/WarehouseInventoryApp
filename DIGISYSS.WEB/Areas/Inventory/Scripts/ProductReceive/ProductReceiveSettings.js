$(document).ready(function () {

    CreateProductReceiveHelper.CreateProductReceiveInit();
    viewProductReceiveManager.GetProductReceiveDataTable();





    $('#myTable tbody').on('click', '#btnEditProductReceive', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewProductReceiveHelper.populateDataForEditButton(data);
    });
});