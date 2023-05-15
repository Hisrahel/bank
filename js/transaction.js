// // Check login status
// if (!sessionStorage.getItem('loggedIn')) {
//   // Redirect unauthorized users
//   window.location.href = '/index.html';
// }
$(document).ready(function() {
  // Initializing withdrawal pop over
  $('#withdraw-btn').popover({
    html: true
  });

  // When user clicks confirm button in the Withdraw popover
  $(document).on('click', '#withdraw-confirm', function() {
    let amount = parseInt($('#withdraw-amount').val().replace(/,/g, ''));
    if (isNaN(amount)) {
      $('#withdraw-error-modal').modal('show');
    } else if (amount < 0) {
      $('#withdraw-negative-modal').modal('show');
    } else {
      // Performing withdrawal process
      let totalAmount = parseInt($('#total-amount').text().replace(/,/g, ''));
      if (amount > totalAmount) {
        $('#withdraw-insufficient-modal').modal('show');
      } else {
        // Generate random 5-digit OTP
        let randomOTP = Math.floor(10000 + Math.random() * 90000);

        // Store the OTP in local storage
        localStorage.setItem('otp', randomOTP);

        // Display the OTP as a modal
        $('#otp-modal').modal('show');
        $('#otp-random-number').text(randomOTP);

        // When user enters OTP
        $(document).on('click', '#otp-confirm', function() {
          let enteredOTP = $('#otp-input').val();
          // Validate entered OTP
          if (enteredOTP && enteredOTP.length === 5 && enteredOTP === randomOTP.toString()) {
            // Ask user to confirm withdrawal
            $('#withdraw-confirmation-modal .modal-body p').text('Are you sure you want to withdraw ' + amount.toLocaleString() + '?');
            $('#withdraw-confirmation-modal').modal('show').on('hidden.bs.modal', function() {
              $('#withdraw-success-modal').modal('show');
            });
            $(document).on('click', '#withdraw-confirmation-confirm', function() {
              // Deduct the amount from the total amount
              totalAmount -= amount;
              // Update the total amount display and store the updated amount in local storage
              $('#total-amount').text(totalAmount.toLocaleString());
              localStorage.setItem('totalAmount', totalAmount);
              $('#withdraw-success-modal .modal-body').text('Withdrawal of ' + amount.toLocaleString() + ' has been successful. The amount has been deducted from your account Number ' + $('#Account-No').text() + '.');
              $('#withdraw-confirmation-modal').modal('hide');
            });
          } else {
            $('#withdraw-otp-error-modal').modal('show');
          }
          $('#otp-input').val('');
          $('#otp-modal').modal('hide');
        });
      }

      // Hide the popover
      $('#withdraw-btn').popover('hide');
    }
  });
});

// retrieving the inputted username
document.addEventListener("DOMContentLoaded", function() {
  updateDashboard();
  
  // Listen for changes in localStorage
  window.addEventListener('storage', function(event) {
      if (event.key === 'username') {
          updateDashboard();
      }
  });
});

function updateDashboard() {
  var name = localStorage.getItem("username");
  var usernameElement = document.getElementById("username");
  usernameElement.textContent = name ? "Welcome, " + name : "";
}

// Function to reload dashboard.js
function reloadDashboard() {
  var script = document.createElement('script');
  script.src = 'dashboard.js';
  document.head.appendChild(script);
}
