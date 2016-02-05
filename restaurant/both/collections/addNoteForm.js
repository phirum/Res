Restaurant.Schema.AddNoteForm = new SimpleSchema({
    saleDetailId: {
        type: String,
        label: "Sale Detail Id"
    },
    note: {
        type: [String],
        label: "Note",
        autoform: {
            type: 'select2',
            multiple: true,
            options: function () {
                return Restaurant.List.getNoteList();
            }

        },
        optional:true
    }
});

