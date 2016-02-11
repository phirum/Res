Meteor.methods({
  updateQtyPrinted:function(id, quantity){
     Restaurant.Collection.SaleDetails.direct.update(id, {$set: {qtyPrinted: quantity}});
  }
});
