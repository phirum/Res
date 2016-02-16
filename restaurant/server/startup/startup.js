Meteor.startup(function () {
  Restaurant.Collection.Sales._ensureIndex({saleDate: 1});
});
