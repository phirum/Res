Meteor.methods({
  updateQtyPrinted: function(id, quantity) {
    Restaurant.Collection.SaleDetails.direct.update(id, {
      $set: {
        qtyPrinted: quantity
      }
    });
  },
  updateMonitor: function(id) {
    Restaurant.Collection.SaleDetails.direct.update(id, {
      $set: {
        monitor: true
      }
    })
  },
  updateCooking: function(id, type, isCookingVal, isFinishingVal) {
    var selector = {}
    selector.$set={}
    if(type=='cooking'){
      selector.$set.isCooking = !isCookingVal;
      selector.$set.isFinishing = false
    }else{
      selector.$set.isFinishing = !isFinishingVal
      selector.$set.isCooking = false;
    }
    Restaurant.Collection.SaleDetails.direct.update(id, selector);
  }
});
