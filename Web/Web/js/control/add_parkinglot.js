var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];
function addParkinglot() {
  var latitudeE = document.getElementById("lat");
  var longitudeE = document.getElementById("long");
  var numberE = document.getElementById("address_number");
  var streetE = document.getElementById("address_street");
  var districtE = document.getElementById("address_district");
  var cityE = document.getElementById("address_city");
  var countryE = document.getElementById("address_country");
  var nameE = document.getElementById("name");
  var thumnailE = document.getElementById("img");
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
  var ownerID ;

  // console.log(JSON.parse(currentUserCookie).userType);
  if (JSON.parse(currentUserCookie).userType == "Owner") {
    ownerID = JSON.parse(currentUserCookie)._id;
  }
  else {
    ownerID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUserInfo="))
    .split("=")[1];
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
        country: country
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
        if (JSON.parse(currentUserCookie).userType == "Admin") {
          window.location.href = "index.php?page=pl";
        } else if (JSON.parse(currentUserCookie).userType == "Owner") {
          window.location.href = "index.php?page=opl";
        }
      } else {
        // console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        numberE.value = "";
        streetE.value = "";
        districtE.value = "";
        cityE.value = "";
        countryE.value = "";
        ownerIDE.value = "";
        thumnailE.value = "";
        alert("Failed to create parking lot");
      }
    })
    .catch((error) => {
      // console.log(error);
      // console.log(error.response);
    });

}