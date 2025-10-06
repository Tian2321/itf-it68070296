let accountBalance = 1000;
let cashBalance = 500;


function updateBalances() {
  document.getElementById("account-balance").value = accountBalance.toFixed(2);
  document.getElementById("cash-balance").value = cashBalance.toFixed(2);
}


function logMessage(msg) {
  const log = document.getElementById("log");
  const time = new Date().toLocaleTimeString();
  log.value += `[${time}] ${msg}\n`;
  log.scrollTop = log.scrollHeight;
}


document.getElementById("proceed-btn").addEventListener("click", function() {
  const type = document.getElementById("operation").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    logMessage("⚠️ Invalid amount. Please enter a positive number.");
    return;
  }

  if (type === "deposit") {
    if (cashBalance >= amount) {
      accountBalance += amount;
      cashBalance -= amount;
      logMessage(`✅ Deposited ${amount.toFixed(2)} THB.`);
    } else {
      logMessage("❌ Not enough cash to deposit.");
    }
  } else if (type === "withdraw") {
    if (accountBalance >= amount) {
      accountBalance -= amount;
      cashBalance += amount;
      logMessage(`💸 Withdrawn ${amount.toFixed(2)} THB.`);
    } else {
      logMessage("❌ Insufficient account balance.");
    }
  }

  updateBalances();
  document.getElementById("amount").value = "";
});


document.getElementById("convert-btn").addEventListener("click", function() {
  const input = parseFloat(document.getElementById("input-balance").value);
  const currency = document.getElementById("currency").value;
  const outputField = document.getElementById("output-balance");

  if (isNaN(input) || input <= 0) {
    logMessage("⚠️ Please enter a valid amount to convert.");
    return;
  }

  let rate = 1;
  switch (currency) {
    case "USD": rate = 36.5; break;
    case "JPY": rate = 0.25; break;
    case "EUR": rate = 39.0; break;
  }

  const result = input * rate;
  outputField.value = `${result.toFixed(2)} THB`;
  logMessage(`💱 Converted ${input} ${currency} → ${result.toFixed(2)} THB.`);
});


document.getElementById("reset-btn").addEventListener("click", function() {
  accountBalance = 1000;
  cashBalance = 500;
  updateBalances();
  logMessage("🔄 Balances reset to default values.");
});


window.onload = updateBalances;
