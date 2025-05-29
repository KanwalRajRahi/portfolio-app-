// Experience section animations with enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    // Get all experience items
    const experienceSection = document.getElementById('experience');
    const experienceItems = document.querySelectorAll('.exp-item');
    const timelineBefore = document.querySelector('.experience-timeline::before');
    
    // Add hover effects for experience items
    if (experienceItems.length > 0) {
        experienceItems.forEach(item => {
            // Add hover effects for list items
            item.addEventListener('mouseenter', function() {
                // Enhance list items on hover
                const listItems = this.querySelectorAll('ul li');
                if (listItems.length > 0) {
                    listItems.forEach((li, index) => {
                        setTimeout(() => {
                            li.style.transform = 'translateX(8px)';
                            li.style.transition = 'all 0.3s ease';
                            li.style.color = 'var(--secondary-color)';
                        }, index * 50);
                    });
                }
                
                // Enhance title on hover
                const title = this.querySelector('h3');
                if (title) {
                    title.style.color = 'var(--secondary-color)';
                }
                
                // Add pulsing effect to date
                const date = this.querySelector('.exp-date');
                if (date) {
                    date.style.transform = 'scale(1.05)';
                    date.style.boxShadow = '0 8px 25px rgba(10, 38, 71, 0.3)';
                    date.style.transition = 'all 0.3s ease';
                }
            });
            
            // Reset effects on mouse leave
            item.addEventListener('mouseleave', function() {
                // Reset list items
                const listItems = this.querySelectorAll('ul li');
                if (listItems.length > 0) {
                    listItems.forEach(li => {
                        li.style.transform = 'translateX(0)';
                        li.style.color = 'var(--text-color)';
                    });
                }
                
                // Reset title
                const title = this.querySelector('h3');
                if (title) {
                    title.style.color = 'var(--primary-color)';
                }
                
                // Reset date
                const date = this.querySelector('.exp-date');
                if (date) {
                    date.style.transform = 'scale(1)';
                    date.style.boxShadow = '0 5px 20px rgba(10, 38, 71, 0.25)';
                }
            });
        });
    }
    
    // Add interactive timeline highlight
    if (experienceSection) {
        // Create floating decorative elements
        const createFloatingElements = () => {
            const container = experienceSection.querySelector('.container');
            
            // Create and append 5 floating elements
            for (let i = 0; i < 5; i++) {
                const floatingEl = document.createElement('div');
                floatingEl.className = 'floating-element';
                floatingEl.style.position = 'absolute';
                floatingEl.style.width = `${Math.random() * 20 + 10}px`;
                floatingEl.style.height = floatingEl.style.width;
                floatingEl.style.borderRadius = '50%';
                floatingEl.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(10, 38, 71, 0.1))';
                floatingEl.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.1)';
                floatingEl.style.left = `${Math.random() * 80 + 10}%`;
                floatingEl.style.top = `${Math.random() * 80 + 10}%`;
                floatingEl.style.zIndex = '0';
                floatingEl.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
                floatingEl.style.animationDelay = `${Math.random() * 5}s`;
                
                container.appendChild(floatingEl);
            }
            
            // Add keyframes for floating animation if not already added
            if (!document.getElementById('floating-keyframes')) {
                const style = document.createElement('style');
                style.id = 'floating-keyframes';
                style.textContent = `
                    @keyframes float {
                        0%, 100% {
                            transform: translate(0, 0) rotate(0deg);
                        }
                        25% {
                            transform: translate(15px, -15px) rotate(5deg);
                        }
                        50% {
                            transform: translate(0, 15px) rotate(10deg);
                        }
                        75% {
                            transform: translate(-15px, -5px) rotate(5deg);
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        };
        
        // Call once on page load
        createFloatingElements();
    }
});
