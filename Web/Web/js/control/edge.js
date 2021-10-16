var totalEdge = document.getElementById("totalEdge");
var totalParkinglot = document.getElementById("totalParkinglot");
var totalRequest = document.getElementById("totalRequest");

// console.log("Edge có chạy nha");
getCount();
setInterval(function () {
  getCount();
}, 5000);

function getCount() {
  var currentUserCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUser="))
    .split("=")[1];

  var userType = JSON.parse(currentUserCookie).userType;

  var api = API_REQUEST + "/count";
  if (userType == "Owner") {
    api = API_REQUEST + "/count/" + JSON.parse(currentUserCookie)._id;
  }
  // console.log(api);
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
    //   console.log(data);
      totalEdge.innerHTML = data.total_edge_id_array.length;
      totalParkinglot.innerHTML = data.total_parkinglot_array.length;
      totalRequest.innerHTML = data.total_request;
    });
}
