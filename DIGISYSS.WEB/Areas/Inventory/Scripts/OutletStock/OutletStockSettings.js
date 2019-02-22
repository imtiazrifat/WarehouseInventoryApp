$(document).ready(function () {

    CreateOutletStockHelper.CreateOutletStockInit();
    viewOutletStockManager.GetOutletStockDataTable();
    CreateOutletStockHelper.loadProductsDropDown();
    //adjustReason.loadAdjustReasonInDD();

    $('#myTable tbody').on('click', '#btnEditOutletStock', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewOutletStockHelper.populateDataForEditButton(data);
    });
});