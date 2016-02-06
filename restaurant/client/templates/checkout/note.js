var restaurantAddNoteTPL = Template.restaurant_addNote;

restaurantAddNoteTPL.events({
    'click #save-note': function () {
        //var id = 1;
        debugger;
        var note = $('#note').val();
        set = {note: note};
        Meteor.call('updateSaleDetails', this._id, set, function (er, re) {
            if (er) {
                alertify.error(er.message);
            } else {
                alertify.addNote().close();
            }

        });
    }
});
restaurantAddNoteTPL.helpers({});

AutoForm.hooks({
    // Customer
    restaurant_addNote: {
        onSubmit: function (doc) {
            var option = {};
            debugger;
            if (doc.note == "" || doc.note == null) {
                option.$unset = {note: ""}
            } else {
                option.$set = {note: doc.note};
            }
            Meteor.call('directUpdateSaleDetailWithOption', doc.saleDetailId, option, function (er, re) {
                if (er) {
                    alertify.error(er.message);
                } else {
                    alertify.success('Success');
                    alertify.addNote().close();
                }
            });
            return false;
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
