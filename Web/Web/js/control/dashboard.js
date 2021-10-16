var currentUserCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUser="))
    .split("=")[1];

var userType = JSON.parse(currentUserCookie).userType;
var totalUserData = 0;
var totalOwnerData = 0;
var totalParkinglotData = 0;
var totalBookingData = 0;

// function updateData() {
// console.log("DATA UPDATING");
var totalUser = document.getElementById("totalUser");
var totalOwner = document.getElementById("totalOwner");
var totalParkinglot = document.getElementById("totalParkingLot");
var totalBooking = document.getElementById("totalBooking");
getTotalBooking();
getTotalParkinglot();
if (userType == "Admin") {
    getTotalUser();
    getTotalOwner();
}
// }

function getTotalUser() {
    fetch(API_USER_LIST)
        .then((response) => response.json())
        .then((data) => {
            totalUserData = data.length;
            totalUser.innerHTML = totalUserData;
        });
}

function getTotalOwner() {
    fetch(API_OWNER_LIST)
        .then((response) => response.json())
        .then((data) => {
            totalOwnerData = data.length;
            totalOwner.innerHTML = totalOwnerData;
        });
}

function getTotalBooking() {
    switch (userType) {
        case 'Admin':
            fetch(API_BOOKING_LIST)
                .then((response) => response.json())
                .then((data) => {
                    totalBookingData = data.length;
                    totalBooking.innerHTML = totalBookingData;
                    // console.log(totalBookingData);
                });
            break;
        case 'Owner':
            fetch(API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/booking")
                .then((response) => response.json())
                .then((data) => {
                    totalBookingData = data.length;
                    totalBooking.innerHTML = totalBookingData;
                });
            break;
    }
}

function getTotalParkinglot() {
    switch (userType) {
        case 'Admin':
            fetch(API_PARKINGLOTS_LIST)
                .then((response) => response.json())
                .then((data) => {
                    totalParkinglotData = data.length;
                    totalParkinglot.innerHTML = totalParkinglotData;
                });
            break;
        case 'Owner':
            fetch(API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/parking")
                .then((response) => response.json())
                .then((data) => {
                    totalParkinglotData = data.length;
                    totalParkinglot.innerHTML = totalParkinglotData;
                });
            break;
    }
}

