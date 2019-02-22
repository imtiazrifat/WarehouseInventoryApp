$(document).ready(function () {

    CreateOutletHelper.CreateOutletInit();
    viewOutletManager.GetOutletDataTable();



    $('#myTable tbody').on('click', '#btnEditOutlet', function (e) {
        debugger;

        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewOutletHelper.populateDataForEditButton(data);
    });
});