const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const AuthModel = mongoose.model('Auth');
const UserModel = mongoose.model('User');
const BookingModel = mongoose.model('Booking')
const CarBookedModel = mongoose.model('CarBookedInfo')
const DriverModel = mongoose.model('Driver');
const DriverBookedModel = mongoose.model('DriverBookedInfo');
const VechicleModel = mongoose.model('Vechicle');

let getAllCars = (req, res) => {
    VechicleModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'carController: getAllCars', 10)
                let apiResponse = response.generate(true, 'Failed To Find Car Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Car found', 'carController: getAllCars')
                let apiResponse = response.generate(true, 'No car found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Cars found', 'carController: getAllCars');
                let apiResponse = response.generate(false, 'All car details found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getAllCars function.

let getCarInfo = (req, res) => {
    VechicleModel.findOne({ 'carId': req.params.carId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'carController: getCarInfo', 10)
                let apiResponse = response.generate(true, 'Failed To Find Car Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Car found', 'carController: getCarInfo')
                let apiResponse = response.generate(true, 'No Car found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Car Info found', 'carController: getCarInfo');
                let apiResponse = response.generate(false, 'Car details found', 200, result)
                res.send(apiResponse)
            }
        })
} //end of getCarInfo function.

let addCar = (req, res) =>{
    VechicleModel.findOne({ 'carRegNumber': req.params.carRegNumber })
        .exec((err, retrievedCarDetails) => {
            if (err) {
                logger.error(err.message, 'carController: addCar', 10)
                let apiResponse = response.generate(true, 'Failed To add Car', 500, null)
                reject(apiResponse)
            } else if (check.isEmpty(retrievedDriverDetails)) {
                let newCar = new VechicleModel ({
                    carId: shortid.generate(),
                    modelType: req.body.modelType,
                    brand: req.body.brand,
                    color: req.body.color,
                    carRegNumber: req.body.carRegNumber,
                    noOfSeats: req.body.noOfSeats,
                    carRate: req.body.carRate,
                    fuelType: req.body.fuelType,
                })
                newCar.save((err, newCar) => {
                    if (err) {
                        logger.error(err.message, 'carController: addCar', 10)
                        let apiResponse = response.generate(true, 'Failed to Add new Car', 500, null)
                        reject(apiResponse)
                    } else {
                        let newCarObj = newCar.toObject();
                        resolve(newCarObj);
                    }
                })
            } else {
                logger.error('Car Cannot Be Added.Car Already Present', 'carController: addCar', 4)
                let apiResponse = response.generate(true, 'Car Already Present With this carId', 403, null)
                reject(apiResponse)
            }
        })
} // end addCar function.

let editCar = (req, res) => {
    let options = req.body;
    VechicleModel.update({ 'carId': req.params.carId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'carController:editCar', 10)
            let apiResponse = response.generate(true, 'Failed To edit car details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Car Found', 'carController:editCar')
            let apiResponse = response.generate(true, 'No Car Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Car details edited', 200, result)
            res.send(apiResponse)
        }
    })
} // end editCar function.

module.exports = {
    getAllCars: getAllCars,
    getCarInfo: getCarInfo,
    addCar: addCar,
    editCar: editCar
}