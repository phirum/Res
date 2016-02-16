Meteor.methods({
  updateQtyPrinted: function(id, quantity) {
    Restaurant.Collection.SaleDetails.direct.update(id, {
      $set: {
        qtyPrinted: quantity
      }
    });
  },
  updateMonitor: function(id, boolean) {
    Restaurant.Collection.SaleDetails.direct.update(id, {
      $set: {
        monitor: boolean
      }
    })
  },
  updateCooking: function(id, type, cookQty, isCookingVal, isFinishingVal) {
    var selector = {}
    selector.$set = {}
    if (type == 'cooking') {
      selector.$set.isCooking = !isCookingVal;
      selector.$set.isFinishing = false
    } else {
      selector.$set.isFinishing = !isFinishingVal
      selector.$set.isCooking = false;
      selector.$set.cookQty = cookQty;
    }
    Restaurant.Collection.SaleDetails.direct.update(id, selector);
  },
  updateNotify: function(id) {
    Meteor.defer(function() {
      Meteor._sleepForMs(500);
      Restaurant.Collection.SaleDetails.direct.update(id, {
        $set: {
          notify: false
        }
      })
    })
  }
});
