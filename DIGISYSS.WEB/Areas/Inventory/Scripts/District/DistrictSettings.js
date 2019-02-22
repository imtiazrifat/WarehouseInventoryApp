$(document).ready(function () {

    CreateDistrictHelper.CreateDistrictInit();
    viewDistrictManager.GetDistrictDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();
    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();
    //});

    $('#myTable tbody').on('click', '#btnEditDistrict', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewDistrictHelper.populateDataForEditButton(data);
    });
});