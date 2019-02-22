$(document).ready(function () {

    CreateInvProductrHelper.CreateInvProductrInit();
    viewInvProductrManager.GetInvProductrDataTable();

    //viewDepartmentManager.GetDepartmentDataTable();



    //$("#btnSvaeDepartment").click(function () {
    //    debugger;
    //    createDepartmentManager.SaveDepartment();

    //});

    $('#myTable tbody').on('click', '#btnEditInvProductr', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewInvProductrHelper.populateDataForEditButton(data);
    });
});