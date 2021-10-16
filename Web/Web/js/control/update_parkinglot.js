var confirm_btn = '<a href="#" id="confirm" class="btn btn-primary btn-default">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-check"></i>'
  + '</span>'
  + '</a>'
var update_btn =
  '<a href="#" id="info" class="btn btn-success btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-check"></i>' +
  "</span>" +
  "</a>";
var cancel_btn =
  '<a href="#" id="cancel" class="btn btn-danger btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-times"></i>' +
  "</span>" +
  "</a>";
var currentParkingrCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentParkinglot="))
  .split("=")[1];

var latitudeE = document.getElementById("lat");
var longitudeE = document.getElementById("long");
var numberE = document.getElementById("address_number");
var streetE = document.getElementById("address_street");
var districtE = document.getElementById("address_district");
var cityE = document.getElementById("address_city");
var countryE = document.getElementById("address_country");
var nameE = document.getElementById("name");
var thumnailE = document.getElementById("img");
var parkinglottable = document.getElementById("areatable");
var addareatable = document.getElementById("addareatable");
var data = { info: {detail_address:{
  number:'',
   street:'',
  district: '',
  city_province: '',
  country:''
}} };
// var areaname = document.getElementById("name");
// var areaslot = document.getElementById("slot");
// var areaprice = document.getElementById("price");
function updateParkinglotInfo() {
  var latitude = latitudeE.value;
  var longitude = longitudeE.value;
  var number = numberE.value;
  var street = streetE.value;
  var district = districtE.value;
  var city = cityE.value;
  var country = countryE.value;
  var name = nameE.value;
  var thumnail = thumnailE.value;
  //   //console.log(latitude);
  if (latitude.length > 0 && longitude.length > 0) {
    // //console.log("Run");
    data.info = { coordinate: { longitude: latitude, latitude: longitude } };
  }
  if (country != "")
    data.info.detail_address.country = country;
  if (city != "") {
    data.info.detail_address.city_province = city;
  }
  if (district != "") {
    data.info.detail_address.district = district;
  }
  if (street != "") {
    data.info.detail_address.street = street;
  }

  if (number != "") {
    data.info.detail_address.number = number;
  }
  if (name != "") {
    data.info = { ...data.info, name: name };
  }
  if (thumnail != "") {
    data.info = { ...data.info, image: thumnail };
  }
  // //console.log(data);
  putUserInfo(data);
}
function getOldData() {
  // //console.log("get old data");
  // getParkingLotsList()
  if (JSON.parse(currentUserCookie).userType == "Admin") {
    parkinglottable.style.display = "none";
    addareatable.style.display = "none";
  }
  getAreaData();
  getParkinglotBookingList();
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  //console.log(API_PARKINGLOTS_LIST + "/" + currentParkinglotID);
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID)
    .then((response) => response.json())
    .then((dataRes) => {
      //console.log(dataRes);
      latitudeE.placeholder = dataRes.coordinate.longitude;
      longitudeE.placeholder = dataRes.coordinate.latitude;
      nameE.placeholder = dataRes.name;
      numberE.placeholder = dataRes.detail_address.number;
      streetE.placeholder = dataRes.detail_address.street;
      districtE.placeholder = dataRes.detail_address.district;
      cityE.placeholder = dataRes.detail_address.city_province;
      countryE.placeholder = dataRes.detail_address.country;
      data.info.detail_address = {
        number: dataRes.detail_address.number,
        street: dataRes.detail_address.street,
        district: dataRes.detail_address.district,
        city_province: dataRes.detail_address.city_province,
        country: dataRes.detail_address.country
      };
    });
}
function putUserInfo(dataIn) {
  //console.log(dataIn);
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  //console.log(JSON.stringify(dataIn));
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataIn),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      if (data._id != null) {
        alert("Update parking lot successfully");
        if (JSON.parse(currentUserCookie).userType == "Admin") {
          window.location.href = "index.php?page=pl";
        }
        else window.location.href = "index.php?page=opl";
        
      } else {
        //console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        numberE.value = "";
        streetE.value = "";
        districtE.value = "";
        cityE.value = "";
        countryE.value = "";
        nameE.value = "";
        thumnailE.value = "";
        alert("Failed to update parking lot");
      }
    })
    .catch((error) => {
      //console.log(error);
      //console.log(error.response);
    });
}

function getAreaData() {
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      for (var i = 0; i < data.area.length; i++) {
        //console.log(data.area[i].name);
        createNewRow(
          data.area[i].name,
          data.area[i].slots.length,
          data.area[i].price,
          currentParkinglotID,
          i
        );
      }
      $(document).ready(function () {
        $("#dataTable").DataTable();
      });
    });
}
function createNewRow(name, slot, price, id, number) {
  var body = document.getElementById("tableBodyArea");

  var row = document.createElement("tr");
  if (price >= 0){
    price = numberWithCommas(price);
  }
  createSingleBox(name, row, id, 1, number);
  createSingleBox(slot, row, id, 2, number);
  createSingleBox(price, row, id, 3, number);
  addButton(row, id, name, number);
  body.appendChild(row);
}

function createSingleBox(content, row, id, option, number) {
  var p = document.createElement("td");
  var inputTxt;
  switch (option) {
    case 1:
      inputTxt = document.createTextNode(content);
      inputTxt.id = "name" + id + number;
      break;
    case 2:
      inputTxt = document.createTextNode(content);
      inputTxt.id = "slot" + id + number;
      break;
    case 3:
      inputTxt = document.createElement("input");
      inputTxt.value = content;
      inputTxt.id = "price" + id + number;
      break;
  }
  p.appendChild(inputTxt);
  row.appendChild(p);
}

