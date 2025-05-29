// About section animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate about items when they come into view
    const aboutSection = document.getElementById('about');
    const summaryElement = document.querySelector('.summary');
    const personalInfoElement = document.querySelector('.personal-info');
    const infoItems = document.querySelectorAll('.info-item');
    
    // Check if elements exist before adding animations
    if (aboutSection) {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Function to add animation classes when elements are in viewport
        function handleScroll() {
            if (isInViewport(aboutSection) && summaryElement && personalInfoElement) {
                summaryElement.style.animationPlayState = 'running';
                personalInfoElement.style.animationPlayState = 'running';
                
                // Add staggered animation to info items
                if (infoItems.length > 0) {
                    infoItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(20px)';
                            
                            setTimeout(() => {
                                item.style.transition = 'all 0.4s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, 50);
                        }, 300 + (index * 150));
                    });
                }
            }
        }
        
        // Add typing animation to summary
        if (summaryElement) {
            const summaryParagraph = summaryElement.querySelector('p');
            if (summaryParagraph) {
                const addTypewriterEffect = () => {
                    if (isInViewport(summaryElement)) {
                        summaryElement.classList.add('visible');
                    }
                };
                
                window.addEventListener('scroll', addTypewriterEffect);
                // Initial check
                addTypewriterEffect();
            }
        }
        
        // Initial check
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
});
