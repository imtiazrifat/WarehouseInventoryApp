$(document).ready(function () {
    debugger;
    CreateOutletWarrentyRepairHelper.GetOutletWarrentyRepairDataTable();
    CreateOutletWarrentyRepairHelper.CreateOutletWarrentyRepairInit();
    ViewOutletWarrentyRepairtManager.ViewOutletWarrentyRepairtDataTable();
   
});

$(document).on('click', '#btnEditOutletWarrentyRepairData', function (e) {
    debugger;
    var table = $('#myTableOutletWarrentyRepair').DataTable();
    var data = table.row($(this).parents('tr')).data();
    CreateOutletWarrentyRepairHelper.populateDataForEditButton(data);
});

$(document).on('click', '#btnEditOutletWarrentyRepairRequestedData', function (e) {
    debugger;
    var table = $('#myTable').DataTable();
    var data = table.row($(this).parents('tr')).data();
    EditOutletWarrentyRepairHelper.populateDataForEditButton(data);
});