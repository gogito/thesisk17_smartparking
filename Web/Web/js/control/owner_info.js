var confirm_btn =
  '<a href="#" id="confirm" class="btn btn-primary btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-plus"></i>' +
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

// console.log(userTypeInfo);
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
  var updatebtn = document.getElementById("updateBtn");

  fetch(API_OWNER_LIST + "/" + currentUserInfoCookie, {
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
  if (JSON.parse(currentUserCookie).userType == "Owner") {
    updatebtn.style.display = "none";
  }

  getOwnedParkingLotsList();
}

function getOwnedParkingLotsList() {
  // console.log("create Owned Parking lots List");
  var api = API_OWNER_LIST + "/" + currentUserInfoCookie + "/parking";
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot = totalslot + data[i].area[j].slots.length;
          // console.log(totalslot);
        }
        createNewRow(
          data[i]._id,
          data[i].name,
          data[i].address,
          totalarea,
          totalslot,
          Math.round(data[i].status * 100) + "%"
        );
      }
      $(document).ready(function () {
        $("#dataParkinglotTable").DataTable();
      });
    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status) {
  var body = document.getElementById("tableBodyParkingLots");

  var row = document.createElement("tr");

  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBox(status, row);
  // console.log(userid);
  addButton(row, id, userid);
  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function addButton(row, id, name) {
  var btn = document.createElement("td");
  btn.id = id;
  btn.innerHTML = info_btn + " " + cancel_btn;

  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, name);
}

function matchFunction(btnGroup, name) {
  var id = btnGroup.id;
  var addBtn;
  var infoBtn;
  var cancelBtn;
  infoBtn = btnGroup.children[0];
  cancelBtn = btnGroup.children[1];

  cancelBtn.onclick = function () {
    handleCancelButtonPress(id);
  };

  infoBtn.onclick = function () {
    document.cookie = "currentParkinglot=" + id + "; max-age=3000; path=/;";
    window.location.href = "index.php?page=upl";
  };
}

function handleCancelButtonPress(id) {
  console.log(id);
  if (confirm("Are you sure to DELETE this parking lot?")) {
    confirmCancelBooking(id);
    // window.location.href("parkinglots.php");
  }
}

function confirmCancelBooking(id) {
  fetch(API_PARKINGLOTS_LIST + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      alert("Delete parking lot successfully!");
      location.reload();
    })
    .catch((error) => {
      console.log(error.message);
      alert("Failed to delete parking lot!");
    });
}

function addParkinglot() {
  var latitudeE = document.getElementById("pllat");
  var longitudeE = document.getElementById("pllong");
  var numberE = document.getElementById("pladdress_number");
  var streetE = document.getElementById("pladdress_street");
  var districtE = document.getElementById("pladdress_district");
  var cityE = document.getElementById("pladdress_city");
  var countryE = document.getElementById("pladdress_country");
  var nameE = document.getElementById("plname");
  var thumnailE = document.getElementById("plimg");
  // var ownerIDE = document.getElementById("ownerID");

  var latitude = latitudeE.value;
  var longitude = longitudeE.value;
  var number = numberE.value;
  var street = streetE.value;
  var district = districtE.value;
  var city = cityE.value;
  var country = countryE.value;
  var name = nameE.value;
  var thumnail = thumnailE.value;
  var ownerID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUserInfo="))
    .split("=")[1];

  console.log(JSON.parse(currentUserCookie).userType);
  if (JSON.parse(currentUserCookie).userType == "Owner") {
    ownerID = JSON.parse(currentUserCookie)._id;
  }

  fetch(API_PARKINGLOTS_LIST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinate: {
        latitude: longitude,
        longitude: latitude,
      },
      detail_address: {
        number: number,
        street: street,
        district: district,
        city_province: city,
        country: country,
      },
      name: name,
      image: thumnail,
      ownerID: ownerID,
      status: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data._id != null) {
        alert("Create parking lot successfully");
        location.reload();
      } else {
        // console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        numberE.value = "";
        streetE.value = "";
        districtE.value = "";
        cityE.value = "";
        countryE.value = "";
        // ownerIDE.value = "";
        thumnailE.value = "";
        alert("Failed to create parking lot");
      }
    })
    .catch((error) => {
      // console.log(error);
      console.log(error.response);
    });
}
