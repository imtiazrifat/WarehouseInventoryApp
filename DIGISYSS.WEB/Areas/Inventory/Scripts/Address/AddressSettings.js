$(document).ready(function () {

    CreateAddressHelper.CreateAddressInit();
    viewAddressManager.GetAddressDataTable();

    $('#myTable tbody').on('click', '#btnEditAddress', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewAddressHelper.populateDataForEditButton(data);
    });
});