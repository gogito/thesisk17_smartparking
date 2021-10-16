const { parentPort, workerData } = require("worker_threads");
parentPort.postMessage(getName_worker
    (
        workerData.booking_array,
        workerData.parkinglot_array,
        workerData.user_array
    )
)

function getName_worker(bookingArray, arrayOfParkinglot, arrayOfUser) {
    // console.log(arrayOfParkinglot[0]);
    // for (let i = 0; i < bookingArray.length; i++) {

    //     let found_parkinglot = arrayOfParkinglot.find(element => element._id == bookingArray[i].parkinglotID)
    //     let found_user = arrayOfUser.find(element => element._id == bookingArray[i].userID)
    //     let found_area = found_parkinglot.area.find(element => element.name == bookingArray[i].areaName)

    //     bookingArray[i].parkinglotName = found_parkinglot.name;
    //     bookingArray[i].parkinglotAddress = found_parkinglot.address;
    //     bookingArray[i].userName = found_user.name;
    //     bookingArray[i].price = found_area.price;
    // }


    // console.log(bookingArray);
    // console.log(arrayOfParkinglot);
    return {booking: bookingArray, parking: arrayOfParkinglot, user: arrayOfUser};

};






