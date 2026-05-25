// Remove no-js class immediately (before DOM load for faster visual feedback)
document.documentElement.classList.remove('no-js');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        // Toggle function
        const toggleMenu = () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            const isOpen = mobileMenu.classList.contains('flex');
            if (typeof lucide !== 'undefined') {
                menuBtn.innerHTML = isOpen ? '<i data-lucide="x" class="w-7 h-7"></i>' : '<i data-lucide="menu" class="w-7 h-7"></i>';
                lucide.createIcons();
            }
        };

        // Click on button
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Click on links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) toggleMenu();
            });
        });

        // UX Fix: Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isMenuOpen = !mobileMenu.classList.contains('hidden');
            const clickedInsideMenu = mobileMenu.contains(e.target);
            const clickedOnBtn = menuBtn.contains(e.target);

            if (isMenuOpen && !clickedInsideMenu && !clickedOnBtn) {
                toggleMenu();
            }
        });
    }

    // Navbar Scroll Effect + Active Section Indicator
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('nav .hidden.md\\:flex a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('text-brand-terra');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-brand-terra');
            }
        });
    };

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-3');
                navbar.classList.add('py-6');
            }
            updateActiveNav();
        });
    }

    // Pricing — 3D tilt on hover
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
            const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
            card.style.transition = 'transform 0.08s ease-out, box-shadow 0.2s';
            card.style.transform  = `perspective(900px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) scale3d(1.02,1.02,1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.45s ease-out, box-shadow 0.3s';
            card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        });
    });

    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else if (revealElements.length > 0) {
        // Fallback: show all elements if IntersectionObserver is not supported
        revealElements.forEach(el => el.classList.add('active'));
    }
});
