var productId;

$(document).ready(function () {

    CreateOutletPOHelper.CreateOutletPOInit();
    viewOutletPOManager.GetOutletPODataTable();

    $('#myTable2 tbody').on('click', '#btnEditOutletPO', function (e) {
        debugger;
        var table = $('#myTable2').DataTable();
        var data = table.row($(this).parents('tr')).data();
        viewOutletPOHelper.populateDataForEditButton(data);
    });

    $('#myTable2 tbody').on('click', '#btnViewOutletPO', function (e) {
        debugger;
        var table = $('#myTable2').DataTable();
        var data = table.row($(this).parents('tr')).data();
        OutletPOMasterId = data.OutletPOMasterId;  ///////Seems unnecessary but needed when a saved PO is edited.if not get masterId then add product with previous quentity
        $('#hdnOutletPOMasterId').val(data.OutletPOMasterId);
        CreateOutletPOHelper.ClearOutletPOFormForNormalButtons();
        viewOutletPOManager.GetIndividualOutletPOViewOnly(data.OutletPOMasterId);
    });

    $('#myTable2 tbody').on('click', '#btnReceived', function (e) {
        debugger;
        //$("#myModalFroReceive #modal-body #rif").html("Are you sure to Receive?Click 'Yes' to receive else 'No'.");
        //$('#myModalFroReceive').appendTo("body").modal('show');
        //$("#btnYes").click(function () {
            debugger;
            var table = $('#myTable2').DataTable();
            var data = table.row($(this).parents('tr')).data();
            var aObj = new Object();
            aObj.OutletPOMasterId = data.OutletPOMasterId;
            aObj.OutletPODetailsId = data.OutletPODetailsId;
            aObj.Status = 4;
            viewOutletPOHelper.changeStatusValue(aObj);
            viewOutletPOManager.GetOutletPODataTable();
       // });
    });
});