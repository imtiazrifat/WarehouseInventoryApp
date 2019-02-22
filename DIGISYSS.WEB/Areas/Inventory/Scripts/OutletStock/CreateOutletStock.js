
var CreateOutletStockManager = {
    SaveOutletStock: function () {
        debugger;

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());


        $.ajax({
            type: 'POST',
            url: "/Inventory/OutletStock/CreateOutletStock",
            data: JSON.stringify(CreateOutletStockHelper.GetOutletStockData()),
            //success: function (returnPayload) {
            //    debugger;
            //    console && console.log("request succeeded");
            //},
            //error: function (xhr, ajaxOptions, thrownError) {
            //    console && console.log("request failed");
            //},
            success: function (response) {
                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);
                    $('#myModal').appendTo("body").modal('show');

                    viewOutletStockManager.GetOutletStockDataTable();
                    CreateOutletStockHelper.ClearOutletStockForm();
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


     //////Load List of All products  Saved in database from Controller to Drop Down " /Inventory/Product/GetAllProductsForDd ".
    loadProductsForDropDown: function () {
        debugger;
        var b = [];
        $.ajax({
            type: 'get',
            dataType: 'json',
            cache: true,
            async: false,
            data: 'json',
            url: '/Inventory/Product/GetAllProductsForDd',
            success: function (response, textStatus) {
                b = response.data;
            },
            error: function (textStatus, errorThrown) {
                b = { id: 0, text: "No Data" };
            }
        });
        return b;
    },
};

var CreateOutletStockHelper = {

    CreateOutletStockInit: function () {
        $("#txtOutletId").val(1);
        $("#btnSaveOutletStock").click(function () {
            debugger;
            // alert("Save Button Is disabled");
            if (($("#cmbProductId").val() === '') && ($("#txtProductQuantity").val() === '')) {
                $("#myModal #modal-body #rif").html("Product and Adjusted quantiy fields are required.");
                $('#myModal').appendTo("body").modal('show');
                $('#myModal').hide(1000);
            }

            else if (($("#cmbProductId").val() === '')) {
                $("#myModal #modal-body #rif").html("Please select a product.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtAdjustedStock").val() === '')) {
                $("#myModal #modal-body #rif").html("Please provide adjust quantity.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#txtAdjustedStock").val() <= 0)) {
                $("#myModal #modal-body #rif").html("Please provide a Valid quantiy.");
                $('#myModal').appendTo("body").modal('show');
            }
            else if (($("#cmbAdjustedReason").val() ==='')) {
                $("#myModal #modal-body #rif").html("Please select a valid adjust reason.");
                $('#myModal').appendTo("body").modal('show');
            }

            else if (($("#cmbProductId").val() !== '') && ($("#txtAdjustedStock").val() > 0) && ($("#cmbAdjustedReason").val() !== '')) {
               CreateOutletStockManager.SaveOutletStock();
            }

            
        });

        $("#btnClearOutletStockForm").click(function () {
            debugger;
            $("#btnSaveOutletStock").Text = "Update";
            CreateOutletStockHelper.ClearOutletStockForm();
        });
    },

 loadProductsDropDown: function () {
        var productName = CreateOutletStockManager.loadProductsForDropDown();
        debugger;
        $("#cmbProductId").select2({
            placeholder: "Select a Product",
            data: productName
        });
    },
    popupInit: function () {
        debugger;
    },

   
    ClearOutletStockForm: function () {
        debugger;
        $('#hdnOutletStockId').val(0);
        $("#cmbProductId").val('').trigger("change");
        $("#cmbOutletId").val('').trigger("change");
        $("#cmbAdjustedReason").val('').trigger("change");
        $('#txtProductName').val('');
        $("#txtOutletName").val('');
        $("#txtOutletStockQuantity").val('');
        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
    },

    GetOutletStockData: function () {
        debugger;
        var aObj = new Object();
        aObj.OutletStockId = $('#hdnOutletStockId').val();
        aObj.ProductId = $('#cmbProductId').val();
        aObj.ProductName = $('#cmbProductName').val();
        aObj.OutletId = $("#txtOutletId").val();
        
        aObj.AdjustedReasonId = $("#cmbAdjustedReasonId").val();
        aObj.AdjustedReason = $("#cmbAdjustedReason").val();
        aObj.Note = $("#cmbAdjustedReason").val();
        
        aObj.OutletName = $("#txtOutletName").val();
        //aObj.OutletStockQuantity = $("#txtOutletStockQuantity").val();
        aObj.OutletStockQuantity = $("#txtAdjustedStock").val();/////////since OutletStockQuantity showing sum of current stock and there are no field name like "AdjustedStock".so to add OutletStockQuantity must to send as OutletStockQuantity to database.
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        if ((aObj.Note) === 'Damage') {

            aObj.InOut = 2;
        }
        else if ((aObj.Note) === 'Overflow') {

            aObj.InOut = 1;
        }
        else  {

            aObj.InOut = 2;
        }

        return aObj;
    },
};