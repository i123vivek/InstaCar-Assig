const mongoose = require('mongoose')
const Schema = mongoose.Schema
//var Float = require('mongoose-float').loadType(mongoose);
const time = require('../libs/timeLib')

let bookingSchema = new Schema({
    bookingId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    userId:{
        type: String
    },
    bookedDriverId: {
        type: String
    },
    destinationTravelledArray:{
        type: []
    },
    bookingCarId: {
        type: String
    },
    userEmail:{
        type: String
    },
    tripType :{
        type: String,
        default: 'roundTrip'
    },
    originAddress: {
        type: String,
        default:''
    },
    destinationAddress: {
        type: String,
        default:''
    },
    departureDate: {
        type: Date,
        default: time.now()
    },
    departureDateString: {
        type: String,
        default: `${time.now()}`
    },
    returnDate: {
        type: Date
    },
    returnDateString: {
        type: String,
        default: ''
    },
    userMobileNumber: {
        type: Number
    },
    amount: {
        type: Number
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    bookingCreatedOn: {
        type: Date,
        default:  time.now()
    }

})

module.exports = mongoose.model('Booking',bookingSchema);