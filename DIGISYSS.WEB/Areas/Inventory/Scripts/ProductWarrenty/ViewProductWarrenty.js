/// <reference path="ViewProductWarrenty.js" />



var viewProductWarrentyManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetProductWarrentyDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/ProductWarrenty/GetAllProductWarrenty",
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
                { "data": "ProductId", "autoWidth": true },

                { "data": "IsReplacementWarrenty", "autoWidth": true },
                 { "data": "WarrentyPeriodId", "autoWidth": true },
                  { "data": "WarrentyExpireDate", "autoWidth": true },
                  { "data": "ServicePeriod", "autoWidth": true },
                  { "data": "WarrentyDescription", "autoWidth": true },
                  { "data": "Ex1", "autoWidth": true },


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewProductWarrentyHelper = {

    populateDataForEditButton: function (aObj) {

        CreateProductWarrentyHelper.ClearForm();
        $('#hdnProductWarrentyId').val(aObj.ProductWarrentyId);
        $("#txtProductId").val(aObj.ProductId);
        //$("#chkIsPlacementWarrenty").val(aObj.IsReplacementWarrenty);
        if (aObj.IsReplacementWarrenty == 1) {
            $("#chkIsPlacementWarrenty").prop('checked', 'checked');
        } else {
            $("#chkIsPlacementWarrenty").removeProp('checked', 'checked');
        }
        $("#txtWarrentyPeriodId").val(aObj.WarrentyPeriodId);
        $("#txtWarrentyExpireDate").val(aObj.WarrentyExpireDate);
        $("#txtServicePeriod").val(aObj.ServicePeriod);
        $("#txtWarrentyDescription").val(aObj.WarrentyDescription);
        $("#txtEx1").val(aObj.Ex1);
        //$("#txtProductWarrentyCode").val(aObj.ProductWarrentyCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
