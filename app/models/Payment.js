const mongoose = require('mongoose')
const Schema = mongoose.Schema

let paymentSchema = new Schema ({
    paymentId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    carId: {
        type: String
    },
    userId: {
        type: String
    },
    bookingId: {
        type: String
    },
    bankId: {
        type: String
    },
    amount: {
        type: Number,
        default : ''
    },
    paymentDate: {
        type: Date,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ''
    }
})

module.exports = mongoose.model('Payment',paymentSchema);