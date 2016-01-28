var restaurantTableTPL = Template.restaurant_table;
var restaurantTableInsertTPL = Template.restaurant_tableInsert;
var restaurantTableUpdateTPL = Template.restaurant_tableUpdate;
var restaurantTableShowTPL = Template.restaurant_tableShow;

restaurantTableTPL.onRendered(function () {
    createNewAlertify(['table', 'tableShow']);
});
restaurantTableTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantTableTPL.events({
    'click .insert': function (e, t) {
        alertify.table(fa('plus', 'Add New Table'), renderTemplate(restaurantTableInsertTPL));
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Tables.findOne(this._id);
        alertify.table(fa('pencil', 'Update Existing Table'), renderTemplate(restaurantTableUpdateTPL, data));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var arr = [
                        {collection: 'Restaurant.Collection.Sales', selector: {tableId: id}}
                    ];
                    Meteor.call('isRelationExist', arr, function (error, result) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            if (result) {
                                alertify.warning("Data has been used. Can't remove.");
                            } else {
                                Restaurant.Collection.Tables.remove(id, function (err) {
                                    if (err) {
                                        alertify.error(err.message);
                                    } else {
                                        alertify.success("Success");
                                    }
                                });
                            }
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete Staff'
            });
    },
    'click .show': function (e, t) {
        alertify.tableShow(fa('eye', 'Table Detail'), renderTemplate(restaurantTableShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_tableInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_tableUpdate: {
        onSuccess: function (formType, result) {
            alertify.table().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

