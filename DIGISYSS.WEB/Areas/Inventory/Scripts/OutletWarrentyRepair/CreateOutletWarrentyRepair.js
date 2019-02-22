var a = 0;
var OutletSaleInvoiceData = [];

var CreateOutletWarrentyRepairManager = {

    SaveOutletWarrentyRepairData: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletWarrentyRepair/CreateOutletWarrentyRepair",
            data: JSON.stringify(CreateOutletWarrentyRepairHelper.GetOutletWarrentyRepairData()),

            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    //CreateOutletWarrentyRepairHelper.ClearOutletWarrentyRepairForm();
                    ViewOutletWarrentyRepairtManager.ViewOutletWarrentyRepairtDataTable();

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

    getDetailsbyOutletSaleInvoiceNo: function (SaleInvoiceNo) {  //////////////When two objects are sent/pass from here through "CreateOutletWarrentyRepairManager.LoadViewData(response);". 
        debugger;
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            url: '/Inventory/OutletInvoice/GetDetailsByOutletSaleInvoiceNo',
            data: { OutletSaleInvoiceNo: SaleInvoiceNo },
            success: function (response, textStatus) {
                debugger;
                CreateOutletWarrentyRepairManager.LoadViewData(response);
                if (response.result[0] != null) {
                    debugger;
                }
            },
            error: function (textStatus, errorThrown) {
            }
        });
    },

    LoadViewData: function (aData) { ///////////////////If two(2) objects are send by "CreateOutletWarrentyRepairManager.LoadViewData(response);" Causes Response get two object named one is "Data" and another one is "Data2".
        debugger;
        OutletSaleInvoiceData = [];
        OutletSaleInvoiceData = aData.Data2;
        CreateOutletWarrentyRepairHelper.GetOutletWarrentyRepairDataTable();

        var data = aData.Data;
        $("#hdnOutletInvoiceMasterId").val(data[0].OutletInvoiceMasterId);
        $("#hdnWarehouseId").val(data[0].WarehouseId);
        $("#hdnOutletId").val(data[0].OutletId);
        $("#hdnProductId").val(data[0].ProductId);
    },
};


