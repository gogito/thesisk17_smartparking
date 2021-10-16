
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

var fnameE = document.getElementById("Fname");
var lnameE = document.getElementById("Lname");
var emailE = document.getElementById("email");
var personalIDE = document.getElementById("personalID");


function updateUserInfo() {
    if (userTypeInfo == "User")
        putUserInfo();
    else putOwnerInfo();
}


function putUserInfo() {
    var fname = fnameE.value;
    var lname = lnameE.value;
    var email = emailE.value;
    var personal = personalIDE.value;
    ////console.log(fname + lname);
    // window.location.href = "../user.php";
    fetch(API_USER_LIST + "/" + currentUserInfoCookie, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            info: {
                name: {
                    FName: fname,
                    LName: lname,
                },
                email: email,
                personalID: personal,
            }
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            ////console.log(data);
            if (data._id != null) {
                alert("Update account successfully");
                window.location.href = "index.php?page=us";
            } else {
                //console.log(data);
                fnameE.value = "";
                lnameE.value = "";
                personalIDE.value = "";
                emailE.value = "";
                alert("Failed to update account");
            }
        })
        .catch((error) => {
            //console.log(error);
            //console.log(error.response);
        });
}


function putOwnerInfo() {
    var fname = fnameE.value;
    var lname = lnameE.value;
    var email = emailE.value;
    var personal = personalIDE.value;
    //console.log(fname + lname);
    // window.location.href = "../user.php";
    fetch(API_OWNER_LIST + "/" + currentUserInfoCookie, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            info: {
                name: {
                    FName: fname,
                    LName: lname,
                },
                email: email,
                personalID: personal,
            }
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            if (data._id != null) {
                alert("Update account successfully");
                window.location.href = "index.php?page=on";
            } else {
                //console.log(data);
                fnameE.value = "";
                lnameE.value = "";
                personalIDE.value = "";
                emailE.value = "";
                alert("Failed to update account");
            }
        })
        .catch((error) => {
            //console.log(error);
            //console.log(error.response);
        });
}


