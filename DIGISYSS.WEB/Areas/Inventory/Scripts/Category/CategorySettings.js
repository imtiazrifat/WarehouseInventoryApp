$(document).ready(function () {

    CreateCategoryHelper.CreateCategoryInit();
    viewCategoryManager.GetCategoryDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEdit', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewCategoryHelper.populateDataForEditButton(data);
    });
});