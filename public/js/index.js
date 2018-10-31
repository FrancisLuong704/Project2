//Button Collapse Filter Handler & Input Jquery
// =============================
$("#day-filter").on("click", function (event) {
  event.preventDefault();
  $("#month-filter-form").attr("class", "collapse");
  $("#year-filter-form").attr("class", "collapse")
});

$("#month-filter").on("click", function (event) {
  event.preventDefault();
  $("#day-filter-form").attr("class", "collapse");
  $("#year-filter-form").attr("class", "collapse")
});

$("#year-filter").on("click", function (event) {
  event.preventDefault();
  $("#day-filter-form").attr("class", "collapse");
  $("#month-filter-form").attr("class", "collapse")
});

// Year pre-filled Dates
$("#year-date-start").attr("value", "1950");
$("#year-date-end").attr("value", moment().format("YYYY"));
$("#year-date-end").attr("max", moment().format("YYYY"));

// Day pre-filled Dates
$("#month-date-end").attr("value", moment().format("YYYY-MM"));
$("#month-date-end").attr("max", moment().format("YYYY-MM"));

// Day pre-filled Dates
$("#day-date-end").attr("value", moment().format("YYYY-MM-DD"));
$("#day-date-end").attr("max", moment().format("YYYY-MM-DD"));

// Event Handlers
//==============================
// ADD TRANSFER HANDLER
$("#submit-button").on("click", function (event) {
  event.preventDefault();
  // Construct the object to be sent to the server using the form data.
  var data = {
    type: $("select.type")
      .children("option:selected")
      .val(),
    category: $("select.category")
      .children("option:selected")
      .val(),
    date: $("#date-input").val(),
    amount: $("#amount-input").val(),
    memo: $("#memo-input").val()
  };

  console.log(data);
  // Posts constructed data object to the server THEN reloads page.
  $.post("/api/transaction", data).then(function () {
    location.reload();
  });
});

//Update A Transaction
$(document).on("click", "button.update", function (event) {
  event.preventDefault();
  //grab id from transaction and set to var
  var id = $(this).data("id");
  //set all the data to a variable ready to swap out
  var updatedData = {
    type: $("select.typeUp" + id)
      .children("option:selected").val(),
    category: $("select.categoryUp" + id)
      .children("option:selected").val(),
    date: $(".date-input" + id).val(),
    amount: $(".amount-input" + id).val(),
    memo: $(".memo-input" + id).val()
  };
  //tells me what im pulling
  console.log("id: " + id);
  console.log("Data Type: " + updatedData.type);
  console.log("Data Category: " + updatedData.category);
  console.log("Data Date: " + updatedData.date);
  console.log("Data Amount: " + updatedData.amount);
  console.log("Data Memo: " + updatedData.memo);
  //ajax call to api route
  $.ajax("/api/transaction/" + id, {
    method: "PUT",
    data: updatedData
  }).then(function () {
    location.reload();
  });
});
//Delete A Transaction
$(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/transaction/" + id
  }).then(function () {
    location.reload();
  });
});
// ADD FILTER HANDLER
var filter = "";
$(".apply-filter-button").on("click", function (event) {
  event.preventDefault();
  if ($(this).attr("data-timeMetric") === "d") {
    var startDay = $("#day-date-start").val().replace(/-/g, "");
    var endDay = $("#day-date-end").val().replace(/-/g, "");
    filter = "yearmonthday/" + startDay + "/" + endDay;
  } else if ($(this).attr("data-timeMetric") === "m") {
    var startMonth = $("#month-date-start").val().replace(/-/g, "");
    var endMonth = $("#month-date-end").val().replace(/-/g, "");
    filter = "yearmonth/" + startMonth + "/" + endMonth;
  } else if ($(this).attr("data-timeMetric") === "y") {
    var startYear = $("#year-date-start").val();
    var endYear = $("#year-date-end").val();
    alert(startYear + "  " + endYear);
    filter = "year/" + startYear + "/" + endYear;
  }
});

// Charts
// ============================================================

// Get Data from Database to use in all charts. Uses filter variable above.
$.get("/api/transaction/" + filter).then(function (result) {
  var entertainmentCount = 0;
  var billsCount = 0;
  var personalCareCount = 0;
  var miscCount = 0;
  var withdrawCount = 0;
  var depositCount = 0;
  for (i = 0; i < result.length; i++) {
    if (result[i].category === "Entertainment") {
      entertainmentCount++;
    } else if (result[i].category === "Bills") {
      billsCount++;
    } else if (result[i].category === "Personal Care") {
      personalCareCount++;
    } else {
      miscCount++;
    }
    if (result[i].type === "Withdraw") {
      withdrawCount++;
    } else {
      depositCount++;
    }
  }

  // ===================================================================

  // Spending By Category -- Doughnut Chart
  var ctx = $("#spendChartDoughnut");
  var spendChartDoughnut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: "Spending Per Category",
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Spending By Category --- Bar Chart Creation
  var ctx = $("#spendChartBar");
  var spendChartBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: 'Spending Per Category',
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Spending By Category --- Pie Chart
  var ctx = $("#spendChartPie");
  var spendChartPie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: 'Spending Per Category',
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // =====================================================================================

  // Withdraw vs Deposit -- Doughnut Chart
  var ctx = $("#typeChartDoughnut");
  var typeChartDoughnut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: "Spending Per Category",
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Withdraw vs Deposit --- Bar Chart Creation
  var ctx = $("#typeChartBar");
  var typeChartBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: 'Spending Per Category',
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Withdraw vs Deposit --- Pie Chart
  var ctx = $("#typeChartPie");
  var typeChartPie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: 'Spending Per Category',
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  //TIME LINE CHART
  $.get("/api/transaction/timeline/20181030/Withdraw", function(data) {
    console.log(data);
  });

  // ====================================================================
  // Withdraw vs Deposit --- Main Time Chart
  var ctx = $("#mainTimeChart");
  var mainTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["days"],
      datasets: [{
        label: 'Spending Month by Month',
        data: [5, 4, 1, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });
});
