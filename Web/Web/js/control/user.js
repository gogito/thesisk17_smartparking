var confirm_btn = '<a href="#" id="confirm" class="btn btn-primary btn-default custom">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-check"></i>'
  + '</span>'
  + '</a>'
var info_btn = '<a href="#" id="info" class="btn btn-success btn-default custom">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-info"></i>'
  + '</span>'
  + '</a>'
var cancel_btn = '<a href="#" id="cancel" class="btn btn-danger btn-default custom">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-times"></i>'
  + '</span>'
  + '</a>';


function getUserList() {

  //console.log("create Booking List");
  fetch(API_USER_LIST)
    .then((response) => response.json())
    .then((data) => {


      for (var i = 0; i < data.length; i++) {
        var carplate = '';
        for (var j = 0; j < data[i].carplateNumber.length; j++) {
          carplate = carplate + data[i].carplateNumber[j] + '\n';
        }
        createNewRow(data[i]._id, data[i].name.FName + " " + data[i].name.LName, data[i].personalID, data[i].email, carplate, data[i].currentBooking);
      }
      $(document).ready(function () {
        $('#dataTable').DataTable();
      });
    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status) {
  var body = document.getElementById("tableBody");

  var row = document.createElement("tr");

  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBox(status, row);
  addButton(row, id);

  body.appendChild(row);
}


function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function addButton(row, id) {
  var btn = document.createElement("td");
  btn.id = id;
  btn.innerHTML = info_btn + " " + cancel_btn;
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn);

}

function matchFunction(btnGroup) {
  var id = btnGroup.id;
  // var confirmBtn = btnGroup.children[0];
  var infoBtn = btnGroup.children[0];
  var cancelBtn = btnGroup.children[1];
  // confirmBtn.onclick = function () { handleConfirmButtonPress(id) };
  cancelBtn.onclick = function () { handleCancelButtonPress(id) };
  infoBtn.onclick = function () { 
    //console.log("checked");
    document.cookie = "currentUserInfo=" + id + "; max-age=3600; path=/;"; 
    document.cookie = "currentUserInfoType=User; max-age=3600; path=/;"; 
  };
  infoBtn.href = "index.php?page=ui"
}

function handleCancelButtonPress(id) {
  //console.log(id);
  if (confirm("Are you sure to DELETE this user?")) {
    confirmCancelBooking(id);
    // location.reload();
  }
}

function confirmCancelBooking(id) {
  fetch(API_USER_LIST + "/" + id, {
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