// Skills section animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Add hover effects for skill items
    if (skillItems.length > 0) {
        skillItems.forEach(item => {
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 10px 20px rgba(10, 38, 71, 0.15)';
                this.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
                this.style.color = 'var(--secondary-color)';
                this.style.fontWeight = '600';
            });
            
            // Reset on mouse leave
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
                this.style.color = 'var(--primary-color)';
                this.style.fontWeight = '400';
            });
            
            // Add click effect for skill level visualization
            item.addEventListener('click', function() {
                // Create and show skill level popup
                showSkillLevelPopup(this);
            });
        });
    }
    
    // Function to show skill level popup
    function showSkillLevelPopup(skillItem) {
        // Remove any existing popups
        const existingPopups = document.querySelectorAll('.skill-level-popup');
        existingPopups.forEach(popup => popup.remove());
        
        // Create new popup
        const popup = document.createElement('div');
        popup.className = 'skill-level-popup';
        
        // Generate a random skill level between 70-95% for demonstration
        const skillLevel = Math.floor(Math.random() * 26) + 70;
        
        // Create skill level visualization
        popup.innerHTML = `
            <div class="skill-name">${skillItem.textContent}</div>
            <div class="skill-bar-container">
                <div class="skill-bar" style="width: ${skillLevel}%"></div>
            </div>
            <div class="skill-percentage">${skillLevel}%</div>
        `;
        
        // Position popup
        const rect = skillItem.getBoundingClientRect();
        popup.style.position = 'absolute';
        popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.zIndex = '1000';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '15px';
        popup.style.borderRadius = '10px';
        popup.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        popup.style.width = '250px';
        popup.style.animation = 'fadeIn 0.3s ease-out forwards';
        
        // Style inner elements
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .skill-level-popup {
                font-family: var(--font-family);
            }
            .skill-name {
                font-weight: 600;
                margin-bottom: 10px;
                color: var(--primary-color);
            }
            .skill-bar-container {
                height: 10px;
                background-color: #f0f0f0;
                border-radius: 5px;
                margin-bottom: 5px;
                overflow: hidden;
            }
            .skill-bar {
                height: 100%;
                background: var(--gradient-bg);
                border-radius: 5px;
                transition: width 1s ease-out;
            }
            .skill-percentage {
                text-align: right;
                font-size: 0.8rem;
                color: var(--secondary-color);
                font-weight: 600;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        
        // Add popup and style to document
        document.body.appendChild(popup);
        document.head.appendChild(styleElement);
        
        // Close popup when clicking outside
        document.addEventListener('click', function closePopup(e) {
            if (e.target !== skillItem && !popup.contains(e.target)) {
                popup.remove();
                document.removeEventListener('click', closePopup);
            }
        });
    }
    
    // Create floating decoration elements for the skills section
    if (skillsSection) {
        const container = skillsSection.querySelector('.container');
        
        // Create floating decorative elements
        for (let i = 0; i < 8; i++) {
            const floatingEl = document.createElement('div');
            floatingEl.className = 'skills-floating-element';
            
            // Randomly choose a shape: circle, square, or triangle
            const shapeType = Math.floor(Math.random() * 3);
            
            switch(shapeType) {
                case 0: // Circle
                    floatingEl.style.borderRadius = '50%';
                    break;
                case 1: // Square
                    floatingEl.style.borderRadius = '5px';
                    break;
                case 2: // Triangle (using clip-path)
                    floatingEl.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                    break;
            }
            
            // Set properties
            floatingEl.style.position = 'absolute';
            floatingEl.style.width = `${Math.random() * 15 + 10}px`;
            floatingEl.style.height = floatingEl.style.width;
            floatingEl.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(10, 38, 71, 0.1))';
            floatingEl.style.opacity = '0.6';
            floatingEl.style.left = `${Math.random() * 90 + 5}%`;
            floatingEl.style.top = `${Math.random() * 90 + 5}%`;
            floatingEl.style.zIndex = '0';
            floatingEl.style.animation = `float ${Math.random() * 15 + 10}s ease-in-out infinite`;
            floatingEl.style.animationDelay = `${Math.random() * 5}s`;
            
            container.appendChild(floatingEl);
        }
    }
    
    // Add interactive category highlighting
    if (skillCategories.length > 0) {
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', function() {
                // Highlight current category
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 30px rgba(10, 38, 71, 0.15)';
                this.style.borderColor = 'rgba(33, 150, 243, 0.3)';
                
                // Add pulsing effect to category header
                const header = this.querySelector('h3');
                if (header) {
                    header.style.color = 'var(--secondary-color)';
                    header.style.transform = 'scale(1.03)';
                    header.style.transition = 'all 0.3s ease';
                }
                
                // Add shine effect to skill items within this category
                const skillItemsInCategory = this.querySelectorAll('.skill-item');
                if (skillItemsInCategory.length > 0) {
                    skillItemsInCategory.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
                            item.style.transform = 'scale(1.05)';
                            item.style.transition = 'all 0.3s ease';
                        }, index * 30);
                    });
                }
            });
            
            category.addEventListener('mouseleave', function() {
                // Reset category
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.borderColor = '';
                
                // Reset header
                const header = this.querySelector('h3');
                if (header) {
                    header.style.color = '';
                    header.style.transform = '';
                }
                
                // Reset skill items
                const skillItemsInCategory = this.querySelectorAll('.skill-item');
                if (skillItemsInCategory.length > 0) {
                    skillItemsInCategory.forEach(item => {
                        item.style.backgroundColor = '';
                        item.style.transform = '';
                    });
                }
            });
        });
    }
});
