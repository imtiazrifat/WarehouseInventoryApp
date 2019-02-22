$(document).ready(function () {

    CreateWareHouseHelper.CreateWareHouseInit();
    viewWareHouseManager.GetWareHouseDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEdit', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewWareHouseHelper.populateDataForEditButton(data);
    });
});