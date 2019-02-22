var viewIndividualyOutletPOManager = {

    GetIndividualyOutletPODataTable: function () {
       // alert(typeof (OutletPOMasterId));

        $('#myTableIndividualyOutletPO').dataTable().fnDestroy();
        $('#myTableIndividualyOutletPO').DataTable({
            "ajax": {
                "url": "/Inventory/OutletPO/GetIndividualyOutletPO",
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
                { "defaultContent": '<button class="btn btn-primary" id="btnEditIndividualy" type="button">Edit</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnApproveIndividualy" type="button">Approve</button>' },
                { "defaultContent": '<button class="btn btn-primary" id="btnRemoveIndividualy" type="button">Remove</button>' },
            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [3],
        render: function (data, type, row) {
            debugger;
            return data == '1' ? 'Yes' : 'No';
        }
    },
            ]

        });
    },
};



//var viewIndividualyOutletPOHelper = {

//    populateDataForEditButton: function (productId) {
   
////        CreateOutletPOHelper.ClearForm();
////        alert(" INDIVIDUAL PO Edit button");
//        debugger;
        
//        viewASingleProducDataOfOutletPOManager.loadASingleProductDetails(ProductId);
////        //if (response.result[0] != null) {
////        //    $('#hdnOutletPOMasterId').val(aObj.result[0].OutletPOMasterId);
////        //    $('#hdnOutletPODetailsId').val(aObj.result[0].OutletPODetailsId);
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
//};


var viewIndividualyOutletPOHelper = {
    ClearASingleProducDataOfOutletPOForm: function () {
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
            url: '/Inventory/OutletPO/ChangeStatusValue',
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
};
