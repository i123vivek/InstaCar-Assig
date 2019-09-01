const mongoose = require('mongoose')
const Schema = mongoose.Schema

let carBookedSchema = new Schema ({
    carBookedInfoID:{
        type: String,
        default: '',
        unique: true
    },
    carID: {
        type: String,
        default: ''
    },
    bookingId: {
        type: String
    },
    bookingEndDate: {
        type: Date
    },
    bookedDays: {
        type: []
    }
})

module.exports = mongoose.model('CarBookedInfo',carBookedSchema);