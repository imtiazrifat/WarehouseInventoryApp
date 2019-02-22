$(document).ready(function () {

    CreateItemHelper.CreateItemInit();
    viewItemManager.GetItemDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEditItem', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewItemHelper.populateDataForEditButton(data);
    });
});