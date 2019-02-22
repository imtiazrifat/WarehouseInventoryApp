$(document).ready(function () {

    CreateFactoryHelper.CreateFactoryInit();
    viewFactoryManager.GetFactoryDataTable();
    

    $('#myTable tbody').on('click', '#btnEditFactory', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewFactoryHelper.populateDataForEditButton(data);
    });
});