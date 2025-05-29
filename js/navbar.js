document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar a');
    const body = document.body;

    // Prevent default touch behavior on the toggle button
    mobileToggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    function toggleMenu() {
        navbar.classList.toggle('show');
        body.classList.toggle('menu-open');
        body.style.overflow = body.classList.contains('menu-open') ? 'hidden' : '';
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !mobileToggle.contains(event.target) && navbar.classList.contains('show')) {
            closeMenu();
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    function closeMenu() {
        navbar.classList.remove('show');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    // Handle scroll events
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class to header
        if (currentScroll > 50) {
            document.getElementById('header').classList.add('scrolled');
        } else {
            document.getElementById('header').classList.remove('scrolled');
        }

        // Hide mobile menu on scroll down
        if (currentScroll > lastScroll && navbar.classList.contains('show')) {
            closeMenu();
        }
        
        lastScroll = currentScroll;
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navbar.classList.contains('show')) {
            closeMenu();
        }
    });

    // Add active class to current section in navigation
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Adjust offset as needed
            const sectionId = section.getAttribute('id');
            
            const navLink = document.querySelector('#navbar a[href*=' + sectionId + ']');
            if (navLink) {
                 if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('load', setActiveNavLink);
}); 