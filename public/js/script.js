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

// Image preview functionality for file uploads
document.addEventListener('DOMContentLoaded', function() {
  const imageInputs = document.querySelectorAll('input[type="file"][name*="image"]');
  
  imageInputs.forEach(input => {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Create preview container if it doesn't exist
        let previewContainer = input.parentNode.querySelector('.image-preview');
        if (!previewContainer) {
          previewContainer = document.createElement('div');
          previewContainer.className = 'image-preview mt-2';
          input.parentNode.appendChild(previewContainer);
        }
        
        // Clear previous preview
        previewContainer.innerHTML = '';
        
        // Create image element for preview
        const img = document.createElement('img');
        img.style.maxWidth = '200px';
        img.style.borderRadius = '8px';
        img.style.border = '2px solid #007bff';
        
        // Create file reader to show preview
        const reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        // Add preview text
        const previewText = document.createElement('p');
        previewText.className = 'text-muted small mt-1';
        previewText.textContent = `Preview: ${file.name}`;
        
        // Add elements to container
        previewContainer.appendChild(img);
        previewContainer.appendChild(previewText);
      }

    });
  });
});


// Book Now functionality
function handleBookNow(listingId) {
  // Show alert that booking functionality is coming soon
  alert('🎉 Booking functionality is coming soon!\n\nYou will be able to:\n• Select dates\n• Choose guests\n• Make payments\n• Receive confirmations\n\nStay tuned for this feature!');
}

// Listings Page Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get filter elements
  const searchFilter = document.getElementById('searchFilter');
  const locationFilter = document.getElementById('locationFilter');
  const countryFilter = document.getElementById('countryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const resetBtn = document.getElementById('resetFilters');
  const listingsGrid = document.getElementById('listingsGrid');
  const noResults = document.getElementById('noResults');
  const currentCount = document.getElementById('current-count');
  
  // Get all listing items
  const listingItems = document.querySelectorAll('.listing-item');
  const totalListings = listingItems.length;

  // Filter function
  function filterListings() {
    const searchTerm = searchFilter.value.toLowerCase().trim();
    const selectedLocation = locationFilter.value;
    const selectedCountry = countryFilter.value;
    const maxPrice = parseInt(priceFilter.value);

    let visibleCount = 0;

    listingItems.forEach(item => {
      const title = item.dataset.title;
      const description = item.dataset.description;
      const location = item.dataset.location;
      const country = item.dataset.country;
      const price = parseInt(item.dataset.price);

      // Check search filter
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm);

      // Check location filter
      const matchesLocation = !selectedLocation || location === selectedLocation;

      // Check country filter
      const matchesCountry = !selectedCountry || country === selectedCountry;

      // Check price filter
      const matchesPrice = price <= maxPrice;

      // Show/hide item based on all filters
      if (matchesSearch && matchesLocation && matchesCountry && matchesPrice) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Update count display
    currentCount.textContent = visibleCount;

    // Show/hide no results message
    if (visibleCount === 0) {
      listingsGrid.style.display = 'none';
      noResults.style.display = 'block';
    } else {
      listingsGrid.style.display = '';
      noResults.style.display = 'none';
    }
  }

  // Update price display
  function updatePriceDisplay() {
    const value = parseInt(priceFilter.value);
    priceValue.textContent = `₹${value.toLocaleString()}`;
  }

  // Reset all filters
  function resetFilters() {
    searchFilter.value = '';
    locationFilter.value = '';
    countryFilter.value = '';
    priceFilter.value = priceFilter.max;
    updatePriceDisplay();
    filterListings();
  }

  // Event listeners
  if (searchFilter) {
    searchFilter.addEventListener('input', filterListings);
  }

  if (locationFilter) {
    locationFilter.addEventListener('change', filterListings);
  }

  if (countryFilter) {
    countryFilter.addEventListener('change', filterListings);
  }

  if (priceFilter) {
    priceFilter.addEventListener('input', function() {
      updatePriceDisplay();
      filterListings();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  // Initialize price display
  if (priceFilter && priceValue) {
    updatePriceDisplay();
  }

  // Initial filter check (in case of pre-filled values)
  filterListings();
});


// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Enhanced Authentication Forms
document.addEventListener('DOMContentLoaded', function() {
  // Password visibility toggle
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  passwordInputs.forEach(input => {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleBtn.title = 'Show/Hide password';
    
    // Position toggle button
    const wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    wrapper.appendChild(toggleBtn);
    
    // Toggle functionality
    toggleBtn.addEventListener('click', function() {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Update icon
      const icon = this.querySelector('i');
      icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
  });

  // Real-time validation feedback
  const formInputs = document.querySelectorAll('.auth-form .form-control');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      // Remove validation classes on input
      this.classList.remove('is-valid', 'is-invalid');
      
      // Clear previous custom feedback
      const feedback = this.parentNode.querySelector('.custom-feedback');
      if (feedback) {
        feedback.remove();
      }
    });
  });

  // Enhanced form submission
  const authForms = document.querySelectorAll('.auth-form');
  
  authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        
        // Focus on first invalid field
        const firstInvalid = this.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      } else {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Re-enable after 3 seconds (fallback)
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
      
      this.classList.add('was-validated');
    });
  });
});

