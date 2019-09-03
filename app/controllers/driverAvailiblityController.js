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





Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
     dateArray.push(new Date (stopDate));
    return dateArray;
}


// var date1 = new Date();
// console.log( typeof date1);

// var date2 = new Date("2019-09-10");
// console.log(date2);


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };
  
//   var date = new Date("2019-09-05");
//   date.yyyymmdd();


console.log(getDates(date1,date2));


let createDriverBookedDateArray =(startingDate,endingDate)=>{


    let startDate = new Date(startingDate)
    let endDate = new Date(endingDate)

    let datesArray = getDates(startDate,endDate);


    let datesStringArray=[]

    for(let x of datesArray){
        let tempDate= new Date(x)
        datesStringArray.push(tempDate.toDateString())
    }


    return datesArray;

}





let createDriverAvailiblityObj =(bookingData)=>{



DriverBookedModel.findOne({'bookingId':bookingData.bookingId})
.exec((err, result) => {
    if (err) {
        console.log(err);
        logger.error(err.message, 'driverAvailablity: getBookingDetails', 10)
        let apiResponse = response.generate(true, 'Failed To Find Driver Booking Details', 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {


let startDate = new Date(bookingData.departureDate)
    let endDate = new Date(bookingData.returnDate)

    let bookedDaysArray = createDriverBookedDateArray(startDate,endDate)


    let bookedDriverObj = new DriverBookedModel({
        driverBookedInfoID : shortid.generate(),
        driverID:bookingData.bookedDriverId,
        bookingId:bookingData.bookingId,
        bookingEndDate:endDate,
        bookedDays:bookedDaysArray
    })
    bookedDriverObj.save((err, newDvrBookedObj) => {
        if (err) {
            logger.error(err.message, 'bookingController: createBooking', 10)
            let apiResponse = response.generate(true, 'Failed to  new driver Booked obj', 500, null)
            res.send (apiResponse)
        } else {
            // let newBookingObj = newBooking.toObject();
            let apiResponse = response.generate(false, 'created new driver Booked obj successfully', 200,newDvrBookedObj)
            res.send (apiResponse)
            
        }
    })


       
    } else {
        logger.info('Booking Details found', 'driverAvailablity: getBookingDetails');
        let apiResponse = response.generate(false, 'Driver Booking details eith same booking id found', 200, result)
        res.send(apiResponse)
    }
})
}




let getDriverAvilablity = (req,res) =>{
   let daysToBeChecked = createDriverBookedDateArray(req.body.startDate,req.body.endDate);
   let theDriverBookedObjectArray =[]
for (let x of daysToBeChecked)
{
    DriverBookedModel.findOne({'bookedDays':x})
    .exec((err,result)=>{
        if (err) {
            console.log(err);
            logger.error(err.message, 'driverAvailablity: getBookingDetails', 10)
        } else if (check.isEmpty(result)) {
            theDriverBookedObjectArray.push(result)
        }
        else{
            
        }

    })
}


if(theDriverBookedObjectArray.length > 0){
    let apiResponse = response.generate(false, 'got driver Booked obj array successfully', 200,theDriverBookedObject)
    res.send (apiResponse)
}
else{
    //logger.error(err.message, 'bookingController: createBooking', 10)
    let apiResponse = response.generate(true, 'no driver Booked obj found', 500, theDriverBookedObjectArray)
    res.send (apiResponse)
}


   
}



//get driverBookedObj



module.exports={
    createDriverAvailiblityObj:createDriverAvailiblityObj,
    getDriverAvilablity:getDriverAvilablity
}






