const mongoose = require('mongoose')
const Schema = mongoose.Schema

let driverBookedSchema = new Schema ({
    driverBookedInfoID:{
        type: String,
        default: '',
        unique: true
    },
    driverID: {
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

module.exports = mongoose.model('DriverBookedInfo',driverBookedSchema);