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


let getAllBookings = (req, res) => {
    BookingModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'bookingController: getAllBookings', 10)
                let apiResponse = response.generate(true, 'Failed To Find Booking Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No booking found', 'bookingController: getAllBookings')
                let apiResponse = response.generate(true, 'No booking found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Bookings found', 'bookingController: getAllBookings');
                let apiResponse = response.generate(false, 'All car details found', 200, result)
                res.send(apiResponse)
            }
        })
} // end of getAllBookings function.

let getBookingDetails = (req, res) => {
    BookingModel.findOne({ 'bookingId': req.params.bookingId })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                logger.error(err.message, 'bookingController: getBookingDetails', 10)
                let apiResponse = response.generate(true, 'Failed To Find Booking Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Booking found', 'bookingController: getBookingDetails')
                let apiResponse = response.generate(true, 'No Booking found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Booking Details found', 'bookingController: getBookingDetails');
                let apiResponse = response.generate(false, 'Booking details found', 200, result)
                res.send(apiResponse)
            }
        })
} //end of getBookingDetails function.

let editBooking = (req, res) => {
    let options = req.body;
    BookingModel.update({ 'bookingId': req.params.bookingId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'bookingController:editBooking', 10)
            let apiResponse = response.generate(true, 'Failed To edit booking details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Booking Found', 'bookingController:editBooking')
            let apiResponse = response.generate(true, 'No Booking Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Booking details edited', 200, result)
            res.send(apiResponse)
        }
    })
} // end editBooking function.

let createBooking = (req, res) => {
    let validateBookingInput = () => {
        return new Promise((resolve, reject) => {
            console.log("req body is:", req.body);
            if (req.body.userEmail) {
                console.log("req body is:", req.body);
                if (!validateInput.Email(req.body.userEmail)) {
                    let apiResponse = response.generate(true, 'UserEmail Does not met the requirement', 400, null)
                    reject(apiResponse)
                }
                else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During Booking Creation', 'bookingController: createBooking()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    } // end validateBookingInput function.

    let createNewBooking = () => {
        return new Promise((resolve, reject) => {
            let newBooking = new BookingModel({
                bookingId: shortid.generate(),
                userId: req.body.userId,
                bookedDriverId: req.body.bookedDriverId,
                destinationTravelledArray: req.body.destinationTravelledArray,
                bookingCarId: req.body.bookingCarId,
                userEmail: req.body.userEmail,
                tripType: req.body.tripType,
                originAddress: req.body.originAddress,
                destinationAddress: req.body.destinationAddress,
                departureDate: req.body.departureDate,
                departureDateString: req.body.departureDate,
                returnDate: req.body.returnDate,
                returnDateString: req.body.returnDate,
                userMobileNumber: req.body.userMobileNumber,
                amount: req.body.amount,
                paymentStatus: req.body.paymentStatus
            })
            newBooking.save((err, newBooking) => {
                if (err) {
                    logger.error(err.message, 'bookingController: createBooking', 10)
                    let apiResponse = response.generate(true, 'Failed to create new booking', 500, null)
                    reject(apiResponse)
                } else {
                    let newBookingObj = newBooking.toObject();
                    resolve(newBookingObj);
                }
            })
        })
    } // end createNewBooking function.

    validateBookingInput(req, res)
        .then(createNewBooking)
        .then((resolve) => {

            let apiResponse = response.generate(false, 'Booking created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
} // end createBooking function.


module.exports = {
    getAllBookings: getAllBookings,
    getBookingDetails: getBookingDetails,
    editBooking: editBooking,
    createBooking: createBooking
}