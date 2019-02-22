var adjustReason = {

    loadAdjustReasonInDD: function () {

        var a = [

            {
                id: 'Damage',
                text: 'Damage'
            },
            //{
            //    id: 'Gift',
            //    text: 'Gift'
            //},
            {
                id: 'Overflow',
                text: 'Overflow'
            },
            {
                id: 'Short',
                text: 'Short'
            },
        ];


        $("#cmbAdjustedReason").select2({
            placeholder: "Select a Reason",
            data: a
        });
    }
}