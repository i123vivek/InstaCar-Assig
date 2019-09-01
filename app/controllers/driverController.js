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


let getAllDrivers = (req, res) => {
    DriverModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'driverController: getAllDriver', 10)
                let apiResponse = response.generate(true, 'Failed To Find Driver Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Driver found', 'driverController: getAllDriver')
                let apiResponse = response.generate(true, 'No driver found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Drivers found', 'driverController: getAllDriver');
                let apiResponse = response.generate(false, 'All driver details found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getAllDriver function.

let getDriverInfo = (req, res) => {
    DriverModel.findOne({ 'driverId': req.params.driverId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'driverController: getDriverInfo', 10)
                let apiResponse = response.generate(true, 'Failed To Find Driver Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Driver found', 'driverController: getDriverInfo')
                let apiResponse = response.generate(true, 'No driver found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Driver Info found', 'driverController: getDriverInfo');
                let apiResponse = response.generate(false, 'Driver details found', 200, result)
                res.send(apiResponse)
            }
        })
} //end of getDriverInfo function.

let addDriver = (req, res) => {
    let validateDriverInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.driverEmail) {
                if (!validateInput.Email(req.body.driverEmail)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During adding driver', 'driverController: addDriver()', 5)
                let apiResponse = response.generate(true, 'Email Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end of validateDriverInput function.

    let createDriver = () => {
        return new Promise((resolve, reject) => {
            DriverModel.findOne({ driverEmail: req.body.driverEmail } || { driverDL: req.body.driverDL })
                .exec((err, retrievedDriverDetails) => {
                    if (err) {
                        logger.error(err.message, 'driverController: createDriver', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Driver', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedDriverDetails)) {
                        let newDriver = new DriverModel({
                            driverId: shortid.generate(),
                            driverName: req.body.driverName,
                            driverEmail: req.body.driverEmail.toLowerCase(),
                            driverPanCardNumber: req.body.driverPanCardNumber,
                            driverDL: req.body.driverDL,
                            language: req.body.language,
                            driverMobileNumber: req.body.driverMobileNumber,
                            driverGrade: req.body.driverGrade,
                            driverAddress: req.body.driverAddress,
                        })
                        newDriver.save((err, newDriver) => {
                            if (err) {
                                logger.error(err.message, 'driverController: createDriver', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Driver', 500, null)
                                reject(apiResponse)
                            } else {
                                let newDriverObj = newDriver.toObject();
                                resolve(newDriverObj);
                            }
                        })
                    } else {
                        logger.error('Driver Cannot Be Created.Driver Already Present', 'driverController: createDriver', 4)
                        let apiResponse = response.generate(true, 'Driver Already Present With this Email or DrivingLicence', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    } // end create driver function

    validateDriverInput(req, res)
        .then(createDriver)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Driver Added', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
} // end of addDriver Function.

let editDriver = (req, res) => {
    let options = req.body;
    DriverModel.update({ 'driverId': req.params.driverId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'driverController:editDriver', 10)
            let apiResponse = response.generate(true, 'Failed To edit driver details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Driver Found', 'driverController:editDriver')
            let apiResponse = response.generate(true, 'No Driver Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Driver details edited', 200, result)
            res.send(apiResponse)
        }
    })
} // end edit driver




module.exports = {
    getAllDrivers: getAllDrivers,
    getDriverInfo: getDriverInfo,
    addDriver: addDriver,
    editDriver: editDriver
}