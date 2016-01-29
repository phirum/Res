var restaurantSaleListTPL = Template.restaurant_saleList;
var restaurantSaleShow = Template.restaurant_saleShow;


restaurantSaleListTPL.onRendered(function () {
    createNewAlertify(['saleShow'], {size: 'lg'});
});

restaurantSaleListTPL.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')}
    }
});

restaurantSaleListTPL.events({
    'click .insert': function (e, t) {
        FlowRouter.go('restaurant.checkout');
    },
    'click .update': function (e, t) {
        var id = this._id;
        var total = this.total;
        Meteor.call('findOneRecord', 'Restaurant.Collection.Sales', {_id: id}, {}, function (error, sale) {
            if (error) {
                alertify.error(error.message);
            } else {
                if (sale.status != "Unsaved") {
                    alertify.confirm("Are you sure to Update the Order [" + id + "]? It have been checkout.")
                        .set({
                            onok: function (closeEvent) {
                                Meteor.call('directUpdateSaleAndSaleDetailsToUnsaved', id,total, function (er, re) {
                                    if (!er) {
                                        FlowRouter.go('restaurant.checkout', {saleId: id});
                                    }
                                });
                            },
                            title: '<i class="fa fa-remove"></i> Delete Category'
                        });
                } else {
                    FlowRouter.go('restaurant.checkout', {saleId: id});
                }
            }

        });
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var arr = [
                        {collection: 'Restaurant.Collection.Payments', selector: {saleId: id}}
                    ];
                    Meteor.call('isRelationExist', arr, function (error, result) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            if (result) {
                                alertify.warning("Data has been used. Can't remove.");
                            } else {
                                Restaurant.Collection.Sales.remove(id, function (err) {
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
                title: '<i class="fa fa-remove"></i> Delete Sale'
            });

    },
    'click .show': function (e, t) {
        //var sale=Restaurant.Collection.Sales.findOne(this._id);
        this.sDate = moment(this.saleDate).format("YYYY-MM-DD HH:mm:ss");
        this.saleDetails = Restaurant.Collection.SaleDetails.find({saleId: this._id});
        this.retail = this.isRetail ? "Retail" : "Wholesale";

        alertify.saleShow(fa('eye', 'Sale Detail'), renderTemplate(restaurantSaleShow, this));

    }
});
