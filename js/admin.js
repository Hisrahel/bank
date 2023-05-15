const totalAmountElement = document.querySelector('#total-amount');
const addAmountInput = document.querySelector('#add-amount');
const addAmountButton = document.querySelector('#add-amount-btn');
const subtractAmountInput = document.querySelector('#subtract-amount');
const subtractAmountButton = document.querySelector('#subtract-amount-btn');

// Load the saved total amount value from storage (or use 0 if not found)
let currentTotalAmount = parseFloat(localStorage.getItem('totalAmount') || 0);
totalAmountElement.textContent = currentTotalAmount.toLocaleString();

// Add a click event listener to the add amount button
addAmountButton.addEventListener('click', function() {
  let addAmount = parseFloat(addAmountInput.value);
  currentTotalAmount += addAmount;
  totalAmountElement.textContent = currentTotalAmount.toLocaleString();
  localStorage.setItem('totalAmount', currentTotalAmount);
});

// Add a click event listener to the subtract amount button
subtractAmountButton.addEventListener('click', function() {
  let subtractAmount = parseFloat(subtractAmountInput.value);
  currentTotalAmount -= subtractAmount;
  totalAmountElement.textContent = currentTotalAmount.toLocaleString();
  localStorage.setItem('totalAmount', currentTotalAmount);
});


function submitName() {
  var name = document.getElementById("name").value;
  localStorage.setItem("username", name);
  updateDashboard();
}
