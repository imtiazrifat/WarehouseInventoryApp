var IndividualOutletPOViewManager = {

    GetIndividualOutletPOViewDataTable: function () {
        // alert(typeof (OutletPOViewMasterId));

        $('#myTableIndividualOutletPOView').dataTable().fnDestroy();
        $('#myTableIndividualOutletPOView').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPO/GetIndividualOutletPOView",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',
                "data":{ OutletPOMasterId: OutletPOMasterId },
            },
            "columns": [
                {
                     "data": "SL.", render: function (data, type, row, meta) {
                         return meta.row + meta.settings._iDisplayStart + 1;
                     }
                 },
                { "data": "ProductName", "autoWidth": true },
                { "data": "ProductQuantity", "autoWidth": true },
                { "data": "PriceAmount", "autoWidth": true },
                { "data": "IsEdited", "autoWidth": true },
                { "defaultContent": '<button class="btn btn-primary" id="btnEditIndividually" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnApproveIndividually" type="button">Approve</button>' },
                { "defaultContent": '<button class="btn btn-danger" id="btnRemoveIndividually" type="button">Remove</button>' },
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [4],
        render: function (data, type, row) {
            return data == '1' ? 'Yes' : 'No';
        }
    },
            ]

        });
    },

};



var viewIndividualyOutletPOViewHelper = {

    CreateOutletPOViewInit: function () {
        $("#btnApproveAllforIndidividualOutletPOView").click(function () {
            debugger;
            //$("#myModalFroApprove #modal-body #rif").html("Are you sure to approve all?Click 'Yes' to approve else 'No'.");
            //$('#myModalFroApprove').appendTo("body").modal('show');
            //$("#btnYes").click(function () {
            var aObj = new Object();
            aObj.OutletPOMasterId = OutletPOMasterId;// Here Approve button is out side of  Datatable, for this reason we can't pass/catch  OutletPOMasterId to "aObj.OutletPOMasterId"  from "data.OutletPOMasterId".But can pass/catch through "aObj.OutletPOMasterId = aObj.OutletPOMasterId = OutletPOMasterId/$("#hdnOutletPOMasterId").val()".
            aObj.OutletPODetailsId = OutletPODetailsId;
            aObj.Status = 2;
            IndividualOutletPOViewHelper.changeStatusValue(aObj);
            AllOutletPOViewManager.GetAllOutletPOViewDataTable();
            //});
        });
    }



    //    POViewpulateDataForEditButton: function (productId) {
   
    ////        CreateOutletPOViewHelper.ClearForm();
    ////        alert(" INDIVIDUAL POView Edit button");
    //        debugger;
        
    //        viewASingleProducDataOfOutletPOViewManager.loadASingleProductDetails(ProductId);
    ////        //if (response.result[0] != null) {
    ////        //    $('#hdnOutletPOViewMasterId').val(aObj.result[0].OutletPOViewMasterId);
    ////        //    $('#hdnOutletPOViewDetailsId').val(aObj.result[0].OutletPOViewDetailsId);
    ////        //    $("#hdnProductId").val(response.result[0].ProductId);
    ////        //    $("#hdnProductName").val(response.result[0].ProductName);
    ////        //    $("#txtRetailPrice").val(response.result[0].RetailPrice);
    ////        //    $("#txtProductQuantity").val(aObj.result[0].ProductQuantity);
    ////        //    $("#txtItemName").val(response.result[0].ItemName);
    ////        //    $("#txtSize").val(response.result[0].SizeName);
    ////        //    $("#txtUoM").val(response.result[0].UoMShortName);
    ////        //    $("#txtBarcode").val(response.result[0].ProductMainBarcode);
    ////        //    $("#txtPriceAmount").val($("#txtRetailPrice").val() * $("#txtProductQuantity").val());
    ////        //    debugger;
    ////        //}
    //    },
};


var IndividualOutletPOViewHelper = {

    ClearASingleProducDataOfOutletPOViewForm: function () {
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



    changeStatusValue: function (aObj) {
        debugger;
        $.ajax({
            type: 'POST',
            url: '/Inventory/OutletPO/ChangeStatusValueInMasterTable',
            //data: { OutletPOViewMasterId: 0, setStatusValue: 0 },
            // data: JSON.stringify(OutletPOViewMasterId, setStatusValue),
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
//RemoveReturnedData: function (aObj) {
       
//    var index = returnedData.indexOf(aObj.Item_StockId);
//    if(index>-1)
//        returnedData.splice(index, 1);
//},