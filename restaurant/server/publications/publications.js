Meteor.publish('restaurantCategory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Categories.find(selector);
    }
});
Meteor.publish('restaurantCustomer', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Customers.find(selector);
    }
});
/*
Meteor.publish('restaurantSubCategory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.SubCategories.find(selector);
    }
});*/
Meteor.publish('restaurantUnit', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Units.find(selector);
    }
});
Meteor.publish('restaurantStaff', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Staffs.find(selector);
    }
});
/*
Meteor.publish('restaurantSupplier', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Suppliers.find(selector);
    }
});*/
Meteor.publish('restaurantProduct', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Products.find(selector);
    }
});
Meteor.publish('restaurantSale', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Sales.find(selector);
    }
});
Meteor.publish('restaurantSaleDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.SaleDetails.find(selector);
    }
});
Meteor.publish('restaurantPayment', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Payments.find(selector);
    }
});
/*Meteor.publish('restaurantPurchase', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Purchases.find(selector);
    }
});
Meteor.publish('restaurantPurchaseDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PurchaseDetails.find(selector);
    }
});*/
/*Meteor.publish('restaurantStock', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Stocks.find(selector);
    }
});*/
Meteor.publish('restaurantExchangeRate', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.ExchangeRates.find(selector);
    }
});
/*Meteor.publish('restaurantStockHistory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.StockHistories.find(selector);
    }
});*/

Meteor.publish('restaurantUserStaff', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.UserStaffs.find(selector);
    }
});

Meteor.publish('images', function (selector) {
    if (this.userId) {
        return Images.find()
    }
});

/*
Meteor.publish('restaurantAdjustmentDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.AdjustmentDetails.find(selector);
    }
});
*/
/*Meteor.publish('restaurantAdjustment', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Adjustments.find(selector);
    }
});*/
/*Meteor.publish('restaurantPromotion', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Promotions.find(selector);
    }
});
Meteor.publish('restaurantPromotionQty', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionQuantities.find(selector);
    }
});
Meteor.publish('restaurantPromotionTotalAmount', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionTotalAmounts.find(selector);
    }
});
Meteor.publish('restaurantPromotionPercentage', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionPercentages.find(selector);
    }
});*/
/*Meteor.publish('restaurantFIFOInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.FIFOInventory.find(selector);
    }
});
Meteor.publish('restaurantLIFOInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LIFOInventory.find(selector);
    }
});
Meteor.publish('restaurantAverageInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.AverageInventory.find(selector);
    }
});*/

/*
Meteor.publish('restaurantLocation', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Locations.find(selector);
    }
});
Meteor.publish('restaurantLocationTransfer', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationTransfers.find(selector);
    }
});
Meteor.publish('restaurantLocationTransferDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationTransferDetails.find(selector);
    }
});

Meteor.publish('restaurantLocationSetting', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationSettings.find(selector);
    }
});
*/

Meteor.publish('restaurantTableLocation', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.TableLocations.find(selector);
    }
});

Meteor.publish('restaurantTable', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Tables.find(selector);
    }
});

Meteor.publish('restaurantOwedSale', function () {
    var lastWeek = new Date();
    var a = lastWeek.setDate(lastWeek.getDate() - 7);
    Counts.publish(this, 'owedSale', Restaurant.Collection.Sales.find({
        status: 'Owed',
        saleDate: {$lte: lastWeek}
    }));
    this.ready();
});
Meteor.publish('restaurantNote', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Notes.find(selector);
    }
});