var CreateOutletWarrentyRepairHelper = {
    CreateOutletWarrentyRepairInit: function () {
        debugger;
        $("#btnSearchOutletSaleInvoiceNo").click(function () {
            debugger;
            var OutletSaleInvoiceNo = parseInt($("#txtOutletSaleInvoiceNo").val());
            if (isNaN(OutletSaleInvoiceNo)) { OutletSaleInvoiceNo = 0; }
            if ((OutletSaleInvoiceNo != null) && (OutletSaleInvoiceNo > 0)) {
                CreateOutletWarrentyRepairHelper.ClearOutletWarrentyRepairFormNormal();
                CreateOutletWarrentyRepairManager.getDetailsbyOutletSaleInvoiceNo(OutletSaleInvoiceNo);
            }
        });

        $("#btnSaveOutletWarrentyRepairData").click(function () {
            debugger;
            var OutletWarrentyRepairId = parseInt($("#hdnOutletWarrentyRepairId").val());
            if (isNaN(OutletWarrentyRepairId)) { OutletWarrentyRepairId = 0; }
            if (($("#txtProductName").val() === '') && ($("#txtProblem").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Product Name, Problem and Product Quantiy Fields are Required.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtPurchaseDate").val() === '')) {
                $("#myModal #modal-body #rif").html("Please provide purchase date.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtReturnDate").val() === '')) {
                $("#myModal #modal-body #rif").html("Please provide return date.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtProblem").val() === '')) {
                $("#myModal #modal-body #rif").html("Please write  problem details.");
                $('#myModal').appendTo("body").modal('show');
            }
           else if ((OutletWarrentyRepairId >= 0) && ($("#txtProductName").val() !== '') && (($("#txtProblem").val() !== '') && ($("#txtPurchaseDate").val() !== '') && ($("#txtReturnDate").val() !== ''))) {
                CreateOutletWarrentyRepairManager.SaveOutletWarrentyRepairData();
           }
           else {
               $("#myModal #modal-body #rif").html("Error warrenty request can not be sent.");
               $('#myModal').appendTo("body").modal('show');
           }
        });

        $("#btnClearAllData").click(function () {
            CreateOutletWarrentyRepairHelper.ClearOutletWarrentyRepairForm();
        });
    },

    GetOutletWarrentyRepairDataTable: function () {
        debugger;
        $('#myTableOutletWarrentyRepair').dataTable().fnDestroy();
        $('#myTableOutletWarrentyRepair').DataTable({
            data: OutletSaleInvoiceData,
            "columns": [
                { "data": "OutletSaleInvoiceNo", "autoWidth": false, "visible": false },
                { "data": "OutletId", "autoWidth": false, "visible": false },
                { "data": "ProductId", "autoWidth": false, "visible": false },
                {
                    "data": "SL.", render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }, "width": "2%"
                },
                { "data": "ProductName", "width": "10%" },
                { "data": "ProductMainBarcode", "width": "10%" },
                { "data": "UoMShortName", "width": "2%" },
                { "data": "ProductQuantity", "width": "2%" },
                { "data": "RetailPrice", "width": "7%" },
                { "data": "VAT", "width": "5%" },
                { "data": "TotalPrice", "width": "10%" },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditOutletWarrentyRepairData" type="button"><span class="glyphicon glyphicon-edit"></button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-primary" id="btnSaleReturn" type="button">Return</button>', "width": "5%" },
                //{ "defaultContent": '<button class="btn btn-danger" id="btnRemoveOutletWarrentyRepairData" type="button"><span class="glyphicon glyphicon-remove"></button>', "width": "5%" },
            ],
        });
    },

    populateDataForEditButton: function (aObj) {
        debugger;
        CreateOutletWarrentyRepairHelper.ClearOutletWarrentyRepairFormNormal();
        var purchaseDate = aObj.CreatedDate;
        if ((purchaseDate) == null) { purchaseDate = ''; }
        else {
            purchaseDate = new Date(parseInt(aObj.CreatedDate.substr(6)));
            //purchaseDate = purchaseDate.getDate() + "-" + (purchaseDate.getMonth() + 1) + "-" + purchaseDate.getFullYear();
            purchaseDate = purchaseDate.getDate() + "." + (purchaseDate.getMonth() + 1) + "." + purchaseDate.getFullYear();
        }
        var returnDate = aObj.ReturnDate;
        if ((returnDate) == null) { returnDate = ''; }
        else {
            returnDate = new Date(parseInt(aObj.ReturnDate.substr(6)));
            returnDate = returnDate.getDate() + "." + (returnDate.getMonth() + 1) + "." + returnDate.getFullYear();
        }

        $('#hdnOutletWarrentyRepairId').val(aObj.OutletWarrentyRepairId);
        $('#hdnOutletInvoiceId').val(aObj.OutletInvoiceId);
        $('#hdnOutletSaleInvoiceNo').val(aObj.OutletSaleInvoiceNo);
        $('#hdnWarehouseId').val(aObj.WarehouseId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $('#hdnCreatedDate').val(aObj.CreatedDate);
        $("#txtProductName").val(aObj.ProductName);
        
        $("#txtWarrentyType").val(aObj.WarrentyType);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPurchaseDate").val(purchaseDate);
        $("#txtReturnDate").val(returnDate);
        $("#txtProblem").val(aObj.Problem);
        $("#txtRepairCost").val(aObj.RepairCost);
    },

    GetOutletWarrentyRepairData: function () {
         debugger;
        var aObj = new Object();
        aObj.OutletWarrentyRepairId = $('#hdnOutletWarrentyRepairId').val();
        aObj.OutletInvoiceId = $('#hdnOutletInvoiceId').val();
        aObj.OutletSaleInvoiceNo = $('#hdnOutletSaleInvoiceNo').val();
        aObj.RepairTokenNo = $('#hdnRepairTokenNo').val();
        //aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.OutletId = $('#hdnOutletId').val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.WarrentyId = $("#cmbWarrentyId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.PurchaseDate = $('#txtPurchaseDate').datepicker('getDate');
        aObj.ReturnDate = $("#txtReturnDate").datepicker('getDate');
        aObj.Problem = $("#txtProblem").val();
        aObj.WarrentyType = $("#txtWarrentyType").val();
        aObj.RepairCost = $("#txtRepairCost").val();

        return aObj;
    },

    ClearOutletWarrentyRepairFormNormal: function () {
        $("#txtProductName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtProblem").val('');
        $("#txtPurchaseDate").val('');
        $("#txtReturnDate").val('');
        $("#txtWarrentyType").val('');
        $("#txtWarrentyType").val('');
        $("#txtRepairCost").val('');
    },

    ClearOutletWarrentyRepairForm: function () {
        CreateOutletWarrentyRepairHelper.ClearOutletWarrentyRepairFormNormal();
        $('#hdnOutletWarrentyRepairId').val(0);
        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $('#hdnOutletSaleInvoiceNo').val(0);
        $('#txtRepairTokenNo').val(0);
        $("#txtProductName").val('');
        $("#cmbWarehouseId").val('').trigger("change");
        $("#cmbProductId").val('').trigger("change");
        $("#txtProductQuantity").val('');

        OutletSaleInvoiceData = [];
        CreateOutletWarrentyRepairHelper.GetOutletWarrentyRepairDataTable();
    },
}



