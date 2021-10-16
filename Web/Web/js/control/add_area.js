var currentParkingrCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("updateParkinglot="))
  .split("=")[1];
function updateInfo(){
  var parkingName = document.getElementById("parkinglotName");
  parkingName.value = JSON.parse(currentParkingrCookie).name;
}
function addParkinglot() {
  var nameE = document.getElementById("name");
  var slotE = document.getElementById("slot");
  var priceE = document.getElementById("price");

  var name = nameE.value;
  var slot = slotE.value;
  var price = priceE.value;
  var slotsStatus = [];
  for (var i = 0; i < slot; i++){
    slotsStatus.push(0);
  }

  fetch(API_PARKINGLOTS_LIST + "/" + JSON.parse(currentParkingrCookie).id + "/area", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area:{
        name: name,
        price: price,
        slots:slotsStatus
      }
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      alert("Add area successfully!");
      window.location.href = "index.php?page=opl"
    })
    .catch((error) => {
      // console.log(error);
      console.log(error.response);
      alert("Failed to add area!");
      nameE.value = "";
      priceE.value = "";
      slotE.value = "";
    });
}
