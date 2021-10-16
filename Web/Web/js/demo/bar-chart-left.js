// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctxBarL = document.getElementById("myBarChart-Left");
var labelBarL = ["", "", "", "", "", ""];
var dataBarL = [0, 0, 0, 0, 0, 0];
var myBarChartL;
function UpdateBarL() {
  myBarChartL = new Chart(ctxBarL, {
    type: 'bar',
    data: {
      labels: labelBarL,
      datasets: [{
        label: "Requests",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: dataBarL,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 6
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return number_format(value);
            }
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return number_format(tooltipItem.yLabel) + " " + datasetLabel;
          }
        }
      },
    }
  });
}

//Loop
getDataBarChartL();
setInterval(function () {
  getDataBarChartL();
}, 5000);

function pushDataBarL(data) {
  data.sort(compare);
  var lowerRange = Math.min(data.length, dataBarL.length);

  for (var i = 0; i < lowerRange; i++) {
    dataBarL[i] = data[i].count;
    labelBarL[i] = data[i].edge_id;
  }
  // console.log(data);
}

function getDataBarChartL() {
  var currentUserCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUser="))
    .split("=")[1];

  var userType = JSON.parse(currentUserCookie).userType;

  var api = API_REQUEST + "/count";
  if (userType == "Owner") {
    api = API_REQUEST + "/count/" + JSON.parse(currentUserCookie)._id; 
  }
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      pushDataBarL(data.total_edge_id_array);
      // console.log(data);
      UpdateBarL();
    });

}

function compare( a, b ) {
  if ( a.count < b.count ){
    return 1;
  }
  if (a.count > b.count ){
    return -1;
  }
  return 0;
}