// Event Handlers
//==============================

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

// Charts
// ===========================



$.get("/api/transaction").then(function (result) {
  var entertainmentCount = 0;
  var billsCount = 0;
  var personalCareCount = 0;
  var miscCount = 0;
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
  }
  // Doughnut Chart
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

  // Bar Chart Creation
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

  // Pie Chart
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
});