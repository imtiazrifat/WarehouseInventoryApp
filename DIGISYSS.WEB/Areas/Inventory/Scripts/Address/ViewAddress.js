var viewAddressManager = {

    // Load datatable css 
    //<link href="//cdn.datatables.net/1.10.9/css/jquery.dataTables.min.css" rel="stylesheet" />
    //Load datatable js 

    // <script src="//cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
    GetAddressDataTable: function () {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Address/GetAllAddress",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',

            },
            "columns": [
          {"data": "id",render: function (data, type, row, meta) {
                  return meta.row + meta.settings._iDisplayStart + 1;
              }
          },

                { "data": "AddressId", "autoWidth": true },
                { "data": "AddressCode", "autoWidth": true },
                { "data": "HomeAddress1", "autoWidth": true },
                { "data": "OfficeAddress1", "autoWidth": true },
                { "data": "IsActive", "autoWidth": true },

                { "defaultContent": '<button class="btn btn-primary" id="btnEditAddress" type="button">Edit</button>' }

            ],

            "columnDefs": [
    {
        // The `data` parameter refers to the data for the cell (defined by the
        // `data` option, which defaults to the column being worked with, in
        // this case `data: 0`.
        targets: [5],
        render: function (data, type, row) {

            return data == '1' ? 'Active' : 'Inactive';
        },


    }],
            //"fnRowCallback": function (nRow, aData, iDisplayIndexFull) {
            //    debugger;
            //    $("td:first", nRow).html(iDisplayIndexFull + 1);
            //    return nRow;
            //},
            //  "order": [[1, 'asc']]



        });
        //t.on('order.dt search.dt', function () {
        //    t.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        //        cell.innerHTML = i + 1;
        //    });
        //}).draw();
    }



};
var viewAddressHelper = {

    populateDataForEditButton: function (aObj) {

        CreateAddressHelper.ClearAddressForm();

        $('#hdnAddressId').val(aObj.AddressId);
        $("#txtAddressCode").val(aObj.AddressCode);
        $("#txtHomeAddress1").val(aObj.HomeAddress1);
        $("#txtHomeAddress2").val(aObj.HomeAddress2);
        $("#txtHomeCityId").val(aObj.HomeCityId);
        $("#txtHomePostalCode").val(aObj.HomePostalCode);
        $("#txtHomeDistrictId").val(aObj.HomeDistrictId);
        $("#txtOfficeAddress1").val(aObj.OfficeAddress1);
        $("#txtOfficeAddress2").val(aObj.OfficeAddress2);
        $("#txtOfficeCityId").val(aObj.OfficeCityId);
        $("#txtOfficePostalCode").val(aObj.OfficePostalCode);
        $("#txtOfficeDistrictId").val(aObj.OfficeDistrictId);
        $("#txtAddressTypeName").val(aObj.AddressTypeName);

        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }




    },

};
