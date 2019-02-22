var productId;
//var Status = 3;
var OutletPOMasterId;
var OutletPODetailsId;
var totalPriceOfIndividualyOutletPO;

$(document).ready(function () {

    ApprovedOutletPOViewByWarehouseManager.GetApprovedPOByWarehouseDataTable();

    $('#myTableApprovedOutletPOViewByWarehouse tbody').on('click', '#btnSendToOutletApprovedPOByWarehouse', function (e) {
        debugger;
        var table = $('#myTableApprovedOutletPOViewByWarehouse').DataTable();
        var data = table.row($(this).parents('tr')).data();

        var aObj = new Object();
        aObj.OutletPOMasterId = data.OutletPOMasterId;
        aObj.OutletPODetailsId = data.OutletPODetailsId;
        aObj.Status = 3;
        changeStatusValueForSendToOutletButton.changeStatusValue(aObj);
        ApprovedOutletPOViewByWarehouseManager.GetApprovedPOByWarehouseDataTable();
    });
});

var ApprovedOutletPOViewByWarehouseManager = {

    GetApprovedPOByWarehouseDataTable: function () {

        $('#myTableApprovedOutletPOViewByWarehouse').dataTable().fnDestroy();
        $('#myTableApprovedOutletPOViewByWarehouse').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPO/GetAllApprovedOutletPOViewByWarehouse",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
            },
            "columns": [
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { "data": "OutletName", "autoWidth": true },
                {
                    "data": "ApplyDate",
                    "type": "date ",
                    "render": function (value) {
                        if (value === null) return "";
                        var pattern = /Date\(([^)]+)\)/;
                        var results = pattern.exec(value);
                        var dt = new Date(parseFloat(results[1]));
                        return (dt.getDate()) + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
                    }
                },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "TotalGrandPrice", "autoWidth": true },
                { "data": "Status", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnSendToOutletApprovedPOByWarehouse" type="button">Send to Outlet</button>' },
                { "defaultContent": '<button class="btn btn-danger" id="btnCancelApprovedOutletApprovedPOByWarehouse" type="button">Cancel</button>' },
            ],
            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
        render: function (data, type, row) {
            debugger;
            //return data == '1'? 'Edited':'Pending';
            //return data == '2'? 'Approved':'Pending';
            //return data == '3'? 'On the Way':'Pending';
            //return data == '4' ? 'Received' : 'Pending';

            if (data == 2) {
                return 'Approved';
            }
            else if (data == 3) {
                return 'On the Way';
            }
            else if (data == 4) {
                return 'Received';
            }
            else {
                return "Pending";
            }
        }
    },
            ]

        });
    }

}

//var changeStatusValueForSendToOutletButton = {

//    changeStatusValue: function (aObj) {
//        debugger;
//        $.ajax({
//            type: 'POST',
//            url: '/Inventory/OutletPO/ChangeStatusValue',
//            //data: { OutletPOMasterId: 0, setStatusValue: 0 },
//            // data: JSON.stringify(OutletPOMasterId, setStatusValue),
//            data: JSON.stringify({ aObj }),
//            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            success: function (response, textStatus) {
//                debugger;
//            },
//            error: function (textStatus, errorThrown) {
//            }
//        });
//    },
//};

var changeStatusValueForSendToOutletButton = {

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletPO/ChangeStatusValue',
            //data: { OutletPOMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(OutletPOMasterId, setStatusValue),
            data: JSON.stringify({ aObj }),
            success: function (data) {
                debugger;
                if (data != null) {
                    //$("#myModal #modal-body #rif").html(data.data.Message); 
                    $("#myModal #modal-body #rif").html(data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    //viewOutletPOManager.GetOutletPODataForUpdate();
                    //CreateOutletPOHelper.ClearOutletPOForm();
                    //viewAllOutletPOManager.GetAllOutletPODataTable();
                    //viewIndividualyOutletPOManager.GetIndividualyOutletPODataTable();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: "json",
            contentType: "application/json",
        });
    },
};










//$.ajax({
//       type: 'POST',
//       url: "/Inventory/OutletPO/ChangeStatusValue",
//       data: JSON.stringify({ OutletPOMasterId: OutletPOMasterId, setStatusValue: OutletPOMasterId }),
//       //data: JSON.stringify(OutletPOData),
//       success: function (response) {
//           debugger;
//           if (response != null) {


//           }
//       },
//       error: function (response) {

//       },
//       dataType: "json",
//       contentType: "application/json",
//   });


//var changeStatusValueForSendToOutletButton = {

//    changeStatusValue: function (OutletPOMasterId, setStatusValue) {
//        alert("Hellow");
//        debugger;
//        $.ajax({
//            type: 'POST',
//            url: '/Inventory/OutletPO/ChangeStatusValue',

//            //data: { OutletPOMasterId: 0, setStatusValue: 0 },
//            // data: { },
//            data: JSON.stringify({ OutletPOMasterId: OutletPOMasterId, setStatusValue: setStatusValue }),
//            // data: JSON.stringify(OutletPOMasterId, setStatusValue),
//            dataType: 'json',
//            contentType: 'application/json; charset=utf-8',
//            success: function (response, textStatus) {
//                debugger;
//            },
//            error: function (textStatus, errorThrown) {
//            }
//        });
//    },
//};