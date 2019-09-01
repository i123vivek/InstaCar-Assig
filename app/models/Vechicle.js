const mongoose = require('mongoose')
const Schema = mongoose.Schema

let vechicleSchema = new Schema({
    carId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    modelType: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    carRegNumber: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    noOfSeats: {
        type: Number,
        default: '4'
    },
    carRate: {
        type: Number,
        default: '15'
    },
    fuelType: {
        type: String,
        default: 'diseal'
    }
})

module.exports = mongoose.model('Vechicle',vechicleSchema);