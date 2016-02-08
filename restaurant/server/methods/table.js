Meteor.methods({
  findSales:function(id){
   var sales = Restaurant.Collection.Sales.find({_id: {$ne: id}, status: 'Unsaved'});
    return sales.fetch();
  },
  transferSaleDetail: function(fromId, toId){
    Meteor.defer(function(){
      var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: fromId});
      saleDetails.forEach(function(saleDetail){
        Restaurant.Collection.SaleDetails.update(saleDetail._id, {$set: {saleId: toId}});
      });
      Restaurant.Collection.Sales.remove(fromId);
    });

  }
});
