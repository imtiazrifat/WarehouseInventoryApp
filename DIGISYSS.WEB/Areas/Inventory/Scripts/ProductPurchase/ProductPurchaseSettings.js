$(document).ready(function () {

    CreateProductPurchaseHelper.CreateProductPurchaseInit();
    viewProductPurchaseManager.GetProductPurchaseDataTable();




    $('#myTable tbody').on('click', '#btnEditProductPurchase', function (e) {
        debugger;
        var table = $('#myTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewProductPurchaseHelper.populateDataForEditButton(data);
         $("#divProductPurchaseDetails").show(1000);
    });


    



});