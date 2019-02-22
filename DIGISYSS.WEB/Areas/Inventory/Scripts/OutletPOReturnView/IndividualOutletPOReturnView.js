var IndividualOutletPOReturnViewManager = {

    GetIndividualOutletPOReturnViewDataTable: function (masterId) {
        debugger;
        $('#myTableIndividualOutletPOReturnView').dataTable().fnDestroy();
        $('#myTableIndividualOutletPOReturnView').DataTable({
            "ajax": {
                //"url": "/Inventory/OutletPOReturn/GetIndividualOutletPoReturnRequest",
                "url": "/Inventory/OutletPOReturn/GetIndividualOutletPoReturnView",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
                "data": { OutletPOReturnMasterId: masterId },
               // data: JSON.stringify({ OutletPOReturnMasterId }),
            },
            "columns": [
                { "data": "OutletPOReturnMasterId", "autoWidth": false, "visible": false },
                { "data": "OutletPOReturnDetailsId", "autoWidth": false, "visible": false },
                { "data": "WarehouseId", "autoWidth": false, "visible": false },
                { "data": "OutletId", "autoWidth": false, "visible": false },
                { "data": "ProductId", "autoWidth": false, "visible": false },
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                },
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "IsReturned", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnReturnOne" type="button">Return</button>' },
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [9],
        render: function (data, type, row) {
            if (data == 1) {
                return 'Pending';
            }
            else if (data == 2) {
                return 'Return Successful';
            }
            else {
                return "No Request";
            }
        }
    },
            ]

        });
    },

};

var viewIndividualyOutletPOReturnViewHelper = {

    CreateOutletPOReturnViewInit: function () {
        $("#btnAllIndividualOutletPORetrun").click(function () {
            debugger;
            var aObj = new Object();
            
            aObj.OutletPOReturnMasterId = $('#hdnOutletPOReturnMasterId').val();
            aObj.OutletPOReturnDetailsId = $('#hdnOutletPOReturnDetailsId').val();
            aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
            aObj.OutletPODetailsId = $("#hdnOutletPODetailsId").val();
            aObj.WarehouseId = $('#hdnWarehouseId').val();
            aObj.OutletId = $("#hdnOutletId").val();
            IndividualOutletPOReturnViewHelper.OutletPoReturnRequestByMaster(aObj);
            AllOutletPOReturnViewManager.GetAllOutletPOReturnViewDataTable();
        });
    },

    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletPO/ChangeStatusValueInMasterTable',
            //data: { OutletPOMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(OutletPOMasterId, setStatusValue),
            data: JSON.stringify({ aObj }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response, textStatus) {
                debugger;
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },

    //GetOutletPOReturnData: function () {
    //var aObj = new Object();
    //debugger;
    //aObj.OutletPOMasterId = $('#hdnOutletPOMasterId').val();
    //aObj.OutletPODetailsId = $("#hdnOutletPODetailsId").val();
    //aObj.ProductId = $("#hdnProductId").val();
    //aObj.ProductPriceId = $("#hdnProductPriceId").val();
    //aObj.SizeId = $("#cmbSizeId").val();
    //aObj.UoMId = $("#cmbUoMId").val();
    //aObj.ProductName = $("#txtProductName").val();
    //aObj.WarehouseId = $("#cmbWarehouseId").val();
    //aObj.SupplierId = $("#cmbSupplierId").val();
    //aObj.ProductMainBarcode = $("#txtProductMainBarcode").val();
    //aObj.ProductQuantity = $("#txtProductQuantity").val();
    //aObj.WholeSalePrice = $("#txtWholeSalePrice").val();
    //aObj.RetailPrice = $("#txtRetailPrice").val();
    //aObj.OutletPOReturnIsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
    //return aObj;
    //},
};

var IndividualOutletPOReturnViewHelper = {

    ClearASingleProducDataOfOutletPOReturnViewForm: function () {
        debugger;
        $("#hdnProductId").val('0');
        $("#hdnProductName").val('0');
        $("#txtRetailPrice").val('');
        $("#txtItemName").val('');
        $("#txtSize").val('');
        $("#txtUoM").val('');
        $("#txtBarcode").val('');
        $("#txtProductQuantity").val('');
        $("#txtPriceAmount").val('');
    },

    OutletPoReturnRequestByMaster: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            ///url: '/Inventory/OutletPOReturn/ReturnOutletPoByMasterId',
            url: '/Inventory/OutletPOReturn/ChangeStatusValueInMasterTable',
            data: JSON.stringify({ aObj }),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    viewOutletManager.GetOutletDataTable();
                    CreateOutletHelper.ClearOutletForm();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        });
    },

    OutletPoReturnRequestByDetails: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletPOReturn/ReturnOutletPoByDetailId',
            data: JSON.stringify({ aObj }),
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    viewOutletManager.GetOutletDataTable();
                    CreateOutletHelper.ClearOutletForm();
                }
            },
            error: function (response) {
                $("#dialog_simple").html(response.data.Message);
                $('#dialog_simple').dialog('open');
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        });
    },
};
