var productId;
var OutletPOMasterId;
var OutletPODetailsId;
var totalPriceOfIndividualyOutletPOView;

$(document).ready(function () {

    AllOutletPOViewManager.GetAllOutletPOViewDataTable();
    UpdateASingleProducDataOfOutletPOViewHelper.CreateASingleProducDataOfOutletPOViewInit();
    viewIndividualyOutletPOViewHelper.CreateOutletPOViewInit();

    $('#popup').dialog({
        autoOpen: false,
        width: 800,
        resizable: false,
        modal: true,
        // title: "",
        //   draggable: false,
        //  position: "center",
        //  width: "800px",
        //  modal: true,
        //  title: "",
        height: 500,

        //    buttons: [
        //        {
        //            html: "<i class='fa fa-times'></i>&nbsp; Close",
        //            "class": "btn btn-default",
        //            click: function () {
        //                $(this).dialog("close");
        //            }
        //        }]
    });
    $('#popup2').dialog({
        autoOpen: false,
        width: 700,
        resizable: false,
        modal: true,
        title: "",
        //    buttons: [
        //        {
        //            html: "<i class='fa fa-times'></i>&nbsp; Close",
        //            "class": "btn btn-default",
        //            click: function () {
        //                $(this).dialog("close");
        //            }
        //        }]
    });
    $('#myTableAllOutletPOView tbody').on('click', '#btnAllOutletPOViewDetails', function (e) {
        debugger;
        var table = $('#myTableAllOutletPOView').DataTable();
        var data = table.row($(this).parents('tr')).data();
        UpdateASingleProducDataOfOutletPOViewHelper.ClearASingleProducDataOfOutletPOViewForm();
        OutletPOMasterId = parseInt(JSON.stringify(data.OutletPOMasterId));
        OutletPODetailsId = parseInt(JSON.stringify(data.OutletPODetailsId));
        $("#hdnProductId").val(data.ProductId);
        $("#textOutletName").val(data.OutletName);
        $("#txtTotalQuantity").val(data.ProductQuantity);
        $("#txtTotalPrice").val(data.TotalGrandPrice);
        //alert(typeof (OutletPOViewMasterId));
        IndividualOutletPOViewManager.GetIndividualOutletPOViewDataTable();
        debugger;
        $('#popup').dialog('open');
    });
});

$(document).on('click', '#btnEditIndividually', function (e) {
    debugger;
    var table = $('#myTableIndividualOutletPOView').DataTable();
    var data = table.row($(this).parents('tr')).data();
    OutletPOMasterId = data.OutletPOMasterId;
    OutletPODetailsId = data.OutletPODetailsId;

    ASingleProducDataOfOutletPOViewManager.getASingleProducDataOfOutletPOView(OutletPODetailsId);
    //viewApprovedPOViewByWarehouseManager.GetApprovedPOViewByWarehouseDataTable();
    debugger;
    $('#popup2').dialog('open');
});


$(document).on('click', '#btnApproveIndividually', function (e) {
    debugger;
    //$("#myModalFroApprove #modal-body #rif").html("Are you sure to approve ?Click 'Yes' to approve else 'No'.");
    //$('#myModalFroApprove').appendTo("body").modal('show');
    //$("#btnYes").click(function () {
    var table = $('#myTableIndividualOutletPOView').DataTable();
    var data = table.row($(this).parents('tr')).data();
    var aObj = new Object();
    aObj.OutletPOMasterId = data.OutletPOMasterId;
    aObj.OutletPODetailsId = data.OutletPODetailsId;
    aObj.Status = 22;
    alert("Will Impliment Later");
   // IndividualOutletPOViewHelper.ChangeStatusValueInDetailTable(aObj);
    // AllOutletPOViewManager.GetAllOutletPOViewDataTable();
    // });




});

