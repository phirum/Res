Meteor.methods({
    //Sale
    addToMonitor: function(saleId){
      Restaurant.Collection.SaleDetails.direct.update({saleId: saleId}, {$set: {monitor: true}}, {multi: true})
    },
    insertSaleAndSaleDetail: function (sale, saleDetail) {
        var todayDate = moment().format('YYYYMMDD');
        var prefix = sale.branchId + "-" + todayDate;
        var saleId = idGenerator.genWithPrefix(Restaurant.Collection.Sales, prefix, 4);
        sale._id = saleId;
        Restaurant.Collection.Sales.insert(sale);
        Meteor.defer(function () {
            saleDetail.saleId = saleId;
            Restaurant.Collection.SaleDetails.insert(saleDetail);
        });
        return saleId;
    },
    insertSale: function (obj) {
        return Restaurant.Collection.Sales.insert(obj);
    },
    directInsertSale: function (obj) {
        return Restaurant.Collection.Sales.direct.insert(obj);
    },
    directUpdateSale: function (id, set) {
        Restaurant.Collection.Sales.direct.update(id, {$set: set});
    },
    updateSale: function (id, set) {
        Restaurant.Collection.Sales.update(id, {$set: set});
    },
    directInsertSaleDetails: function (obj) {
        Restaurant.Collection.SaleDetails.direct.insert(obj);
    },
    insertSaleDetails: function (obj) {
        Restaurant.Collection.SaleDetails.insert(obj);
    },
    directUpdateSaleDetails: function (id, set) {
        Restaurant.Collection.SaleDetails.direct.update(id, {$set: set});
    },
    directUpdateSaleDetailWithOption: function (id, option) {
        Restaurant.Collection.SaleDetails.direct.update(id, option);
    },
    updateSaleDetails: function (id, set, unset) {
        Restaurant.Collection.SaleDetails.update(id, {$set: set});
    },
    cancelSale: function (saleId) {
        //Restaurant.Collection.SaleDetails.remove({saleId: saleId});
        Restaurant.Collection.Sales.remove(saleId);
    },
    directUpdateSaleDetailsStatus: function (saleId) {
        Restaurant.Collection.SaleDetails.direct.update({saleId: saleId}, {$set: {status: "Saved"}}, {multi: true});
    },
    directUpdateSaleAndSaleDetailsToUnsaved: function (saleId, total) {
        Restaurant.Collection.Payments.direct.remove({saleId: saleId});
        Restaurant.Collection.Sales.direct.update(saleId, {$set: {status: "Unsaved", owedAmount: total}});
        Restaurant.Collection.SaleDetails.direct.update({saleId: saleId}, {$set: {status: "Unsaved"}}, {multi: true});
    },

    updateToRetailSale: function (saleId) {
        Restaurant.Collection.SaleDetails.find({saleId: saleId}).forEach(function (sd) {
            var retailPrice = Restaurant.Collection.Products.findOne(sd.productId).retailPrice;
            var detailObj = {};
            detailObj.price = retailPrice;
            detailObj.amount = (detailObj.price * sd.quantity) * (1 - sd.discount / 100);
            Restaurant.Collection.Sales.direct.update(sd._id, {$set: detailObj});
        });
        var set = {};
        set.isRetail = true;
        Restaurant.Collection.Sales.update(saleId, {$set: set});
    },
    getSaleListForPayment: function (selector) {
        var list = [{
            label: "(Select One)",
            value: ""
        }];
        Restaurant.Collection.Sales.find(selector).forEach(function (obj) {
            var payment = Restaurant.Collection.Payments.findOne({
                saleId: obj._id,
                branchId: selector.branchId
                //balanceAmount: {$gt: 0}
            }, {
                sort: {
                    _id: -1,
                    paymentDate: -1
                }
            });
            if (payment == null) {
                list.push({
                    label: obj._id + ' : ' + obj._customer.name,
                    value: obj._id
                });
            } else if (payment.balanceAmount > 0) {
                list.push({
                    label: obj._id + ' : ' + obj._customer.name,
                    value: obj._id
                });
            }
        });
        return list;
    },
    transferSaleAndSaleDetails: function (saleDetailId, fromSaleId, toSaleId) {
        Restaurant.Collection.SaleDetails.update(saleDetailId, {$set: {saleId: toSaleId}});
        Meteor.defer(function () {
            // Meteor._sleepForMs(500);
            var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: fromSaleId});
            if (saleDetails.count() > 0) {
                var set = {};
                var sale = Restaurant.Collection.Sales.findOne(fromSaleId);
                var discount = sale && sale.discount ? sale.discount : 0;
                var saleSubTotal = 0;
                saleDetails.forEach(function (saleDetail) {
                    saleSubTotal += parseFloat(saleDetail.amount);
                });
                var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;
                var total = saleSubTotal * (1 - discount / 100);
                if (baseCurrencyId == "KHR") {
                    total = roundRielCurrency(total);
                }
                set.subTotal = saleSubTotal;
                set.total = total;
                set.owedAmount = total;
                Restaurant.Collection.Sales.direct.update(fromSaleId, {$set: set});

            }
            else {
                Restaurant.Collection.Sales.remove(fromSaleId);
            }
        });
    }

});
