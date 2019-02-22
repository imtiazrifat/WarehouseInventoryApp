/// <reference path="ViewCategory.js" />



var viewCategoryManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>

    GetCategoryDataTable: function () {
        debugger;
        $("#myTable").dataTable().fnDestroy();
        $("#myTable").DataTable({
            "ajax": {
                "url": "/Inventory/Category/GetAllCategory",
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
                { "data": "CategoryCode", "autoWidth": true },

                { "data": "CategoryName", "autoWidth": true },
                 { "data": "CategoryDetails", "autoWidth": true },
                  //{ "data": "FixedAmount", "autoWidth": true },


               { "defaultContent": '<button class="btn btn-primary" id="btnEdit" type="button">Edit</button>' },

            ],
        });

    },

};
var viewCategoryHelper = {

    populateDataForEditButton: function (aObj) {

        CreateCategoryHelper.ClearForm();
        $('#hdnCategoryId').val(aObj.CategoryId);
        $("#txtCategoryCode").val(aObj.CategoryCode);
        $("#txtCategoryName").val(aObj.CategoryName);
        $("#txtCategoryDetails").val(aObj.CategoryDetails);
        //$("#txtFixedAmount").val(aObj.FixedAmount);
        //$("#txtCategoryCode").val(aObj.CategoryCode);

        //$("#txtPhone").val(aObj.Phone);
        //$("#taNote").val(aObj.Note);
        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
    },

};
