var restaurantUnitTPL=Template.restaurant_unit;
var restaurantUnitInsertTPL=Template.restaurant_unitInsert;
var restaurantUnitUpdateTPL=Template.restaurant_unitUpdate;
var restaurantUnitShowTPL=Template.restaurant_unitShow;

restaurantUnitTPL.onRendered(function(){
    createNewAlertify(['unit','unitShow']);
});
restaurantUnitTPL.events({
    'click .insert': function (e, t) {
        alertify.unit(fa('plus','Add New Unit'),renderTemplate(restaurantUnitInsertTPL));
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Units.findOne(this._id);
        alertify.unit(fa('pencil','Update Existing Unit'),renderTemplate(restaurantUnitUpdateTPL, data));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var arr = [
                        {collection: 'Restaurant.Collection.Products', selector: {unitId: id}}
                    ];
                    Meteor.call('isRelationExist', arr, function (error, result) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            if (result) {
                                alertify.warning("Data has been used. Can't remove.");
                            } else {
                                Restaurant.Collection.Units.remove(id, function (err) {
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
                title: '<i class="fa fa-remove"></i> Delete Unit'
            });
    },
    'click .show': function (e, t) {
        alertify.unitShow(fa('eye','Unit Detail'),renderTemplate(restaurantUnitShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_unitInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_unitUpdate: {
        onSuccess: function (formType, result) {
            alertify.unit().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

