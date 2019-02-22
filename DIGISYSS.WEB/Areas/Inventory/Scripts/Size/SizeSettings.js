$(document).ready(function () {

    CreateSizeHelper.CreateSizeInit();
    viewSizeManager.GetSizeDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();

    $('#myTable tbody').on('click', '#btnEdit', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewSizeHelper.populateDataForEditButton(data);
    });
});