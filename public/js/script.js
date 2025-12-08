// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();

// Dynamic rating display for review form
document.addEventListener('DOMContentLoaded', function() {
  const ratingInput = document.getElementById('rating');
  const ratingValue = document.getElementById('rating-value');

  if (ratingInput && ratingValue) {
    // Set initial value
    ratingValue.textContent = ratingInput.value;

    // Update value on input change
    ratingInput.addEventListener('input', function() {
      ratingValue.textContent = this.value;
    });
  }
});
