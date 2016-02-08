Template.restaurant_invoiceTransfer.onRendered(function () {
    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();
});
Template.restaurant_invoiceTransfer.helpers({
    fromSales: function () {
        var selector = {status: "Unsaved"};
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Sales', selector, {});
    },
    toSales: function () {
        var selector = {status: "Unsaved"};
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Sales', selector, {});
    },
    fromSaleDetails: function () {
        var fromSaleId = Session.get('fromSaleIdSession');
        var selector = {saleId: fromSaleId};
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.SaleDetails', selector, {});
    },
    toSaleDetails: function () {
        var selector = {};
        var toSaleId = Session.get('toSaleIdSession');
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.SaleDetails', selector, {});
    }
});