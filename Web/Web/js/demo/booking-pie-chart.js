// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
var pieChartData;

var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];

var userType = JSON.parse(currentUserCookie).userType;


// Pie Chart Example
// setPieChart(15,30,55);
updateData();
var ctx = document.getElementById("myPieChart");


function setPieChart(a, b, c) {
  pieChartData = [a,b,c]
}

function updateData() {
  // console.log(userType);
  if (userType == "Admin") {
    systemUpdate();
  }
  else if (userType == "Owner") {
    ownerUpdate();
  }
}


function ownerUpdate() {
  var booked = 0;
  var success = 0;
  var failed = 0;
  fetch(API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/booking")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == "Success") success = success + 1;
        if (data[i].status == "Failed") failed = failed + 1;
        if (data[i].status == "Booked") booked = booked + 1;
      }
      console.log(failed);
      setPieChart(success, booked, failed);
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Success", "Booked", "Failed"],
          datasets: [{
            data: pieChartData,
            backgroundColor: ['#4e73df', '#1cc88a', '#e74a3b'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 0,
        },
      });
    });
}

function systemUpdate() {
  var booked = 0;
  var success = 0;
  var failed = 0;
  fetch(API_BOOKING_LIST)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == "Success") success = success + 1;
        if (data[i].status == "Failed") failed = failed + 1;
        if (data[i].status == "Booked") booked = booked + 1;
      }
      setPieChart(success, booked, failed);
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Success", "Booked", "Failed"],
          datasets: [{
            data: pieChartData,
            backgroundColor: ['#4e73df', '#1cc88a', '#e74a3b'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
          },
          legend: {
            display: false
          },
          cutoutPercentage: 0,
        },
      });
    });
}