var restaurantCustomerTPL = Template.restaurant_customer;
var restaurantCustomerInsertTPL = Template.restaurant_customerInsert;
var restaurantCustomerUpdateTPL = Template.restaurant_customerUpdate;
var restaurantCustomerShowTPL = Template.restaurant_customerShow;

restaurantCustomerTPL.onRendered(function () {
    createNewAlertify(['customer','customerShow']);
});
restaurantCustomerTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantCustomerTPL.events({
    'click .insert': function (e, t) {
        alertify.customer(fa('plus', 'Add New Customer'), renderTemplate(restaurantCustomerInsertTPL));
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Customers.findOne(this._id);
        alertify.customer(fa('pencil','Update Existing Customer'),renderTemplate(restaurantCustomerUpdateTPL, data));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var arr = [
                        {collection: 'Restaurant.Collection.Sales', selector: {customerId: id}}
                    ];
                    Meteor.call('isRelationExist', arr, function (error, result) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            if (result) {
                                alertify.warning("Data has been used. Can't remove.");
                            } else {
                                Restaurant.Collection.Customers.remove(id, function (err) {
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
                title: '<i class="fa fa-remove"></i> Delete Customer'
            });

    },
    'click .show': function (e, t) {
        alertify.customerShow(fa('eye','Customer Detail'),renderTemplate(restaurantCustomerShowTPL, this));
    }
});

AutoForm.hooks({
    // Customer
    restaurant_customerInsert: {
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
        },
        after: {
            insert: function () {
                $('select[name="gender"]').select2('val', '');
            }
        }
    },
    restaurant_customerUpdate: {
        onSuccess: function (formType, result) {
            alertify.customer().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        after: {
            update: function () {
                $('select[name="gender"]').select2('val', '');
            }
        }
    }
});


