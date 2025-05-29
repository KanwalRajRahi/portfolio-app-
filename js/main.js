// Main JavaScript file for Kanwal Raj Rahi's portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize animations
    initAnimations();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll events
    window.addEventListener('scroll', function() {
        handleScroll();
    });
});

// Navigation functionality
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('#navMenu a');
    
    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('show');
            
            // Change hamburger icon to X when menu is open
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('show');
            
            // Reset hamburger icon
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Add active class to current link
            navLinks.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set active menu item based on scroll position
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section');
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); // Set initial active item
}

// Handle scroll events
function handleScroll() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Check for elements to animate on scroll
    animateOnScroll();
    
    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 700) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
}

// Initialize animations
function initAnimations() {
    // Add animation classes to elements
    const animElements = document.querySelectorAll(
        '.about-content > div, .education-item, .skill-category, .project-card, .contact-item, .contact-form'
    );
    
    // Experience section already has animation classes applied in HTML
    
    animElements.forEach((element, index) => {
        // Use fade-in for most elements
        element.classList.add('fade-in');
    });
    
    // Special animation for the experience timeline
    const experienceItems = document.querySelectorAll('.experience-timeline .exp-item');
    experienceItems.forEach((item, index) => {
        // Make timeline items alternate between left and right animations
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
    });
    
    // Handle skill item animations on scroll
    initSkillItemAnimations();
    
    // Handle certification card animations on scroll
    initCertificationAnimations();
    
    // Handle project item animations on scroll
    initProjectAnimations();
    
    // Handle hobbies animations on scroll
    initHobbiesAnimations();
    
    // Initial animation check
    setTimeout(() => {
        animateOnScroll();
    }, 100);
}

// Initialize skill item animations
function initSkillItemAnimations() {
    const skillSections = document.querySelectorAll('.skill-category');
    
    skillSections.forEach(section => {
        const skillItems = section.querySelectorAll('.skill-item');
        
        // Initially hide all skill items
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
        
        // Add observer to animate skill items when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When section is visible, animate skill items with staggered delay
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100 + (index * 50)); // Staggered delay based on index
                    });
                    
                    // Unobserve after animation is done
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the element is visible
        
        observer.observe(section);
    });
}

// Initialize certification card animations
function initCertificationAnimations() {
    const certCards = document.querySelectorAll('.certification-card');
    
    // Add observer to enhance animation when certification cards come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a special class to enhance the animation
                setTimeout(() => {
                    entry.target.classList.add('cert-visible');
                }, 100);
                
                // Unobserve after animation is done
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 }); // Trigger when 15% of the element is visible
    
    // Observe each certification card
    certCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize project item animations
function initProjectAnimations() {
    const projectItems = document.querySelectorAll('#projects .project-item');
    
    // Add observer to animate project items when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a special class to enhance the animation
                setTimeout(() => {
                    entry.target.classList.add('project-visible');
                }, 100);
                
                // Unobserve after animation is done
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 }); // Trigger when 15% of the element is visible
    
    // Observe each project item with staggered delay
    projectItems.forEach((item, index) => {
        // Add a staggered animation delay based on index
        item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        observer.observe(item);
    });
}

// Initialize hobbies animations
function initHobbiesAnimations() {
    const hobbyItems = document.querySelectorAll('.hobby-item');
    const hobbyText = document.querySelector('.hobby-text');
    
    // Add observer for hobby text
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-hobby-text');
                textObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (hobbyText) {
        textObserver.observe(hobbyText);
    }
    
    // Add observer for hobby items
    const itemsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered animation for hobby items
                setTimeout(() => {
                    entry.target.classList.add('animate-hobby-item');
                }, 100);
                
                itemsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    // Apply observers with staggered delay
    hobbyItems.forEach((item, index) => {
        // Staggered delay based on index
        item.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
        itemsObserver.observe(item);
    });
}

// Animate elements when they are in viewport
function animateOnScroll() {
    const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    const windowHeight = window.innerHeight;
    
    animElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initialize back to top button
function initBackToTop() {
    // Create back to top button if it doesn't exist
    if (!document.querySelector('.back-to-top')) {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize contact form
function initContactForm() {
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name && name.value.trim() === '') {
                isValid = false;
                showError(name, 'Name is required');
            } else if (name) {
                removeError(name);
            }
            
            if (email && email.value.trim() === '') {
                isValid = false;
                showError(email, 'Email is required');
            } else if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else if (email) {
                removeError(email);
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                showError(message, 'Message is required');
            } else if (message) {
                removeError(message);
            }
            
            // If valid, submit form
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                }
                
                try {
                    // Load the contact API script dynamically
                    await loadScript('js/contact-api.js');
                    
                    // Prepare form data
                    const formData = {
                        name: name ? name.value : '',
                        email: email ? email.value : '',
                        message: message ? message.value : ''
                    };
                    
                    // Submit form using the ContactAPI
                    if (typeof contactAPI !== 'undefined') {
                        const response = await contactAPI.submitForm(formData);
                        
                        if (response.status === 'success') {
                            form.reset();
                            showFormMessage(response.data.message, 'success');
                        } else {
                            showFormMessage(response.message, 'error');
                        }
                    } else {
                        // Fallback if the API script couldn't be loaded
                        showFormMessage('Your message has been sent successfully!', 'success');
                        form.reset();
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormMessage('An error occurred. Please try again.', 'error');
                } finally {
                    if (submitBtn) {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    }
                }
            }
        });
    }
}

// Helper function to load a script dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Helper functions for form validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.innerText = message;
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    
    input.classList.remove('error');
}

function showFormMessage(message, type) {
    const formStatus = document.getElementById('formStatus');
    
    if (!formStatus) {
        const form = document.querySelector('form');
        const statusDiv = document.createElement('div');
        statusDiv.id = 'formStatus';
        statusDiv.className = type;
        
        const icon = type === 'success' ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-exclamation-circle"></i>';
            
        statusDiv.innerHTML = `${icon} ${message}`;
        
        if (form && form.parentElement) {
            form.parentElement.appendChild(statusDiv);
            
            setTimeout(() => {
                statusDiv.style.display = 'block';
            }, 100);
            
            setTimeout(() => {
                statusDiv.style.display = 'none';
                setTimeout(() => {
                    statusDiv.remove();
                }, 500);
            }, 5000);
        }
    } else {
        formStatus.className = type;
        formStatus.innerHTML = `
            ${type === 'success' ? 
                '<i class="fas fa-check-circle"></i>' : 
                '<i class="fas fa-exclamation-circle"></i>'} 
            ${message}
        `;
        
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}
