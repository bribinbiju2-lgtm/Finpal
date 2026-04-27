let expenses = [];

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc || !amount) return alert("Please enter valid data");

  expenses.push({ desc, amount, category });
  updateTable();
  updateChart();
}

function updateTable() {
  const table = document.getElementById("expenseTable");
  table.innerHTML = "<tr><th>Description</th><th>Amount</th><th>Category</th></tr>";
  expenses.forEach(e => {
    table.innerHTML += `<tr><td>${e.desc}</td><td>$${e.amount.toFixed(2)}</td><td>${e.category}</td></tr>`;
  });
}

function updateChart() {
  const categories = {};
  expenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c", "#9b59b6"]
      }]
    }
  });
}
