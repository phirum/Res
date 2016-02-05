Meteor.methods({
    getNoteList: function () {
        var notes = Restaurant.Collection.Notes.find();
        var list = [];
       /* var list = [{
            label: "(Select One)",
            value: ""
        }];*/
        notes.forEach(function (obj) {
            list.push({
                label: obj.name,
                value: obj._id
            });
        });
        //console.log(list);
        return list;

    }
});