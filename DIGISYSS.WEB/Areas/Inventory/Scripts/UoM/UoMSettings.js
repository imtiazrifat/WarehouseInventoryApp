$(document).ready(function () {

    CreateUoMHelper.CreateUoMInit();
    viewUoMManager.GetUoMDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEditUoM', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewUoMHelper.populateDataForEditButton(data);
    });
});