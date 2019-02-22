var productId;

$(document).ready(function () {

    CreateWarehousePOReturnHelper.CreateWarehousePOReturnInit();
    viewWarehousePOReturnManager.GetWarehousePOReturnDataTable();

    $('#myTableWarehousePO tbody').on('click', '#btnEditWarehousePOReturn', function (e) {
        debugger;
        var table = $('#myTableWarehousePO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewWarehousePOReturnHelper.populateDataForEditButton(data);
    });

    $('#myTableWarehousePO tbody').on('click', '#btnViewWarehousePO', function (e) {
        debugger;
        var table = $('#myTableWarehousePO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        //WarehousePOMasterId = data.WarehousePOMasterId;
        $('#hdnWarehousePOMasterId').val(data.WarehousePOMasterId);
        CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();
        viewWarehousePOReturnManager.GetIndividualWarehousePOReturnViewOnly(data.WarehousePOMasterId);
    });

    $('#myTableWarehousePO tbody').on('click', '#btnReturnWarehousePO', function (e) {
        debugger;
        var table = $('#myTableWarehousePO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        //WarehousePOMasterId = data.WarehousePOMasterId;
        $('#hdnWarehousePOMasterId').val(data.WarehousePOMasterId);
        CreateWarehousePOReturnHelper.ClearWarehousePOReturnFormForNormalButtons();
        viewWarehousePOReturnManager.GetIndividualWarehousePOReturnViewOnly(data.WarehousePOMasterId);
    });

   
});