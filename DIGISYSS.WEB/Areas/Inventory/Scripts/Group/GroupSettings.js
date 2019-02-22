$(document).ready(function () {

    CreateGroupHelper.CreateGroupInit();
    viewGroupManager.GetGroupDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEditGroup', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewGroupHelper.populateDataForEditButton(data);
    });
});