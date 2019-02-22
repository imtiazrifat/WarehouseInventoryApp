


var viewDiscountManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetDiscountDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Discount/GetAllDiscount",
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
                { "data": "DiscountCode", "autoWidth": true },
                { "data": "DiscountName", "autoWidth": true },
                  { "data": "DiscountFixedAmount", "autoWidth": true },
                  { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },
            ],
        });

    },

};
var viewDiscountHelper = {

    populateDataForEditButton: function (aObj) {
        alert(aObj.DiscountId);
        CreateDiscountHelper.ClearForm();
        $("#hdnDiscountId").val(aObj.DiscountId);
        $("#txtDiscountCode").val(aObj.DiscountCode);
        $("#txtDiscountName").val(aObj.DiscountName);
        $("#txtDiscountFixedAmount").val(aObj.DiscountFixedAmount);

        ////$("#txtDiscountCode").val(aObj.DiscountCode);

        ////$("#txtPhone").val(aObj.Phone);
        ////$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
