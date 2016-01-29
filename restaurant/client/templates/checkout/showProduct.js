Template.restaurant_showProduct.helpers({
    baseCurrency: function () {
        var setting = Cpanel.Collection.Setting.findOne();
        if (setting != null) {
            return Cpanel.Collection.Currency.findOne(setting.baseCurrency);
        } else {
            return {};
        }

    }
});
Template.repo.helpers({
    baseCurrency: function () {
        var setting = Cpanel.Collection.Setting.findOne();
        if (setting != null) {
            return Cpanel.Collection.Currency.findOne(setting.baseCurrency);
        } else {
            return {};
        }

    }
});