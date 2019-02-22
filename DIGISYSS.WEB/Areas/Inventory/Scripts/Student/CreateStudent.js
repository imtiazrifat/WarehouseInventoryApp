
var CreateStudentManager = {
    SaveStudent: function () {

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/Inventory/Student/CreateStudent",
            data: JSON.stringify(CreateStudentHelper.GetStudentData()),
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

                    viewStudentManager.GetStudentDataTable();
                    CreateStudentHelper.ClearStudentForm();

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
    SaveStudentDetails: function () {

        //===============================================================
        //If the value of
        //isToUpdateOrCreate =0 then ----Create New company
        //isToUpdateOrCreate =1 then ----Update Company Information
        //===============================================================
        // JSON.stringify(json),
        //  var data = JSON.stringify(createAssetCategoryHelper.GetData(), createAssetCategoryHelper.GetData2());

        $.ajax({
            type: 'POST',
            url: "/Inventory/Student/CreateStudentDetails",
            data: JSON.stringify(CreateStudentHelper.GetStudentDetailsData()),
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

                    viewStudentManager.GetStudentDataTable();
                    CreateStudentHelper.ClearStudentForm();

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
var CreateStudentHelper = {
    CreateStudentInit: function() {

        $("#btnSaveStudent").click(function() {
            debugger;
            //  CreateStudentManager.SaveStudent();
            CreateStudentManager.SaveStudentDetails();

        });
        $("#btnClearStudentForm").click(function() {
            $("#btnSaveStudent").Text = "Update";
            CreateStudentHelper.ClearStudentForm();

        });
        CreateStudentHelper.GetStudentDataTable();  

    },

    GetStudentDataTable: function() {
        debugger;
        $('#myTable').dataTable().fnDestroy();
        $('#myTable').DataTable({
            "ajax": {
                "url": "/Inventory/Student/GetAllStudentData",
                "type": "GET",
                "datatype": "json",
                "contentType": 'application/json; charset=utf-8',

            },
            "columns": [
                { "data": "StudentId", "visible": false},
                 { "data": "StudentAddressId", "visible": false },
                  { "data": "HistoryId", "visible": false },
                { "data": "StudentName", "autoWidth": true },
                { "data": "StudentPhone", "autoWidth": true },
                { "data": "Address", "autoWidth": true },
                  { "data": "Country", "autoWidth": true },
                { "data": "HistoryTitle", "autoWidth": true },
                { "data": "HistoryDetials", "autoWidth": true },
               
                { "defaultContent": '<button class="btn btn-primary" id="btnEditColor" type="button">Edit</button>' },
            ],

            //"columnDefs": [
            //{
            //    // The `data` parameter refers to the data for the cell (defined by the
            //    // `data` option, which defaults to the column being worked with, in
            //    // this case `data: 0`.
            //    targets: [4],
            //    render: function(data, type, row) {
            //        debugger;
            //        return data == '1' ? 'Active' : 'Inactive'
            //    }
            //},

            //]
                });

    },
  

    ClearStudentForm: function () {
        debugger;
        $('#hdnStudentId').val(0);
        //$('#hdnStudentAddressId').val('');
        //$('#hdnHistoryId').val('');

        $("#txtStudentName").val('');
        $("#txtStudentPhone").val('');
        $("#txtAddress").val('');
        $("#txtCountry").val('');
        $("#txtHistoryTitle").val('');
        $("#txtHistoryDetials").val('');

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');

    },
    GetStudentDetailsData: function () {
        var aObj = new Object();


        aObj.StudentId = $('#hdnStudentId').val();
        aObj.StudentAddressId = $('#hdnStudentAddressId').val();
        aObj.HistoryId = $('#hdnHistoryId').val();

        aObj.StudentName = $('#txtStudentName').val();
        aObj.StudentPhone = $("#txtStudentPhone").val();
        aObj.Address = $("#txtAddress").val();

        aObj.Country = $('#txtCountry').val();
        aObj.HistoryTitle = $("#txtHistoryTittle").val();
        aObj.HistoryDetials = $("#txtHistoryDetials").val();

        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

        return aObj;
    },

    //GetStudentData: function () {
    //    var aObj = new Object();

    //    $('#hdnStudentId').val(aObj.StudentId);
    //    aObj.StudentCode = $('#txtStudentCode').val();
    //    aObj.StudentName = $("#txtStudentName").val();
    //    aObj.StudentDetails = $("#txtStudentDetails").val();
    //    aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;

    //    return aObj;
    //},
    populateStudentDataForEditButton: function (aObj) {
        debugger;

        createStudentHelper.ClearStudentForm();

        aObj.StudentId = $('#hdnStudentId').val(aObj.StudentId);
        $('#hdnStudentAddressId').val(aObj.StudentAddressId);
        $('#hdnHistoryId').val(aObj.HistoryId);

        $("#txtStudentName").val(aObj.StudentName);
        $("#txtStudentPhone").val(aObj.StudentPhone);
        $("#txtAddress").val(aObj.Address);
        $("#txtCountry").val(aObj.Country);
        $("#txtHistoryTitle").val(aObj.HistoryTitle);
        $("#txtHistoryDetials").val(aObj.HistoryDetials);


        if (aObj.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
        $("#btnSaveStudent").Text = "Update";


    },

};