// Contact section animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate contact items when they come into view
    const contactSection = document.getElementById('contact');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form');
    
    // Check if elements exist before adding animations
    if (contactSection && contactItems.length > 0) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Function to add animation classes when elements are in viewport
        function handleScroll() {
            if (isInViewport(contactSection)) {
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-item');
                    }, 200 * index);
                });
                
                if (contactForm) {
                    contactForm.classList.add('animate-form');
                }
            }
        }
        
        // Initial check
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
});
