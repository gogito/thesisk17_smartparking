

function login() {
  var userE = document.getElementById("username");
  var passE = document.getElementById("password");
  var adminCheckbox = document.getElementById("admin");
  var ownerCheckbox = document.getElementById("owner");
  var user = userE.value;
  var pass = passE.value;
  //   console.log("Click login button");
  if (adminCheckbox.checked) {
    adminLogin(user, pass);
  }
  else if (ownerCheckbox.checked) {
    ownerLogin(user, pass);
  }
  else {
    alert("Something wrong, please try again!");
    userE.value = "";
    passE.value = "";
  }

}

function adminLogin(user, pass) {
  var userE = document.getElementById("username");
  var passE = document.getElementById("password");
  fetch(API_ADMIN_LOGIN, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: user, password: pass }),
  })
    .then((response) => response.json())
    .then((data) => {
      // window.location.href = "index.html"
      if (data._id != null) {
        // console.log("Success");
        window.location.href = "index.php?page=db";
        document.cookie = "currentUser=" + JSON.stringify(data) + "; max-age=86400; path=/;";
      } else {
        // console.log(data);
        userE.value = "";
        passE.value = "";
        alert("Wrong username or password");
      }
    })
    .catch((error) => {
      userE.value = "";
    passE.value = "";
      alert("Wrong username or password");
      // console.log(error.response);
    });
}
function ownerLogin(user, pass) {
  var userE = document.getElementById("username");
  var passE = document.getElementById("password");
  fetch(API_OWNER_LOGIN, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: user, password: pass }),
  })
    .then((response) => response.json())
    .then((data) => {
      // window.location.href = "index.html"
      if (data._id != null) {
        // console.log("Success");
        window.location.href = "index.php?page=odb";
        document.cookie = "currentUser=" + JSON.stringify(data) + "; max-age=86400; path=/;";
      } else {
        // console.log(data);
        userE.value = "";
        passE.value = "";
        alert("Wrong username or password");
      }
    })
    .catch((error) => {
      userE.value = "";
    passE.value = "";
      alert("Wrong username or password");
      // console.log(error.response);
    });
}