///////////////////////////////////Normally in settings pages only button of datatable remains,and other button click event reamins its dericory page(decleared page)so this code is removed  to its normal view page just adding "viewIndividualyOutletPOViewHelper.CreateOutletPOViewInit();" in "$(document).ready" 
//$(document).on('click', '#btnApproveAllforIndidividualOutletPOView', function (e) {
//    debugger;
//    $("#myModal #modal-body #rif").html("Are You Sure to Approve All PO ? If You Want Click On 'Yes' else 'Close' ");
//    $('#myModal').appendTo("body").modal('show');

//    $("#btnYes").click(function() {
//      //=============== Ajax Call For Delete a Data========================= 
//    var aObj = new Object();
//    aObj.OutletPOMasterId = OutletPOMasterId;// Here Approve button is out side of  Datatable, for this reason we can't pass/catch  OutletPOMasterId to "aObj.OutletPOMasterId"  from "data.OutletPOMasterId".But can pass/catch through "aObj.OutletPOMasterId = aObj.OutletPOMasterId = OutletPOMasterId/$("#hdnOutletPOMasterId").val()".
//    aObj.OutletPODetailsId =OutletPODetailsId;
//    aObj.Status = 2;
//    IndividualOutletPOViewHelper.changeStatusValue(aObj);
//    AllOutletPOViewManager.GetAllOutletPOViewDataTable();
//    });
//});


$(document).on('click', '#btnRemoveIndividually', function (e) {
    debugger;
    //$("#myModalFroApprove #modal-body #rif").html("Are you sure to remove this?Click 'Yes' to remove else 'No'.");
    //$('#myModalFroApprove').appendTo("body").modal('show');
    var table = $('#myTableIndividualOutletPOView').DataTable();
    var data = table.row($(this).parents('tr')).data();
    //alert(JSON.stringify(data));
    //$("#btnYes").click(function () {
    $(this).closest('tr').remove();
    //var index = $("tr", $(this).closest("table")).index(this);             ///////////////////
    OutletPOMasterId = data.OutletPOMasterId;
    OutletPODetailsId = data.OutletPODetailsId;

    UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate();

    //});




    //var table = $('#myTableIndividualOutletPOView').DataTable();
    //var data = table.row($(this).parents('tr')).data();
    //$(this).closest('tr').remove();
    //var index = $("tr", $(this).closest("table")).index(this);
    //alert(index);
    //OutletPOData.splice(index, 1);
    //UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate();
});


//$(document).on('click', '#btnRemoveIndividually', function (e) {
//    debugger;
//    //$("#myModalFroApprove #modal-body #rif").html("Are you sure to remove this?Click 'Yes' to remove else 'No'.");
//    //$('#myModalFroApprove').appendTo("body").modal('show');
//    var table = $('#myTableIndividualOutletPOView').DataTable();
//    var data = table.row($(this).parents('tr')).data();
//    //alert(JSON.stringify(data));
//    //$("#btnYes").click(function () {

//    $(this).closest('tr').remove();
//    var index = data.indexOf(data.OutletPODetailsId);
//    OutletPOData.splice(index, 1);
//    UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate();










//    debugger;
//    //$("#myModalFroApprove #modal-body #rif").html("Are you sure to remove this?Click 'Yes' to remove else 'No'.");
//    //$('#myModalFroApprove').appendTo("body").modal('show');
//    var table = $('#myTableIndividualOutletPOView').DataTable();
//    var data = table.row($(this).parents('tr')).data();
//    //alert(JSON.stringify(data));

//    //$("#btnYes").click(function () {
//    debugger;
//    $(this).closest('tr').remove();
//    debugger;
//   // alert(JSON.stringify(data));
//    //var index = indexOf(data.OutletPODetailsId);
//    //var index = returnedData.indexOf(aObj.Item_StockId);
//    // OutletPOData.splice(index, 1);
//    var index = $("tr", $(this).closest("table")).index(this);
//    alert(index);
//        data.splice(index, 1);
//        UpdateASingleProducDataOfOutletPOViewHelper.GetOutletPOViewDataForUpdate();
//    //});
//});