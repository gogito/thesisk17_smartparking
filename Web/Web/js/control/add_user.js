function addUser() {
  var fnameE = document.getElementById("Fname");
  var lnameE = document.getElementById("Lname");
  var usernameE = document.getElementById("username");
  var passE = document.getElementById("password");
  var emailE = document.getElementById("email");
  var personalE = document.getElementById("personalID");
  var plateE = document.getElementById("plate");

  var fname = fnameE.value;
  var lname = lnameE.value;
  var username = usernameE.value;
  var password = passE.value;
  var email = emailE.value;
  var personal = personalE.value;
  var plate = plateE.value;
  // console.log(fname + lname + username + password + email + personal);
  // console.log(API_USER_REGISTER);
  // window.location.href = "../user.php";
  fetch(API_USER_REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: {
        FName: fname,
        LName: lname,
      },
      username: username,
      password: password,
      email: email,
      personalID: personal,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data._id != null) {
        alert("Create account successfully");
        window.location.href = "index.php?page=us";
      } else {
        // console.log(data);
        fnameE.value = "";
        lnameE.value = "";
        usernameE.value = "";
        passE.value = "";
        plateE.value = "";
        personalE.value = "";
        emailE.value = "";
        alert("Failed to create account");
      }
    })
    .catch((error) => {
      // console.log(error);
      console.log(error.response);
    });
}

