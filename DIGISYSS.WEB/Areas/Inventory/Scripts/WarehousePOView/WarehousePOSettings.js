var productId;
var OutletPOMasterId;
var OutletPODetailsId;
var totalPriceOfIndividualyOutletPO;

$(document).ready(function () {
   
    viewAllOutletPOManager.GetAllOutletPODataTable();
    UpdateASingleProducDataOfOutletPOHelper.CreateASingleProducDataOfOutletPOInit();

   // viewIndividualyOutletPOManager.GetIndividualyOutletPODataTable();
   
    $('#myTableAllOutletPO tbody').on('click', '#btnViewAllOutletPODetails', function (e) {
        debugger;
        var table = $('#myTableAllOutletPO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletPOMasterId =parseInt(JSON.stringify(data.OutletPOMasterId)) ;
        OutletPODetailsId = parseInt(JSON.stringify(data.OutletPODetailsId));
        $("#hdnProductId").val(data.ProductId);
        $("#textOutletName").val(data.OutletName);
        $("#txtTotalQuantity").val(data.ProductQuantity);
        //alert(typeof (OutletPOMasterId));
        viewIndividualyOutletPOManager.GetIndividualyOutletPODataTable();
    });
});

    $(document).on('click', '#btnEditIndividualy', function (e) {
        debugger;
        var table = $('#myTableIndividualyOutletPO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletPOMasterId = data.OutletPOMasterId;
        OutletPODetailsId = data.OutletPODetailsId;
        viewASingleProducDataOfOutletPOManager.getASingleProducDataOfOutletPO(OutletPODetailsId);
        //viewApprovedPOByWarehouseManager.GetApprovedPOByWarehouseDataTable();
    });


    $(document).on('click', '#btnApproveIndividualy', function (e) {
        debugger;
        var table = $('#myTableIndividualyOutletPO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        var aObj = new Object();
        aObj.OutletPOMasterId = data.OutletPOMasterId;
        aObj.OutletPODetailsId = data.OutletPODetailsId;
        aObj.Status = 2;
        viewIndividualyOutletPOHelper.changeStatusValue(aObj);
        viewAllOutletPOManager.GetAllOutletPODataTable();
        viewApprovedPOByWarehouseManager.GetApprovedPOByWarehouseDataTable();
    });







    //$(document).on('click', '#btnUpdateProduct', function (e) {
    //    debugger;
    //    var table = $('#myTableIndividualyOutletPO').DataTable();
    //    var data = table.row($(this).parents('tr')).data();
    //    UpdateASingleProducDataOfOutletPOHelper.GetOutletPODataForUpdate();
    //});