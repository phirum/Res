/**
 * Schema
 */
Restaurant.Schema.SaleReport = new SimpleSchema({
    locationId: {
        type: String,
        label: "Location",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.ListForReport.locations();
            }
        },
        optional:true
    },
    customerId: {
        type: String,
        label: "Customer",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.customer();
            }
        },
        optional: true

    },
    date: {
        type: String,
        label: "Date"
    },

    staffId: {
        type: String,
        label: "Staff",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.staff();
            }
        },
        optional: true
    },
    branch: {
        type: String,
        label: "Branch",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.branchForUser();
            }
        },
        optional: true
    },
    status: {
        type: String,
        label: "Status",
        autoform: {
            type: "select2",
            options: function () {
                return [
                    {value: '', label: 'All'},
                    {value: 'Owed', label: 'Owed'},
                    {value: 'Paid', label: 'Paid'}
                ]
            }
        },
        optional:true
    }
});