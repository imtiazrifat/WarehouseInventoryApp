var repairStatus = {

    loadRepairStatusInDd: function () {

        var a = [

            {
                id: 'Solved',
                text: 'Solved'
            },
            {
                  id: 'Sent to Repar',
                  text: 'Sent to Repar'
            },

            {
                id: 'No warrenty',
                text: 'No warrenty'
            },

            {
                id: 'Not Solved',
                text: 'Not Solved'
            },
            {
                id: 'Warrenty Not Available',
                text: 'Warrenty Not Available'
            },
        ];


        $("#cmbRepairStatus").select2({
            placeholder: "Select a Repair Status",
            data: a
        });
    }
}