var a = 0;
var OutletWarrentyData = [];

var IndividualOutletWarrentyManager = {

    SaveOutletWarrentyData: function () {
        debugger;
        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletWarrentyRepair/SaveOutletWarrentyDataFromWarehouse",
            data: JSON.stringify(IndividualOutletWarrentyHelper.GetOutletWarrentyData()),

            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');
                    AllOutletWarrentyViewManager.OutletWarrentyViewDataTable();
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


var IndividualOutletWarrentyHelper = {
    IndividualOutletWarrentyInit: function () {
        debugger;

        $("#btnSaveOutletWarrentyData").click(function () {
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
            else if (($("#cmbRepairStatus").val() === '')) {
                $("#myModal #modal-body #rif").html("Please select a repair status.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if ((OutletWarrentyRepairId >= 0) && ($("#txtProductName").val() !== '') && (($("#txtProblem").val() !== '') && ($("#txtPurchaseDate").val() !== '') && ($("#txtReturnDate").val() !== ''))) {
                IndividualOutletWarrentyManager.SaveOutletWarrentyData();
            }
            else {
                $("#myModal #modal-body #rif").html("Error warrenty request can not be sent.");
                $('#myModal').appendTo("body").modal('show');
            }
        });

        $("#btnClearAllData").click(function () {
            IndividualOutletWarrentyHelper.ClearOutletWarrentyForm();
        });
    },


    populateDataForEditButton: function (aObj) {
        debugger;
        IndividualOutletWarrentyHelper.ClearOutletWarrentyFormNormal();
        var purchaseDate = aObj.PurchaseDate;
        if ((purchaseDate) == null) { purchaseDate = ''; }
        else {
            purchaseDate = new Date(parseInt(aObj.PurchaseDate.substr(6)));
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
        $('#hdnRepairTokenNo').val(aObj.RepairTokenNo);
        $('#hdnWarehouseId').val(aObj.WarehouseId);
        $('#hdnOutletId').val(aObj.OutletId);
        $('#hdnProductId').val(aObj.ProductId);
        $("#txtProductName").val(aObj.ProductName);
        $("#cmbRepairStatus").val(aObj.RepairStatus).trigger("change");
        $("#txtWarrentyType").val(aObj.WarrentyType);
        $("#txtProductQuantity").val(aObj.ProductQuantity);
        $("#txtPurchaseDate").val(purchaseDate);
        $("#txtReturnDate").val(returnDate);
        $("#txtProblem").val(aObj.Problem);
        $("#txtRepairCost").val(aObj.RepairCost);
    },

    GetOutletWarrentyData: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletWarrentyRepairId = $('#hdnOutletWarrentyRepairId').val();
        aObj.OutletInvoiceId = $('#hdnOutletInvoiceId').val();
        aObj.OutletSaleInvoiceNo = $('#hdnOutletSaleInvoiceNo').val();
        aObj.RepairTokenNo = $('#hdnRepairTokenNo').val();
        aObj.WarehouseId = $('#hdnWarehouseId').val();
        aObj.OutletId = $('#hdnOutletId').val();
        aObj.ProductId = $("#hdnProductId").val();
        aObj.WarrentyId = $("#cmbWarrentyId").val();
        aObj.ProductQuantity = $("#txtProductQuantity").val();
        aObj.PurchaseDate = $('#txtPurchaseDate').datepicker('getDate');
        aObj.ReturnDate = $("#txtReturnDate").datepicker('getDate');
        aObj.Problem = $("#txtProblem").val();
        aObj.WarrentyType = $("#txtWarrentyType").val();
        aObj.Cost = $("#txtCost").val();
        aObj.RepairStatus = $("#cmbRepairStatus").val();
        aObj.RepairCost = $("#txtRepairCost").val();
        aObj.Note = $("#txtNote").val();

        return aObj;
    },

    ClearOutletWarrentyFormNormal: function () {
        $("#txtProductName").val('');
        $("#cmbProductId").val('').trigger("change");
        $("#cmbRepairStatus").val('').trigger("change");
        $("#txtProductQuantity").val('');
        $("#txtProblem").val('');
        $("#txtPurchaseDate").val('');
        $("#txtReturnDate").val('');
        $("#txtWarrentyType").val('');
        $("#txtWarrentyType").val('');
        $("#txtRepairCost").val('');
        $("#txtCost").val('');
        $("#txtNote").val('');
    },

    ClearOutletWarrentyForm: function () {
        IndividualOutletWarrentyHelper.ClearOutletWarrentyFormNormal();
        $('#hdnOutletWarrentyRepairId').val(0);
        $('#hdnOutletInvoiceMasterId').val(0);
        $('#hdnOutletInvoiceDetailsId').val(0);
        $('#hdnOutletSaleInvoiceNo').val(0);
        $('#hdnRepairTokenNo').val(0);

        AllOutletWarrentyViewManager.OutletWarrentyViewDataTable();
    },
}



