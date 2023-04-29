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
        // Display OTP as modal
        $('#otp-modal').modal('show');

        // When user enters OTP
        $(document).on('click', '#otp-confirm', function() {
          let otp = $('#otp-input').val();
          // Validate OTP
          if (otp && otp.length === 5) {
            // Ask user to confirm withdrawal
            $('#withdraw-confirmation-modal .modal-body p').text('Are you sure you want to withdraw ' + amount.toLocaleString() + '?');
            $('#withdraw-confirmation-modal').modal('show').on('hidden.bs.modal', function () {
              $('#withdraw-success-modal').modal('show');
            });
            $(document).on('click', '#withdraw-confirmation-confirm', function() {
              // Deduct the amount from total amount
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