function addButton(row, id, name, number) {
  var btn = document.createElement("td");
  btn.id = id;
  btn.innerHTML = update_btn + " " + cancel_btn;
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, name, id, number);
}

function matchFunction(btnGroup, name, id, number) {
  var id = btnGroup.id;
  var updateBtn = btnGroup.children[0];
  var cancelBtn = btnGroup.children[1];
  updateBtn.onclick = function () {
    updateAreaData(name, id, number);
  };
  cancelBtn.onclick = function () {
    handleCancelButtonPress(id, name);
  };
}

function updateAreaData(name, id, number) {
  // var nameE = document.getElementById("name" + id + number);
  var priceE = document.getElementById("price" + id + number);

  // var name = nameE.innerHTML;
  var price = priceE.value;

  //console.log({
  //   area: {
  //     name: name,
  //     price: price,
  //   },
  // });

  fetch(API_PARKINGLOTS_LIST + "/" + id + "/area/price", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
        price: price,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      alert("Change area successfully!");
      location.reload();
    })
    .catch((error) => {
      alert("Failed to change area!");
      // //console.log(error);
      //console.log(error.response);
    });
}

function handleCancelButtonPress(id, name) {
  //console.log(id);
  if (confirm("Are you sure to DELETE this area?")) {
    confirmDeleteArea(id, name);
    // window.location.href("parkinglots.php");
  }
}

function confirmDeleteArea(id, name) {
  // //console.log({area: {
  //   name: name,
  // },});
  fetch(API_PARKINGLOTS_LIST + "/" + id  + "/area", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      alert("Delete area successfully!");
      location.reload();
    })
    .catch((error) => {
      alert("Failed to delete area!");
    });
  // location.reload();
}


function addArea() {
  var nameE = document.getElementById("areaname");
  var slotE = document.getElementById("areaslot");
  var priceE = document.getElementById("areaprice");

  var name = nameE.value;
  var slot = slotE.value;
  var price = priceE.value;
  var slotsStatus = [];
  for (var i = 0; i < slot; i++) {
    slotsStatus.push(0);
  }
  //console.log({
  //   area: {
  //     name: name,
  //     price: price,
  //     slots: slotsStatus,
  //   },
  // });
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkingrCookie + "/area", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
        price: price,
        slots: slotsStatus,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      alert("Add area successfully!");
      location.reload();  
    })
    .catch((error) => {
      //console.log(error);
      //console.log(error.response);
      alert("Failed to add area!");
      nameE.value = "";
      priceE.value = "";
      slotE.value = "";
    });
}



function getParkinglotBookingList() {
  //console.log("create Owner Booking List");
  var currentUserCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('currentUser='))
  .split('=')[1];
  //console.log(API_PARKINGLOTS_LIST + "/" + currentParkingrCookie + "/booking");
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkingrCookie + "/booking")
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      for (var i = 0; i < data.length; i++) {
        // createNewRow(data[i]._id, data[i].userName.FName + " " + data[i].userName.LName, data[i].parkinglotName, data[i].areaName, data[i].slot_id, data[i].status);
        createNewRowPL(data[i]._id, data[i].userName? data[i].userName.FName + " " + data[i].userName.LName : "Username", data[i].parkinglotName, data[i].areaName, data[i].slot_id, data[i].status, data[i].price, data[i].created_at);
      }
      $(document).ready(function () {
        $('#dataTable1').DataTable();
      });

    });
}

function createNewRowPL(id, userid, parkingid, areaname, slotid, status, price, date) {
  var body = document.getElementById("tableBookingBody");

  var row = document.createElement("tr");
  if (price >= 0)
  price = numberWithCommas(price); 
  
  createSingleBoxPL(id, row);
  createSingleBoxPL(userid, row);
  createSingleBoxPL(parkingid, row);
  createSingleBoxPL(areaname, row);
  createSingleBoxPL(slotid, row);
  createSingleBoxStatusBookingPL(status, row);
  createSingleBoxPL(date, row);
  createSingleBoxPL(price, row);
  if (status == "Booked") {
    addButtonPL(row, id, 1);
  }
  else {
    addButtonPL(row, id, 2);
  }

  body.appendChild(row);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function createSingleBoxPL(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function createSingleBoxStatusBookingPL(content, row) {
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

/* <span class="mr-2">
  <i class="fas fa-circle text-danger"></i> 
  Failed
  </span> */

function addButtonPL(row, id, option) {
  var btn = document.createElement("td");
  btn.id = id;
  switch (option) {
    case 1:
      btn.innerHTML = confirm_btn + cancel_btn;
      break;
  }
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunctionPL(btn, option);

}

function matchFunctionPL(btnGroup, option) {
  var id = btnGroup.id;
  switch (option) {
    case 1:
      var confirmBtn = btnGroup.children[0];
      var cancelBtn = btnGroup.children[1];
      confirmBtn.onclick = function () { handleConfirmButtonPressPL(id) };
      cancelBtn.onclick = function () { handleCancelButtonPressPL(id) };
      // handleConfirmButtonPress();
      break;
    case 2:
      // btn.innerHTML = info_btn;
      break;
  }
}

function handleConfirmButtonPressPL(id) {
  // alert(id);
  //console.log(id);
  if (confirm("Are you sure to make this booking success?")) {
    confirmSuccessBookingPL(id);
    // location.reload();
  }
}

function confirmSuccessBookingPL(id) {
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
function handleCancelButtonPressPL(id) {
  //console.log(id);
  if (confirm("Are you sure to cancel this booking?")) {
    confirmCancelBookingPL(id);
    // location.reload();
  }
}

function confirmCancelBookingPL(id) {
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