var productId;
var WarehousePOMasterId;
var WarehousePODetailsId;
var WarehousePOItemReceivedId;
var totalPriceOfIndividualyWarehousePOView;
var ProductListForViewButtonOfWarehusePO = [];

$(document).ready(function () {

    CreateWarehousePOHelper.CreateWarehousePOInit();
    viewWarehousePOManager.GetWarehousePOSavedDataTable();
    UpdateASingleProducDataOfWarehousePOViewHelper.CreateASingleProducDataOfWarehousePOViewInit();
   
    $('#myTableAddProductToSendRequest tbody').on('click', '#btnEditWarehousePO', function (e) {
        debugger;
        var table = $('#myTableAddProductToSendRequest').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewWarehousePOHelper.populateDataForEditButton(data);///
    });

    $('#myTableViewWarehousePO tbody').on('click', '#btnViewWarehousePO', function (e) {
        debugger;
        var table = $('#myTableViewWarehousePO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        $('#hdnWarehousePOMasterId').val(data.WarehousePOMasterId);
        //  WarehousePOMasterId = parseInt(JSON.stringify(data.WarehousePOMasterId));

        IndividualWarehousePOViewManager.GetIndividualWarehousePOViewOnly(data.WarehousePOMasterId);
        // ProductListForViewButtonOfWarehusePO.push(data);////// Here just passes a single row,but have to send  list of data from Individual Warehouse Po Controller and must generate a foreeach loop to ViewWarhehousePo Datatable.
        //CreateWarehousePOHelper.GetWarehousePODataTable();
      });


      $('#myTableViewWarehousePO tbody').on('click', '#btnProcessforIndividualWarehousePOTable', function (e) {
        debugger;
        var table = $('#myTableViewWarehousePO').DataTable();
        var data = table.row($(this).parents('tr')).data();
        UpdateASingleProducDataOfWarehousePOViewHelper.ClearASingleProducDataOfWarehousePOViewForm();
        WarehousePOMasterId = parseInt(JSON.stringify(data.WarehousePOMasterId));
        WarehousePODetailsId = parseInt(JSON.stringify(data.WarehousePODetailsId));
        $("#hdnProductId").val(data.ProductId);
        $("#textWarehouseName").val(data.WarehouseName);
        $("#txtTotalQuantity").val(data.ProductQuantity);
          //alert(typeof (WarehousePOViewMasterId));
        IndividualWarehousePOViewManager.GetIndividualWarehousePOViewDataTable();
      });

      $(document).on('click', '#btnReceiveAllforIndidividualOutletPOView', function (e) {
          debugger;
          var table = $('#myTableIndividualWarehousePOView').DataTable();
          var data = table.row($(this).parents('tr')).data();
          var aObj = new Object();
          aObj.WarehousePOMasterId = WarehousePOMasterId;
          aObj.WarehousePODetailsId = WarehousePODetailsId;
          aObj.Status = 4;
          IndividualWarehousePOViewHelper.changeStatusValue(aObj);
          viewWarehousePOManager.GetWarehousePOSavedDataTable();
          IndividualWarehousePOViewManager.GetIndividualWarehousePOViewDataTable();
         
      });
     
      $(document).on('click', '#btnPartialReceive', function (e) {
          debugger;
          var table = $('#myTableIndividualWarehousePOView').DataTable();
          var data = table.row($(this).parents('tr')).data();
          UpdateASingleProducDataOfWarehousePOViewHelper.ClearASingleProducDataOfWarehousePOViewForm();
          WarehousePOMasterId = data.WarehousePOMasterId;
          WarehousePODetailsId = data.WarehousePODetailsId;
          WarehousePOItemReceivedId = data.WarehousePOItemReceivedId;
          ASingleProducDataOfWarehousePOViewManager.getASingleProducDataOfWarehousePOView(WarehousePODetailsId);
         // UpdateASingleProducDataOfWarehousePOViewHelper.CreateASingleProducDataOfWarehousePOViewInit();/////must be intitailize here or IN Document Ready else laterly used  of different button will not work on click event. In Outlet PO order View another one is dicleared in Document Ready.For Another Example Go to Outlet PO
      });
});





 