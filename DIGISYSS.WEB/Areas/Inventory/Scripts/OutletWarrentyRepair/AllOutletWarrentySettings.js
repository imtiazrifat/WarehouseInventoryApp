$(document).ready(function () {
    debugger;
    AllOutletWarrentyViewManager.OutletWarrentyViewDataTable();
    IndividualOutletWarrentyHelper.IndividualOutletWarrentyInit();
      $('#popup').dialog({
        autoOpen: false,
        width: 800,
        resizable: false,
        modal: true,
        height: 500,
      });

      $('#myTable tbody').on('click', '#btnEditOutletWarrentyData', function (e) {
          debugger;
          var table = $('#myTable').DataTable();
          var data = table.row($(this).parents('tr')).data();
          IndividualOutletWarrentyHelper.populateDataForEditButton(data);
          $('#popup').dialog('open');
      });
 });

//$(document).on('click', '#btnEditOutletWarrentyRepairData', function (e) {
//    debugger;
//    var table = $('#myTableOutletWarrentyRepair').DataTable();
//    var data = table.row($(this).parents('tr')).data();
//    CreateOutletWarrentyRepairHelper.populateDataForEditButton(data);
//});

//$(document).on('click', '#btnEditOutletWarrentyRepairRequestedData', function (e) {
//    debugger;
//    var table = $('#myTable').DataTable();
//    var data = table.row($(this).parents('tr')).data();
//    EditOutletWarrentyRepairHelper.populateDataForEditButton(data);
//});