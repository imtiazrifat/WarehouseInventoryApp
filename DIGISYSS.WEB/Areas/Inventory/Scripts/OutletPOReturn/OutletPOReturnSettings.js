var productId;

$(document).ready(function () {

    CreateOutletPOReturnHelper.CreateOutletPOReturnInit();
    ReceivedOutletPOManager.GetOutletPODataTable();
    OutletPOReturnHelper.OutletPOReturnInit();
    ViewAllOutletPOReturenRequestManager.ViewAllOutletPOReturenRequestDataTable();

    $('#myTable2 tbody').on('click', '#btnEditOutletPOReturn', function (e) {
        debugger;
        var table = $('#myTable2').DataTable();
        var data = table.row($(this).parents('tr')).data();
        ReceivedOutletPOHelper.populateDataForEditButton(data);
    });

    $('#myTable2 tbody').on('click', '#btnViewOutletPO', function (e) {
        debugger;
        var table = $('#myTable2').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletPOMasterId = data.OutletPOMasterId;
        OutletPODetailsId = data.OutletPODetailsId;
        $('#hdnOutletPOMasterId').val(data.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(data.OutletPODetailsId);
        $('#hdnWarehouseId').val(data.WarehouseId);
        $('#hdnOutletId').val(data.OutletId);
        CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
        ReceivedOutletPOManager.IndividualOutletPOView(data.OutletPOMasterId);
    });

    $('#myTableReturnOutletPO tbody').on('click', '#btnReturnOutletPO', function (e) {
        debugger;
        alert("return button of mytable222");
        var table = $('#myTableReturnOutletPO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletPOMasterId = data.OutletPOMasterId;
        OutletPODetailsId = data.OutletPODetailsId;
        $('#hdnOutletPOInvoiceMasterId').val(data.OutletPOInvoiceMasterId);
        $('#hdnOutletPOInvoiceDetailsId').val(data.OutletPOInvoiceDetailsId);
        $('#hdnOutletPOMasterId').val(data.OutletPOMasterId);
        $('#hdnOutletPODetailsId').val(data.OutletPODetailsId);
        CreateOutletPOReturnHelper.ClearOutletPOReturnFormForNormalButtons();
        OutletPOReturnManager.ReturnRequest();
    });
});