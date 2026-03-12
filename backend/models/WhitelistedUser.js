const mongoose = require('mongoose');

// This model points to the 'phonenumbers' collection created by the Admin Dashboard
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
    collection: 'phonenumbers', // Explicitly specify the shared collection name
    timestamps: true
});

module.exports = mongoose.model('WhitelistedUser', whitelistedUserSchema);
