
var CreateAddressManager = {
    SaveAddress: function () {
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
            url: "/Inventory/Address/CreateAddress",
            data: JSON.stringify(CreateAddressHelper.GetAddressData()),
            
            success: function (response) {

                debugger;
                if (response != null) {
                    $("#myModal #modal-body #rif").html(response.data.Message);

                    $('#myModal').appendTo("body").modal('show');

                    viewAddressManager.GetAddressDataTable();
                    CreateAddressHelper.ClearAddressForm();
                    
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
var CreateAddressHelper = {

    CreateAddressInit: function () {

        $("#btnSaveAddress").click(function () {
            debugger;
            CreateAddressManager.SaveAddress();

        });
        $("#btnClearAddressForm").click(function () {
            CreateAddressHelper.ClearAddressForm();

        });

    },

    popupInit: function () {
        debugger;

    },

    ClearAddressForm: function () {
        debugger;
        $('#hdnAddressId').val(0);
        $("#txtAddressCode").val('');
        $("#txtHomeAddress1").val('');
        $("#txtHomeAddress2").val('');
        $("#txtHomeCityId").val('');
        $("#txtHomePostalCode").val('');
        $("#txtHomeDistrictId").val('');
        $("#txtOfficeAddress1").val('');
        $("#txtOfficeAddress2").val('');
        $("#txtOfficeCityId").val('');
        $("#txtOfficePostalCode").val('');
        $("#txtOfficeDistrictId").val('');
        $("#txtAddressTypeName").val('');

        $("#txtIsActive").val('');
        $('#chkIsActive').removeAttr('checked', 'checked');
        
    },

    GetAddressData: function () {
        var aObj = new Object();

        aObj.AddressId = $('#hdnAddressId').val();
        aObj.AddressCode = $('#txtAddressCode').val();
        aObj.HomeAddress1 = $('#txtHomeAddress1').val();
        aObj.HomeAddress2 = $('#txtHomeAddress2').val();
        aObj.HomeCityId = $('#txtHomeCityId').val();
        aObj.HomePostalCode = $('#txtHomePostalCode').val();
        aObj.HomeDistrictId = $('#txtHomeDistrictId').val();
        aObj.OfficeAddress1 = $('#txtOfficeAddress1').val();
        aObj.OfficeAddress2 = $('#txtOfficeAddress2').val();
        aObj.OfficeCityId = $('#txtOfficeCityId').val();
        aObj.OfficePostalCode = $('#txtOfficePostalCode').val();
        aObj.OfficeDistrictId = $('#txtOfficeDistrictId').val();
        aObj.AddressTypeName = $('#txtAddressTypeName').val();
        aObj.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;        

        return aObj;
    },


    //populateAddressDataForEditButton: function (aObj) {
    //    debugger;

    //    createAddressHelper.ClearAddressForm();
    //    $('#hdnAddressId').val(aObj.AddressId);
    //    $("#txtAddressCode").val(aObj.AddressCode);
    //    $("#txtHomeAddress1").val(aObj.HomeAddress1);
    //    $("#txtHomeAddress2").val(aObj.HomeAddress2);
    //    $("#txtHomeCityId").val(aObj.HomeCityId);
    //    $("#txtHomePostalCode").val(aObj.HomePostalCode);
    //    $("#txtHomeDistrictId").val(aObj.HomeDistrictId);
    //    $("#txtOfficeAddress1").val(aObj.OfficeAddress1);
    //    $("#txtOfficeAddress2").val(aObj.OfficeAddress2);
    //    $("#txtOfficeCityId").val(aObj.OfficeCityId);
    //    $("#txtOfficePostalCode").val(aObj.OfficePostalCode);
    //    $("#txtOfficeDistrictId").val(aObj.OfficeDistrictId);
    //    $("#txtAddressTypeName").val(aObj.AddressTypeName);
        
    //    if (aObj.IsActive == 1) {
    //        $("#chkIsActive").prop('checked', 'checked');
    //    } else  {
    //        $("#chkIsActive").removeProp('checked', 'checked');
    //    }

        
    //},

};