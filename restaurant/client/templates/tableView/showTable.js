var restaurantShowTableTPL = Template.restaurant_showTable;

restaurantShowTableTPL.onRendered(function () {
    //var height = $('windows').height();
    //$('.drag-obj-container').css('height', height);
    $('.drag-obj').draggable({
        cursor: "crosshair",
        containment: ".drag-obj-container",
        handle: '.drag-obj',
        stop: function (evt, ui) {
            var left = ui.position.left;
            var top = ui.position.top;
		var set={left: left, top: top};
	Meteor.call('directUpdateTable',$(this).attr('id'),set,function(er,re){
		if(er) alertify.error(er.message);
	})
           // Restaurant.Collection.Tables.direct.update($(this).attr('id'), {$set: {left: left, top: top}});
        }
    });
    $('[data-toggle="popover"]').popover();
});

restaurantShowTableTPL.events({
    'click .add-invoice': function () {
        Session.set('tableIdSession', this._id);
        FlowRouter.go('/restaurant/checkout');
    },
    'mouseenter .transfer': function(){
      var saleId = this._id;
      Meteor.call('findSales', saleId,function(err,result){
        if(result){
          console.log(result)
          Session.set('salesList', result);
        }
      });
    },
    'click .select-table-id': function(e){
        var fromId = $(e.currentTarget).parents('.dropdown-submenu').find('.transfer-id').text();
        var toId = this._id;
        Meteor.call('transferSaleDetail', fromId, toId, function (err, res) {
            if(err){
                alertify.error(err.message);
            }else{
                alertify.success('Successful Transfer to ' + toId);
            }

        });
    }
});
restaurantShowTableTPL.helpers({
    sales: function () {
        return Restaurant.Collection.Sales.find({tableId: this._id});
    },
    hasSale: function (tableId) {
        var sale = Restaurant.Collection.Sales.findOne({tableId: tableId});
        return sale!=null;
    },
    salesList: function(){
      var salesList = Session.get('salesList');
      if(!_.isUndefined(salesList)){
        return salesList;
      }
    }
});
