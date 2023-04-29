$(document).ready(function() {
    // Initialize popover for Deposit button
    $('#deposit-btn').popover({
      html: true
    });
  
    // Retrieve the total amount from local storage
    let totalAmount = parseInt(localStorage.getItem('totalAmount')) || 0;
    $('#total-amount').text(totalAmount.toLocaleString());
  
    // When user clicks confirm button in the Deposit popover
    $(document).on('click', '#deposit-confirm', function() {
      let amount = parseInt($('#deposit-amount').val().replace(/,/g, ''));
      if (isNaN(amount) || amount < 0) { // Check if amount is negative
        $('#deposit-error-modal').modal('show');
      } else {
        // Perform deposit process
        totalAmount += amount;
  
        // Update the deposit confirmation modal
        $('#deposit-confirmation-amount').text(amount.toLocaleString());
        $('#deposit-confirmation-total-amount').text(totalAmount.toLocaleString());
  
        // Show the deposit confirmation modal
        $('#deposit-modal').modal('show');
  
        // When user clicks confirm button in the deposit confirmation modal
        $(document).on('click', '#deposit-confirmation-confirm', function() {
          $('#deposit-modal').modal('hide');
          $('#total-amount').text(totalAmount.toLocaleString()); // Update total amount display
  
          // Save the total amount to local storage
          localStorage.setItem('totalAmount', totalAmount);
  
          // Show the success modal
          $('#success-modal').find('.modal-body').html(`You have successfully deposited ${amount.toLocaleString()} to your account!`);
          $('#success-modal').modal('show');
  
          // Hide the popover
          $('#deposit-btn').popover('hide');
        });
      }
    });
  
  });
