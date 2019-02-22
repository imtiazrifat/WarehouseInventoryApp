$(document).ready(function () {

    CreateDiscountHelper.CreateDiscountInit();
    viewDiscountManager.GetDiscountDataTable();

    

    $('#myTable tbody').on('click', '#btnEdit', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewDiscountHelper.populateDataForEditButton(data);
    });
});