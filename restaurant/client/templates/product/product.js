var restaurantProductTPL = Template.restaurant_product;
var restaurantProductInsertTPL = Template.restaurant_productInsert;
var restaurantProductUpdateTPL = Template.restaurant_productUpdate;
var restaurantProductShowTPL = Template.restaurant_productShow;

restaurantProductTPL.onRendered(function () {
    createNewAlertify(['product', 'productShow']);
    createNewAlertify(['category', 'unit']);
});
restaurantProductTPL.events({
    'click .insert': function (e, t) {
        Session.set('CategoryIdSession', null);
        alertify.product(fa("plus", "Add New Product"), renderTemplate(restaurantProductInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        Session.set('CategoryIdSession', null);
        var data = Restaurant.Collection.Products.findOne(this._id);
        alertify.product(fa('pencil', 'Update Existing Product'), renderTemplate(restaurantProductUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var arr = [
                        //{collection: 'Restaurant.Collection.FIFOInventory', selector: {productId: id}},
                        {collection: 'Restaurant.Collection.SaleDetails', selector: {productId: id}},
                       // {collection: 'Restaurant.Collection.PurchaseDetails', selector: {productId: id}},
                       // {collection: 'Restaurant.Collection.LocationTransferDetails', selector: {productId: id}}
                    ];
                    Meteor.call('isRelationExist', arr, function (error, result) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            if (result) {
                                alertify.warning("Data has been used. Can't remove.");
                            } else {
                                Restaurant.Collection.Products.remove(id, function (err) {
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
                title: '<i class="fa fa-remove"></i> Delete Product'
            });
    },
    'click .show': function (e, t) {
        alertify.productShow(fa('eye', 'Product Detail'), renderTemplate(restaurantProductShowTPL, this));

    }
});
restaurantProductInsertTPL.events({
    /*  'change #category-id': function () {
     Session.set('CategoryIdSession', $('#category-id').val());
     },*/
    'click .categoryInsertAddon': function (e, t) {
        alertify.category(fa('plus', 'Add New Category'), renderTemplate(Template.restaurant_categoryInsert));
    },
    /*'click .subCategoryInsertAddon': function (e, t) {
     alertify.subCategory(renderTemplate(Template.restaurant_subCategoryInsert))
     .set({title: "<i class='fa fa-plus'></i> Add New Sub Category"});
     //.maximize();
     },*/
    'click .unitInsertAddon': function (e, t) {
        alertify.unit(fa('plus', 'Add New Unit'), renderTemplate(Template.restaurant_unitInsert));
    }
});
restaurantProductUpdateTPL.events({
    'click .categoryInsertAddon': function (e, t) {
        alertify.category(fa('plus', 'Add New Category'), renderTemplate(Template.restaurant_categoryInsert));
    },
    /*'change #category-id': function () {
     Session.set('CategoryIdSession', $('#category-id').val());
     },
     'click .subCategoryInsertAddon': function (e, t) {

     alertify.subCategory(renderTemplate(Template.restaurant_subCategoryInsert))
     .set({
     title: "<i class='fa fa-plus'></i> Add New Sub Category"
     });
     // .maximize();

     },*/
    'click .unitInsertAddon': function (e, t) {
        alertify.unit(fa('plus', 'Add New Unit'), renderTemplate(Template.restaurant_unitInsert));
    }
});
AutoForm.hooks({
    // Customer
    restaurant_productInsert: {
        before: {
            insert: function (doc) {
                doc.purchasePrice = doc.wholesalePrice;
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
                $('select[name="categoryId"]').select2('val', '');
                $('select[name="subCategoryId"]').select2('val', '');
                $('select[name="unitId"]').select2('val', '');
                $('select[name="status"]').select2('val', '');
                $('select[name="productType"]').select2('val', '');
            }
        }
    },
    restaurant_productUpdate: {
        onSuccess: function (formType, result) {
            alertify.product().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        after: {
            insert: function () {
                $('select[name="categoryId"]').select2('val', '');
                $('select[name="subCategoryId"]').select2('val', '');
                $('select[name="unitId"]').select2('val', '');
                $('select[name="status"]').select2('val', '');
                $('select[name="productType"]').select2('val', '');
            }
        }
    }
});

