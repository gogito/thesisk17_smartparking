var confirm_btn =
  '<a href="#" id="confirm" class="btn btn-primary btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-check"></i>' +
  "</span>" +
  "</a>";
var info_btn =
  '<a href="#" id="info" class="btn btn-success btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-info"></i>' +
  "</span>" +
  "</a>";
var cancel_btn =
  '<a href="#" id="cancel" class="btn btn-danger btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-times"></i>' +
  "</span>" +
  "</a>";
var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];
var userTypeInfo = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfoType="))
  .split("=")[1];
var currentUserInfoCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfo="))
  .split("=")[1];

// //console.log(userTypeInfo);
function updateUserInfo() {
  var ownerParkinglot = document.getElementById("ownerParkinglot");
  var updateBtn = document.getElementById("updateBtn");

  var name = document.getElementById("name");
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var personalID = document.getElementById("personalID");
  var parkinglot = document.getElementById("parkinglot");

  getUserInfo(name, username, email, personalID);
}

function getUserInfo(name, username, email, personalID) {
  // getBookingList();
  // getParkingLotsList();
  // var LINKAPI;
  var bookingtable = document.getElementById("bookingtable");
  // //console.log(LINKAPI);
  fetch(API_USER_LIST + "/" + currentUserInfoCookie, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      name.innerHTML = data.name.FName + " " + data.name.LName;
      username.value = data.username;
      email.value = data.email;
      personalID.value = data.personalID;
    })
    .catch((error) => {});

    getUserBookingList();
}

function getUserBookingList() {

  //console.log("create Booking List");
  fetch(API_USER_LIST + "/" +  currentUserInfoCookie + "/booking")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      for (var i = 0; i < data.length; i++) {
        createNewRow(data[i]._id, data[i].userName? data[i].userName.FName + " " + data[i].userName.LName : "Username", data[i].parkinglotName, data[i].areaName, data[i].slot_id, data[i].status, data[i].price, data[i].created_at);
      }
      $(document).ready(function () {
        $('#dataTable').DataTable();
      });

    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status, price, date) {
  var body = document.getElementById("tableBody");

  var row = document.createElement("tr");
  if (price >= 0)
  price = numberWithCommas(price);
  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBoxStatusBooking(status, row);
  createSingleBox(date, row);
  createSingleBox(price, row);
  if (status == "Booked") {
    addButton(row, id, 1);
  }
  else {
    addButton(row, id, 2);
  }

  body.appendChild(row);
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function createSingleBoxStatusBooking(content, row) {
  var p = document.createElement("td");
  
  var ih = document.createElement("span");
  if(content == "Failed"){
  ih.className = 'badge badge-danger';
  }
  else if (content == "Success") {
    ih.className = 'badge badge-primary';
  }

  else if (content == "Booked") {
    ih.className = 'badge badge-success';
  }

  var pTxt = document.createTextNode(content);
  p.appendChild(ih);
 
  ih.appendChild(pTxt);
  row.appendChild(p);
}

function addButton(row, id, option) {
  var btn = document.createElement("td");
  btn.id = id;
  switch (option) {
    case 1:
      btn.innerHTML = confirm_btn + " " + cancel_btn;
      break;
  }
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, option);

}

function matchFunction(btnGroup, option) {
  var id = btnGroup.id;
  switch (option) {
    case 1:
      var confirmBtn = btnGroup.children[0];
      var cancelBtn = btnGroup.children[1];
      confirmBtn.onclick = function () { handleConfirmButtonPress(id) };
      cancelBtn.onclick = function () { handleCancelButtonPress(id) };
      // handleConfirmButtonPress();
      break;
    case 2:
      // btn.innerHTML = info_btn;
      break;
  }
}

function handleConfirmButtonPress(id) {
  // alert(id);
  //console.log(id);
  if (confirm("Are you sure to make this booking success?")) {
    confirmSuccessBooking(id);
    // location.reload();
  }
}

function confirmSuccessBooking(id) {
  fetch(API_BOOKING_LIST + "/" + id, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      location.reload();
    })
    .catch((error) => {
    });
}
function handleCancelButtonPress(id) {
  //console.log(id);
  if (confirm("Are you sure to cancel this booking?")) {
    confirmCancelBooking(id);
    // location.reload();
  }
}

function confirmCancelBooking(id) {
  fetch(API_BOOKING_LIST + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      location.reload();
    })
    .catch((error) => {
    });
}