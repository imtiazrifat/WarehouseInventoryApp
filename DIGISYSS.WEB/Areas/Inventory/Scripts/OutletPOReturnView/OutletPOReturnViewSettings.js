var productId;
var OutletPOMasterId;
var OutletPODetailsId;
var totalPriceOfIndividualyOutletPOReturnView;


$(document).ready(function () {

    AllOutletPOReturnViewManager.GetAllOutletPOReturnViewDataTable();
    viewIndividualyOutletPOReturnViewHelper.CreateOutletPOReturnViewInit();
    $('#popup').dialog({
        autoOpen: false,
        width: 800,
        resizable: false,
        modal: true,
        height: 500,
    });

    $('#myTableAllOutletPOReturnView tbody').on('click', '#btnAllOutletPOReturnViewDetails', function (e) {
        debugger;
        var table = $('#myTableAllOutletPOReturnView').DataTable();
        var data = table.row($(this).parents('tr')).data();

        //OutletPOReturnMasterId = data.OutletPOReturnMasterId;
        //$('#hdnOutletPOMasterId').val(data.OutletPOMasterId);
        //$('#hdnOutletPODetailsId').val(data.OutletPODetailsId);
        $("#hdnProductId").val(data.ProductId);
        $("#textOutletName").val(data.OutletName);
        $("#txtTotalQuantity").val(data.ProductQuantity);
        $("#txtTotalPrice").val(data.TotalGrandPrice);
        //OutletPOReturnMasterId = data.OutletPOReturnMasterId;
        IndividualOutletPOReturnViewManager.GetIndividualOutletPOReturnViewDataTable(data.OutletPOReturnMasterId);
        $('#popup').dialog('open');
    });
});

$(document).on('click', '#btnReturnOne', function (e) {
    debugger;
    var table = $('#myTableIndividualOutletPOReturnView').DataTable();
    var data = table.row($(this).parents('tr')).data();
    var aObj = new Object();
  
    $('#hdnOutletPOMasterId').val(data.OutletPOMasterId);
    $('#hdnOutletPODetailsId').val(data.OutletPODetailsId);
    aObj.OutletPOMasterId = data.OutletPOMasterId;
    aObj.OutletPODetailsId = data.OutletPODetailsId;
    IndividualOutletPOReturnViewHelper.OutletPoReturnRequestByDetails(aObj);
});

