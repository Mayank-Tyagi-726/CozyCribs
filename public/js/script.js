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

// Enhanced Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter elements
    const filters = {
        desktopSearch: document.getElementById('desktopSearch'),
        mobileSearch: document.getElementById('mobileSearch'),
        locationFilter: document.getElementById('locationFilter'),
        countryFilter: document.getElementById('countryFilter'),
        priceRange: document.getElementById('priceRange'),
        priceValue: document.getElementById('priceValue'),
        mobileLocation: document.getElementById('mobileLocation'),
        mobileCountry: document.getElementById('mobileCountry'),
        mobilePrice: document.getElementById('mobilePrice'),
        mobilePriceValue: document.getElementById('mobilePriceValue'),
        mobileBedrooms: document.getElementById('mobileBedrooms'),
        mobileGuests: document.getElementById('mobileGuests'),
        resetFilters: document.getElementById('resetFilters'),
        mobileResetFilters: document.getElementById('mobileResetFilters'),
        filterToggle: document.getElementById('filterToggle'),
        mobileFilters: document.getElementById('mobileFilters')
    };

    // Sync desktop and mobile filters
    function syncFilters(source, target) {
        if (source && target) {
            target.value = source.value;
        }
    }

    // Update price displays
    function updatePriceDisplay(range, display, suffix = '+') {
        const value = parseInt(range.value);
        display.textContent = value >= 10000 ? `₹10,000${suffix}` : `₹${value.toLocaleString()}${suffix}`;
    }

    // Apply filters function
    function applyFilters() {
        const searchTerm = (filters.desktopSearch?.value || '').toLowerCase();
        const selectedLocation = filters.locationFilter?.value || '';
        const selectedCountry = filters.countryFilter?.value || '';
        const maxPrice = parseInt(filters.priceRange?.value || 10000);
        const minBedrooms = parseInt(filters.mobileBedrooms?.value || 0);
        const minGuests = parseInt(filters.mobileGuests?.value || 0);

        const listingItems = document.querySelectorAll('.listing-item');
        let visibleCount = 0;

        listingItems.forEach(item => {
            const title = item.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const locationElement = item.querySelector('.card-text');
            const location = locationElement?.textContent.toLowerCase() || '';
            const priceText = item.querySelector('.price')?.textContent || '0';
            const price = parseInt(priceText.replace(/,/g, '')) || 0;

            // Extract bedroom and guest info from listing data attributes if available
            const bedrooms = parseInt(item.dataset.bedrooms || '0');
            const maxGuests = parseInt(item.dataset.maxGuests || '10');

            // Check all filters
            const matchesSearch = !searchTerm || title.includes(searchTerm);
            const matchesLocation = !selectedLocation || location.includes(selectedLocation.toLowerCase());
            const matchesCountry = !selectedCountry || location.includes(selectedCountry.toLowerCase());
            const matchesPrice = price <= maxPrice;
            const matchesBedrooms = !minBedrooms || bedrooms >= minBedrooms;
            const matchesGuests = !minGuests || maxGuests >= minGuests;

            if (matchesSearch && matchesLocation && matchesCountry && matchesPrice && matchesBedrooms && matchesGuests) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update count
        const countElement = document.getElementById('current-count');
        if (countElement) {
            countElement.textContent = visibleCount;
        }

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        const listingsGrid = document.getElementById('listingsGrid');
        
        if (noResults && listingsGrid) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                listingsGrid.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                listingsGrid.style.display = 'flex';
            }
        }
    }

    // Reset all filters
    function resetAllFilters() {
        if (filters.desktopSearch) filters.desktopSearch.value = '';
        if (filters.mobileSearch) filters.mobileSearch.value = '';
        if (filters.locationFilter) filters.locationFilter.value = '';
        if (filters.countryFilter) filters.countryFilter.value = '';
        if (filters.priceRange) filters.priceRange.value = '10000';
        if (filters.mobileLocation) filters.mobileLocation.value = '';
        if (filters.mobileCountry) filters.mobileCountry.value = '';
        if (filters.mobilePrice) filters.mobilePrice.value = '10000';
        if (filters.mobileBedrooms) filters.mobileBedrooms.value = '';
        if (filters.mobileGuests) filters.mobileGuests.value = '';

        // Update displays
        if (filters.priceRange && filters.priceValue) {
            updatePriceDisplay(filters.priceRange, filters.priceValue);
        }
        if (filters.mobilePrice && filters.mobilePriceValue) {
            updatePriceDisplay(filters.mobilePrice, filters.mobilePriceValue);
        }

        applyFilters();
    }

    // Toggle mobile filters
    function toggleMobileFilters() {
        if (filters.mobileFilters && filters.filterToggle) {
            const isVisible = filters.mobileFilters.style.display !== 'none';
            if (isVisible) {
                filters.mobileFilters.style.display = 'none';
                filters.filterToggle.innerHTML = '<i class="fas fa-filter"></i> More Filters <i class="fas fa-chevron-down"></i>';
            } else {
                filters.mobileFilters.style.display = 'block';
                filters.filterToggle.innerHTML = '<i class="fas fa-filter"></i> Less Filters <i class="fas fa-chevron-up"></i>';
            }
        }
    }

    // Event Listeners
    if (filters.desktopSearch) {
        filters.desktopSearch.addEventListener('input', applyFilters);
    }
    
    if (filters.mobileSearch) {
        filters.mobileSearch.addEventListener('input', function() {
            if (filters.desktopSearch) {
                filters.desktopSearch.value = this.value;
            }
            applyFilters();
        });
    }

    // Location filters
    if (filters.locationFilter) {
        filters.locationFilter.addEventListener('change', function() {
            if (filters.mobileLocation) {
                filters.mobileLocation.value = this.value;
            }
            applyFilters();
        });
    }

    if (filters.mobileLocation) {
        filters.mobileLocation.addEventListener('change', function() {
            if (filters.locationFilter) {
                filters.locationFilter.value = this.value;
            }
            applyFilters();
        });
    }

    // Country filters
    if (filters.countryFilter) {
        filters.countryFilter.addEventListener('change', function() {
            if (filters.mobileCountry) {
                filters.mobileCountry.value = this.value;
            }
            applyFilters();
        });
    }

    if (filters.mobileCountry) {
        filters.mobileCountry.addEventListener('change', function() {
            if (filters.countryFilter) {
                filters.countryFilter.value = this.value;
            }
            applyFilters();
        });
    }

    // Price range filters
    if (filters.priceRange) {
        filters.priceRange.addEventListener('input', function() {
            if (filters.priceValue) {
                updatePriceDisplay(this, filters.priceValue);
            }
            if (filters.mobilePrice) {
                filters.mobilePrice.value = this.value;
                if (filters.mobilePriceValue) {
                    updatePriceDisplay(filters.mobilePrice, filters.mobilePriceValue);
                }
            }
            applyFilters();
        });
    }

    if (filters.mobilePrice) {
        filters.mobilePrice.addEventListener('input', function() {
            if (filters.mobilePriceValue) {
                updatePriceDisplay(this, filters.mobilePriceValue);
            }
            if (filters.priceRange) {
                filters.priceRange.value = this.value;
                if (filters.priceValue) {
                    updatePriceDisplay(filters.priceRange, filters.priceValue);
                }
            }
            applyFilters();
        });
    }

    // Bedroom and guest filters
    if (filters.mobileBedrooms) {
        filters.mobileBedrooms.addEventListener('change', applyFilters);
    }

    if (filters.mobileGuests) {
        filters.mobileGuests.addEventListener('change', applyFilters);
    }

    // Reset buttons
    if (filters.resetFilters) {
        filters.resetFilters.addEventListener('click', resetAllFilters);
    }

    if (filters.mobileResetFilters) {
        filters.mobileResetFilters.addEventListener('click', resetAllFilters);
    }

    // Mobile filter toggle
    if (filters.filterToggle) {
        filters.filterToggle.addEventListener('click', toggleMobileFilters);
    }

    // Initialize displays
    if (filters.priceRange && filters.priceValue) {
        updatePriceDisplay(filters.priceRange, filters.priceValue);
    }
    if (filters.mobilePrice && filters.mobilePriceValue) {
        updatePriceDisplay(filters.mobilePrice, filters.mobilePriceValue);
    }

    // Initial filter application
    applyFilters();
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
        const totalPrice =  (listing.price /30 )* nights;

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
