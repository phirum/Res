restaurantRoutes.route('/monitor', {
    name: 'restaurant.monitor',
    subscriptions: function (params, queryParams) {

        this.register(
            'restaurant_sale',
            Meteor.subscribe('restaurantSale', {monitor: true, status: 'Unsaved', branchId: Session.get('currentBranch')})
        );
        this.register(
            'restaurant_saleDetail',
            Meteor.subscribe('restaurantSaleDetail', {status: 'Unsaved', branchId: Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_monitor');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        // title: 'Location',
        // parent: 'restaurant.home'
    }
});
