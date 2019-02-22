$(document).ready(function () {

    CreateColorHelper.CreateColorInit();
    viewColorManager.GetColorDataTable();

    $('#myTable tbody').on('click', '#btnEditColor', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewColorHelper.populateDataForEditButton(data);
    });
});