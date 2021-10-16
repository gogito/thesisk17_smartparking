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
function getParkingLotsList() {
  // console.log("create Parking lots List");
  fetch(API_PARKINGLOTS_LIST)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot =
            totalslot + data[i].area[j].slots.length;
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
        $("#dataTable").DataTable();
      });
    });
}

function getOwnedParkingLotsList() {
  // console.log("create Owned Parking lots List");
  var api = API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/parking"
  if (JSON.parse(currentUserCookie).userType == "Admin") {
    var currentUserInfoCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("currentUserInfo="))
      .split("=")[1];
    api = API_OWNER_LIST + "/" + currentUserInfoCookie + "/parking"
  }
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot =
            totalslot + data[i].area[j].slots.length;
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
        $("#dataTable").DataTable();
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
  // console.log(id);
  if (confirm("Are you sure to DELETE this parking lot?")) {
    confirmCancelBooking(id);
    // window.location.href("parkinglots.php");
  }
}

function confirmCancelBooking(id) {
  // console.log(API_PARKINGLOTS_LIST + "/" + id);
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
      alert("Failed to delete parking lot!");
    });
  // location.reload();
}
