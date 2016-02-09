restaurantRoutes.route('/invoiceTransfer', {
    name: 'restaurant.invoiceTransfer',
    subscriptions: function (params, queryParams) {
        var branchId = Session.get('currentBranch');
        this.register(
            'restaurant_sale',
            Meteor.subscribe('restaurantSale', {branchId: branchId, status: "Unsaved"})
        );
        this.register(
            'restaurant_saleDetail',
            Meteor.subscribe('restaurantSaleDetail', {branchId: branchId, status: "Unsaved"})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate', {branchId: branchId})
        );
    },
    action: function (params, queryParams) {
        //Layout.main('restaurant_checkout');
        Layout.main('restaurant_invoiceTransfer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'InvoiceTransfer',
        parent: 'restaurant.home'
    }
});
