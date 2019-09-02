const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const driverController = require("./../../app/controllers/driverController");
const carController = require("./../../app/controllers/carController");
const bookingController = require("./../../app/controllers/bookingController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    //-------------- routes for user -----------

    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    app.post(`${baseUrl}/login`, userController.loginFunction);

    app.post(`${baseUrl}/logout`,auth.isAuthorized, userController.logout);

    //-------------- routes for driver ------------

    app.get(`${baseUrl}/details/allDrivers`,auth.isAuthorized,driverController.getAllDrivers);

    app.get(`${baseUrl}/read/:driverId/Details`,auth.isAuthorized,driverController.getDriverInfo);

    app.post(`${baseUrl}/add/driver`,auth.isAuthorized,driverController.addDriver);

    app.put(`${baseUrl}/:driverId/edit`, auth.isAuthorized,driverController.editDriver);

    //--------------- routes for car --------------

    app.get(`${baseUrl}/details/allCars`,auth.isAuthorized,carController.getAllCars);

    app.get(`${baseUrl}/read/:carId/Detail`,auth.isAuthorized,carController.getCarInfo);

    app.post(`${baseUrl}/add/car`,auth.isAuthorized,carController.addCar);

    app.put(`${baseUrl}/edit/:carId`, auth.isAuthorized,carController.editCar);

    //---------------------- routes for booking ----------------

    app.get(`${baseUrl}/details/allBookings`,auth.isAuthorized,bookingController.getAllBookings);

    app.get(`${baseUrl}/get/:bookingId/Details`,auth.isAuthorized,bookingController.getBookingDetails);

    app.put(`${baseUrl}/:bookingId/edits`, auth.isAuthorized,bookingController.editBooking);

    app.post(`${baseUrl}/create/booking`, auth.isAuthorized,bookingController.createBooking);

    app.post(`${baseUrl}/save/booking/data`,bookingController.saveBookingData);

}