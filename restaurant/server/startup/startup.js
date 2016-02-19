Meteor.startup(function () {
  Restaurant.Collection.Categories._ensureIndex({parentId:1});
  Restaurant.Collection.Staffs._ensureIndex({branchId:1,status:1});
  Restaurant.Collection.UserStaffs._ensureIndex({branchId:1,userId:1});
  Restaurant.Collection.Products._ensureIndex({barcode:1,status:1,name:1,categoryId:1,saleDate:1});
  Restaurant.Collection.ExchangeRates._ensureIndex({branchId:1,base:1});
  Restaurant.Collection.Sales._ensureIndex({status: 1, branchId: 1,locationId:1,productId:1});
  Restaurant.Collection.SaleDetails._ensureIndex({status:1,productId:1,branchId: 1,locationId:1,saleId:1});
  Restaurant.Collection.Payments._ensureIndex({branchId:1,saleId:1,purchaseId:1});
});
