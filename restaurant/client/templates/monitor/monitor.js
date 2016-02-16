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
    var saleDetails = Restaurant.Collection.SaleDetails.find(selector);
    return saleDetails;
  },
  hideFinishedFood: function() {
    return Session.get('hideFinished');
  },
  leftQuanity: function(quanity, cookQty) {
    return quanity - cookQty;
  },
  showNotify: function(notify, saleDetailId, productName, qty, cookQty, tableName) {
    if (notify) {

      Meteor.call('updateNotify', saleDetailId);
      var s = new buzz.sound('/sounds/iphone-notify.ogg');
      s.play();
      alertify.set('notifier', 'position', 'top-left');
      // alertify.success('Current position : ' +  alertify.get('notifier', 'position') + alertify.get('notifier-delay', 'delay'));
      alertify.notify('តុលេខៈ​ ' + tableName + ', ' + productName + ', ចំនួនៈ​ ' + (qty - cookQty), 'custom', 2 + alertify.get('notifier', 'position'));
    }
  }
});

Template.restaurant_monitor.events({
  "click #cooking": function(event) {
    Meteor.call('updateCooking', this._id, 'cooking', 0, this.isCooking, this.isFinishing);
  },
  "click #cooking-done": function(e) {
    Meteor.call('updateCooking', this._id, 'finishing', this.quantity, this.isCooking, this.isFinishing);
  },
  "click #hideFinished": function(e) {
    var val = $(e.currentTarget).prop('checked');
    Session.set('hideFinished', val)
  }
});
