Restaurant.Collection.Notes = new Mongo.Collection("restaurant_notes");
Restaurant.Schema.Notes = new SimpleSchema({
    name: {
        type: String,
        label: "Note",
        optional: true
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
    /*createdAt: {
     type: Date,
     label: "Created Date",
     autoValue: function() {
     if (this.isInsert)
     return new Date;
     },
     denyUpdate: true,
     optional: true
     },
     updatedAt: {
     type: Date,
     label: "Updated Date",
     autoValue: function() {
     return new Date();
     },
     optional: true
     },
     createdUserId: {
     type: String,
     label: "Created by",
     autoValue: function() {
     if (this.isInsert)
     return Meteor.user()._id;
     },
     denyUpdate: true,
     optional: true
     },
     updatedUserId: {
     type: String,
     label: "Updated by",
     autoValue: function() {
     return Meteor.user()._id;
     },
     optional: true
     }*/
});
Restaurant.Collection.Notes.attachSchema(Restaurant.Schema.Notes);
