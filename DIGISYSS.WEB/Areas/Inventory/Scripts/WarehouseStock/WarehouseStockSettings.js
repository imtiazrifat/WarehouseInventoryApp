$(document).ready(function () {

    CreateWarehouseStockHelper.CreateWarehouseStockInit();
    viewWarehouseStockManager.GetWarehouseStockDataTable();
    CreateWarehouseStockHelper.loadProductsDropDown();

    $('#myTable tbody').on('click', '#btnEditWarehouseStock', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewWarehouseStockHelper.populateDataForEditButton(data);
    });
});