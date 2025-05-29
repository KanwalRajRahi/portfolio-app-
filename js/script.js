document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            // Toggle between bars and times icons
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Contact Form Handling with improved validation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Create a styled form status element if it doesn't exist
    if (!formStatus && contactForm) {
        const newFormStatus = document.createElement('div');
        newFormStatus.id = 'formStatus';
        newFormStatus.style.display = 'none';
        newFormStatus.style.padding = '10px 15px';
        newFormStatus.style.marginTop = '15px';
        newFormStatus.style.borderRadius = '5px';
        newFormStatus.style.fontWeight = '500';
        contactForm.parentNode.appendChild(newFormStatus);
    }

    // Form validation helper functions
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateName(name) {
        // Allow letters, spaces, dots, apostrophes, and hyphens
        const regex = /^[a-zA-Z\s.\'-]+$/;
        return regex.test(name);
    }

    function validateRequired(value) {
        return value.trim().length > 0;
    }

    function showFieldError(field, message) {
        // Remove any existing error
        removeFieldError(field);
        
        // Create error message element
        const errorMsg = document.createElement('div');
        errorMsg.className = 'field-error';
        errorMsg.textContent = message;
        errorMsg.style.color = '#e74c3c';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '5px';
        
        // Insert after the field
        field.parentNode.appendChild(errorMsg);
        
        // Highlight the field
        field.style.borderColor = '#e74c3c';
    }

    function removeFieldError(field) {
        // Remove error styling
        field.style.borderColor = '';
        
        // Remove error message if it exists
        const errorMsg = field.parentNode.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function validateField(field) {
        const value = field.value;
        const fieldName = field.id;
        
        // Remove any existing error first
        removeFieldError(field);
        
        // Check if field is required
        if (!validateRequired(value)) {
            showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            return false;
        }
        
        // Specific validation based on field type
        switch (fieldName) {
            case 'email':
                if (!validateEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'name':
                if (!validateName(value)) {
                    showFieldError(field, 'Name can only contain letters, spaces, and characters like . \' -');
                    return false;
                }
                break;
            case 'message':
                if (value.trim().length < 10) {
                    showFieldError(field, 'Message must be at least 10 characters long');
                    return false;
                }
                break;
        }
        
        return true;
    }

    if (contactForm) {
        // Add blur event listeners for inline validation
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            field.addEventListener('focus', function() {
                removeFieldError(this);
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Validate all fields
            const nameValid = validateField(nameField);
            const emailValid = validateField(emailField);
            const subjectValid = validateField(subjectField);
            const messageValid = validateField(messageField);
            
            // If any validation fails, stop form submission
            if (!nameValid || !emailValid || !subjectValid || !messageValid) {
                return;
            }
            
            // Create data object for API
            const formData = {
                name: nameField.value,
                email: emailField.value,
                subject: subjectField.value,
                message: messageField.value
            };
            
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Reset form status
            formStatus.style.display = 'none';
            
            // Send to API
            fetch('/api/v1/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                // First check if the response is ok
                if (!response.ok) {
                    // If we got an error response, display the HTTP status
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle response based on our standard API format
                if (data.status === 'success') {
                    // Success message
                    formStatus.innerHTML = `<i class="fas fa-check-circle"></i> ${data.data.message || 'Thank you! Your message has been received.'}`;
                    formStatus.className = 'success';
                    formStatus.style.backgroundColor = '#d4edda';
                    formStatus.style.color = '#155724';
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Scroll to the response
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    // Error message
                    formStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${data.message || 'Something went wrong. Please try again.'}`;
                    formStatus.className = 'error';
                    formStatus.style.backgroundColor = '#f8d7da';
                    formStatus.style.color = '#721c24';
                }
                
                // Show status message
                formStatus.style.display = 'block';
                
                // Hide the message after 5 seconds on success only
                if (data.status === 'success') {
                    setTimeout(function() {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                // Handle network errors
                formStatus.innerHTML = `<i class="fas fa-exclamation-circle"></i> Network error: ${error.message}. Please try again later.`;
                formStatus.className = 'error';
                formStatus.style.backgroundColor = '#f8d7da';
                formStatus.style.color = '#721c24';
                formStatus.style.display = 'block';
                console.error('Error:', error);
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking a link (on mobile)
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Handle sticky header
    const header = document.getElementById('header');
    const headerHeight = header.offsetHeight;
    
    // Apply padding to the body to prevent content from being hidden behind fixed header
    document.body.style.paddingTop = headerHeight + 'px';
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button functionality
    const createBackToTopButton = () => {
        const body = document.body;
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
    };
    
    createBackToTopButton();
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + header.offsetHeight + 10; // Adding offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
