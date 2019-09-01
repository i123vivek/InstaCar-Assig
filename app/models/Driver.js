const mongoose = require('mongoose')
const Schema = mongoose.Schema

let driverSchema = new Schema ({
    driverId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    
    driverName: {
        type: String,
        default: ''
    },
    driverEmail: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    driverPanCardNumber: {
        type: String,
        default: ''
    },
    driverDL: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    language: {
        type: [String],
        default: ['English']
    },
    driverMobileNumber: {
        type: Number,
        default: '',
        required: true
    },
    driverGrade: {
        type: String,
        default: 'C'
    },
    // driverCharge: {
    //     type: String,
    //     default: '300'
    // },
    driverAddress: {
        type: Object,
        default: {"city":"Bangalore"}
    },
    // driverBookingDate: {
    //     type: Date,
    //     default: ''
    // },
    // driverBookedTill: {
    //     type: Date,
    //     default: ''
    // }

})

module.exports = mongoose.model('Driver',driverSchema);