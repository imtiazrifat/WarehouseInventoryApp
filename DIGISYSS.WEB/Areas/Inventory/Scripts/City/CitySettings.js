$(document).ready(function () {

    CreateCityHelper.CreateCityInit();
    viewCityManager.GetCityDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEditCity', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewCityHelper.populateDataForEditButton(data);
    });
});