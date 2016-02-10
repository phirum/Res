Template.restaurant_chefPrint.helpers({
  data: function() {
    var params = FlowRouter.current().queryParams;
    return params;
  },
  goBack: function(saleId) {
    Meteor.setTimeout(function() {
      window.print();
      FlowRouter.go('/restaurant/checkout/' + saleId);
    }, 1000);
  }
});