// Field validation function
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let message = '';

  // Clear previous custom feedback
  const existingFeedback = field.parentNode.querySelector('.custom-feedback');
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Validation rules
  switch(fieldName) {
    case 'username':
      if (value.length < 3) {
        isValid = false;
        message = 'Username must be at least 3 characters long';
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        isValid = false;
        message = 'Username can only contain letters, numbers, and underscores';
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
      break;
      
    case 'password':
      if (value.length < 6) {
        isValid = false;
        message = 'Password must be at least 6 characters long';
      }
      break;
  }

  // Apply validation classes and feedback
  field.classList.remove('is-valid', 'is-invalid');
  
  if (value && !isValid) {
    field.classList.add('is-invalid');
    showCustomFeedback(field, message, 'error');
  } else if (value && isValid) {
    field.classList.add('is-valid');
    showCustomFeedback(field, 'Looks good!', 'success');
  }
}

// Show custom feedback
function showCustomFeedback(field, message, type) {
  const feedback = document.createElement('div');
  feedback.className = `custom-feedback ${type}-feedback`;
  feedback.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i> ${message}`;
  
  field.parentNode.appendChild(feedback);
}


// Add password toggle styles
const style = document.createElement('style');
style.textContent = `
  .password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 0.25rem;
    z-index: 10;
    transition: color 0.3s ease;
  }
  
  .password-toggle:hover {
    color: #667eea;
  }
  
  .custom-feedback {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .custom-feedback.error-feedback {
    color: #dc3545;
  }
  
  .custom-feedback.success-feedback {
    color: #28a745;
  }
  
  .auth-form .form-control {
    padding-right: 2.5rem;
  }
`;
document.head.appendChild(style);

// Booking System JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Booking form functionality
  const bookingForm = document.getElementById('bookingForm');
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  const guestsSelect = document.getElementById('guests');
  const bookingBtn = document.getElementById('bookingBtn');
  const bookingSummary = document.getElementById('bookingSummary');
  const nightsCount = document.getElementById('nightsCount');
  const totalPriceElement = document.getElementById('totalPrice');
  
  if (bookingForm) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;

    // Get listing price from the page
    const priceElement = document.querySelector('.price-amount');
    const listingPrice = priceElement ? parseFloat(priceElement.textContent.replace('₹', '').replace(',', '')) : 0;

    // Update check-out minimum date when check-in changes
    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // Clear check-out if it's before the new minimum
        if (checkOutInput.value && new Date(checkOutInput.value) <= selectedDate) {
          checkOutInput.value = '';
        }
        
        updateBookingSummary();
      });
    }

    // Update booking summary when dates or guests change
    [checkInInput, checkOutInput, guestsSelect].forEach(input => {
      if (input) {
        input.addEventListener('change', updateBookingSummary);
        input.addEventListener('input', updateBookingSummary);
      }
    });

    function updateBookingSummary() {
      const checkInDate = new Date(checkInInput?.value);
      const checkOutDate = new Date(checkOutInput?.value);
      const guests = parseInt(guestsSelect?.value);

      // Validate dates
      if (checkInDate && checkOutDate && checkOutDate > checkInDate && guests) {
        // Calculate nights
        const timeDiff = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        // Calculate total price
        const totalPrice = listingPrice * nights;

        // Update display
        if (nightsCount) nightsCount.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
        if (totalPriceElement) totalPriceElement.textContent = `₹${totalPrice.toLocaleString()}`;
        
        // Show summary and enable button
        if (bookingSummary) bookingSummary.style.display = 'block';
        if (bookingBtn) {
          bookingBtn.disabled = false;
          bookingBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Book Now';
        }

        // Check availability
        checkAvailability(checkInInput.value, checkOutInput.value, guests);
      } else {
        // Hide summary and disable button
        if (bookingSummary) bookingSummary.style.display = 'none';
        if (bookingBtn) {
          bookingBtn.disabled = true;
          bookingBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Complete Details';
        }
      }
    }

    // Check availability function
    async function checkAvailability(checkIn, checkOut, guests) {
      const listingId = window.location.pathname.split('/').pop();
      
      try {
        const response = await fetch(`/bookings/${listingId}/availability?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
        const data = await response.json();
        
        const availabilityStatus = document.querySelector('.availability-status .status-badge');
        
        if (data.available) {
          if (availabilityStatus) {
            availabilityStatus.className = 'status-badge available';
            availabilityStatus.innerHTML = '<i class="fas fa-check-circle"></i> Available';
          }
          if (bookingBtn) {
            bookingBtn.disabled = false;
            bookingBtn.classList.remove('btn-danger');
            bookingBtn.classList.add('btn-success');
          }
        } else {
          if (availabilityStatus) {
            availabilityStatus.className = 'status-badge unavailable';
            availabilityStatus.innerHTML = '<i class="fas fa-times-circle"></i> Not Available';
            availabilityStatus.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
            availabilityStatus.style.color = '#dc3545';
            availabilityStatus.style.border = '1px solid rgba(220, 53, 69, 0.3)';
          }
          if (bookingBtn) {
            bookingBtn.disabled = true;
            bookingBtn.classList.remove('btn-success');
            bookingBtn.classList.add('btn-danger');
            bookingBtn.innerHTML = '<i class="fas fa-times-circle"></i> Not Available';
          }
        }
      } catch (error) {
        console.error('Error checking availability:', error);
      }
    }

    // Form submission handling
    bookingForm.addEventListener('submit', function(e) {
      const checkInDate = new Date(checkInInput?.value);
      const checkOutDate = new Date(checkOutInput?.value);
      const guests = parseInt(guestsSelect?.value);

      // Validation
      let isValid = true;
      let errorMessage = '';

      if (!checkInInput?.value) {
        isValid = false;
        errorMessage = 'Please select a check-in date';
      } else if (!checkOutInput?.value) {
        isValid = false;
        errorMessage = 'Please select a check-out date';
      } else if (checkOutDate <= checkInDate) {
        isValid = false;
        errorMessage = 'Check-out date must be after check-in date';
      } else if (!guests) {
        isValid = false;
        errorMessage = 'Please select number of guests';
      } else if (checkInDate < new Date()) {
        isValid = false;
        errorMessage = 'Check-in date cannot be in the past';
      }

      if (!isValid) {
        e.preventDefault();
        alert(`❌ ${errorMessage}`);
        return;
      }

      // Show loading state
      if (bookingBtn) {
        bookingBtn.disabled = true;
        bookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      }

      // For demo purposes, show confirmation
      setTimeout(() => {
        if (bookingBtn) {
          bookingBtn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed!';
          bookingBtn.classList.remove('btn-danger');
          bookingBtn.classList.add('btn-success');
        }
      }, 1000);
    });
  }

  // Cancel booking confirmation
  const cancelButtons = document.querySelectorAll('button[type="submit"]');
  cancelButtons.forEach(button => {
    if (button.textContent.includes('Cancel')) {
      button.addEventListener('click', function(e) {
        const confirmed = confirm('Are you sure you want to cancel this booking?\n\nThis action cannot be undone.');
        if (!confirmed) {
          e.preventDefault();
        }
      });
    }
  });

  // Smooth scroll to booking section
  const bookNowButtons = document.querySelectorAll('.book-now-btn, [onclick*="handleBookNow"]');
  bookNowButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // If it's a real booking form, let it handle normally
      if (document.getElementById('bookingForm')) {
        return; // Let the booking form handle it
      }
      
      // For demo/placeholder buttons
      e.preventDefault();
      const bookingSection = document.querySelector('.booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Highlight the booking section
        bookingSection.style.background = 'rgba(102, 126, 234, 0.1)';
        setTimeout(() => {
          bookingSection.style.background = '';
        }, 2000);
      } else {
        // Show alert for demo functionality
        alert('🎉 Booking functionality is coming soon!\n\nYou will be able to:\n• Select dates\n• Choose guests\n• Make payments\n• Receive confirmations\n\nStay tuned for this feature!');
      }
    });
  });
});

// HandleBookNow function for backward compatibility
function handleBookNow(listingId) {
  const bookingSection = document.querySelector('.booking-section');
  if (bookingSection) {
    bookingSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Highlight the booking section
    bookingSection.style.background = 'rgba(102, 126, 234, 0.1)';
    setTimeout(() => {
      bookingSection.style.background = '';
    }, 2000);
  } else {
    alert('🎉 Booking functionality is coming soon!\n\nYou will be able to:\n• Select dates\n• Choose guests\n• Make payments\n• Receive confirmations\n\nStay tuned for this feature!');
  }
}
