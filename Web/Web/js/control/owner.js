var confirm_btn = '<a href="#" id="confirm" class="btn btn-primary btn-default">'
    + '<span class="icon text-white-50">'
    + '<i class="fas fa-plus"></i>'
    + '</span>'
    + '</a>'
var info_btn = '<a href="#" id="info" class="btn btn-success btn-default">'
    + '<span class="icon text-white-50">'
    + '<i class="fas fa-info"></i>'
    + '</span>'
    + '</a>'
var cancel_btn = '<a href="#" id="cancel" class="btn btn-danger btn-default">'
    + '<span class="icon text-white-50">'
    + '<i class="fas fa-times"></i>'
    + '</span>'
    + '</a>';

var currentUserCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUser="))
    .split("=")[1];

function getOwnerList() {

    // console.log("create Owner List");
    fetch(API_OWNER_LIST)
        .then((response) => response.json())
        .then((data) => {

            for (var i = 0; i < data.length; i++) {
                var parkingId =
                    '<a href="#" class="btn">' + data[i].ownedParking.length + '</a>';
                // console.log(data[i]);
                // var parkingId = '';
                // for (var j = 0; j < data[i].ownedParking.length; j++) {
                //     if (j != data[i].ownedParking.length - 1)
                //         parkingId = parkingId + data[i].ownedParking[j] + '----';
                //     else parkingId = parkingId + data[i].ownedParking[j];
                // }
                createNewRow(data[i]._id, data[i].name.FName + " " + data[i].name.LName, data[i].email, parkingId);
            }
            $(document).ready(function () {
                $('#dataTable').DataTable();
            });
        });
}

function createNewRow(id, name, email, parkinglotID) {
    var body = document.getElementById("tableBody");

    var row = document.createElement("tr");

    createSingleBox(id, row);
    createSingleBox(name, row);
    createSingleBox(email, row);
    // createSingleBox(parkinglotID, row);
    addAButton(row, id, parkinglotID);
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
    // if (JSON.parse(currentUserCookie).userType == "Admin") {
    //     btn.innerHTML = confirm_btn + info_btn + cancel_btn;
    // }
    document.body.appendChild(btn);
    row.appendChild(btn);
    matchFunction(btn);

}

function matchFunction(btnGroup) {
    var id = btnGroup.id;
    var addBtn;
    var infoBtn = btnGroup.children[0];
    var cancelBtn = btnGroup.children[1];
    // if (JSON.parse(currentUserCookie).userType == "Admin") {
    //     addBtn = btnGroup.children[0];
    //     infoBtn = btnGroup.children[1];
    //     cancelBtn = btnGroup.children[2];
    //     addBtn.onclick = function () { 
    //         document.cookie = "currentOwnerID=" + id + "; max-age=3600; path=/;";
    //         window.location.href = "add_parkinglot.php";
    //      };
    // }

    cancelBtn.onclick = function () { handleCancelButtonPress(id) };
    infoBtn.onclick = function () {
        // console.log("checked");
        document.cookie = "currentUserInfo=" + id + "; max-age=3600; path=/;";
        document.cookie = "currentUserInfoType=Owner; max-age=3600; path=/;";
    };
    infoBtn.href = "index.php?page=oi"
}

function handleCancelButtonPress(id) {
    // console.log(id);
    if (confirm("Are you sure to DELETE this user?")) {
        confirmCancelBooking(id);
        // location.reload();
    }
}

function confirmCancelBooking(id) {
    fetch(API_OWNER_LIST + "/" + id, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            location.reload();
        })
        .catch((error) => {
        });
}

function addAButton(row, id, content) {
    var btn = document.createElement("td");
    btn.innerHTML = content
    document.body.appendChild(btn);
    row.appendChild(btn);


}

function addfunction() {

}