const mongoose = require('mongoose');

// This model points to the 'phonenumbers' collection in the Admin Dashboard database
const whitelistedUserSchema = new mongoose.Schema({
    phoneNumber: String,
    countryCode: String,
    userName: String,
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    collection: 'phonenumbers',
    timestamps: true
});

// We use the main connection but switch to the 'calculator-dashboard' database
// This ensures we only use ONE network connection to the cluster.
const getWhitelistedUserModel = () => {
    const dashboardDb = mongoose.connection.useDb('calculator-dashboard');
    return dashboardDb.model('WhitelistedUser', whitelistedUserSchema);
};

module.exports = getWhitelistedUserModel;
