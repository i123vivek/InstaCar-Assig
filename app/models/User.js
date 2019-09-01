const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        default: "asdfhjkwert"
    },
    email: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    DateOfBirth: {
        type: Date,
        default: ''
    },
    // country: {
    //     type: String,
    //     default: 'india'
    // },
    // countryCode: {
    //     type: String,
    //     default: '+91'
    // },
    // userPanCardNumber: {
    //     type: String,
    //     default: ''
    // },
    createdOn: {
        type: Date,
        default:''
    }
})


module.exports = mongoose.model('User',User);