// Education section animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate education items when they come into view
    const educationSection = document.getElementById('education');
    const educationItems = document.querySelectorAll('.education-item');
    
    // Check if elements exist before adding animations
    if (educationSection && educationItems.length > 0) {
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
            if (isInViewport(educationSection)) {
                educationItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-education');
                    }, 200 * index);
                });
            }
        }
        
        // Add interactive hover effects to education items
        educationItems.forEach(item => {
            const title = item.querySelector('h3');
            const date = item.querySelector('.ed-date');
            
            // Enhance hover effects
            item.addEventListener('mouseenter', function() {
                if (title) title.style.transform = 'translateX(5px)';
                if (date) date.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (title) title.style.transform = 'translateX(0)';
                if (date) date.style.transform = 'scale(1)';
            });
        });
        
        // Initial check
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
});
