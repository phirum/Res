Template.restaurant_monitor.onRendered(function() {
  Session.set('hideFinished', false);
});

Template.restaurant_monitor.helpers({
  saleDetails: function() {
    var hideFinished = Session.get('hideFinished');
    var selector = {};
    selector.monitor = true;
    if (hideFinished) {
      selector.isFinishing = false;
    }
    return Restaurant.Collection.SaleDetails.find(selector);
  },
  notify: function(tableId) {
    Bert.alert({
      title: 'Notify From Order',
      message: tableId,
      type: 'info',
      style: 'growl-top-right',
      icon: 'fa-cutlery'
    });

  },
  hideFinishedFood: function() {
    return Session.get('hideFinished');
  }
});

Template.restaurant_monitor.events({
  "click #cooking": function(event) {
    Meteor.call('updateCooking', this._id, 'cooking', this.isCooking, this.isFinishing);
  },
  "click #cooking-done": function(e) {
    Meteor.call('updateCooking', this._id, 'finishing', this.isCooking, this.isFinishing);
  },
  "click #hideFinished": function(e) {
      var val = $(e.currentTarget).prop('checked');
      Session.set('hideFinished', val)
  }
});
