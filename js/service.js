// Service Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');
    const menuClose = document.querySelector('.menu-close');
    const menuDialog = document.querySelector('.menu-dialog');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function() {
            menuContainer.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Focus trap
            setTimeout(() => {
                menuClose.focus();
            }, 100);
        });
    }

    if (menuClose && menuContainer) {
        menuClose.addEventListener('click', function() {
            menuContainer.style.display = 'none';
            document.body.style.overflow = '';
            menuToggle.focus();
        });
    }

    // Close menu when clicking outside
    if (menuContainer) {
        menuContainer.addEventListener('click', function(e) {
            if (e.target === menuContainer) {
                menuContainer.style.display = 'none';
                document.body.style.overflow = '';
                menuToggle.focus();
            }
        });
    }

    // Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuContainer && menuContainer.style.display === 'block') {
            menuContainer.style.display = 'none';
            document.body.style.overflow = '';
            menuToggle.focus();
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopButton = document.querySelector('.scroll-to-top a');
    
    if (scrollToTopButton) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
            }
        });

        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Gallery image hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('figcaption');
        
        if (img && caption) {
            item.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.05)';
                caption.style.opacity = '0.9';
            });
            
            item.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
                caption.style.opacity = '1';
            });
        }
    });

    // Form validation (if any forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('请填写所有必填字段');
            }
        });
    });

    // Accessibility improvements
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main id to main content if it doesn't exist
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main';
    }

    // Performance optimization: Debounced scroll handler
    let scrollTimeout;
    function debounceScroll(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }

    // Optimized scroll handler for animations
    const handleScroll = debounceScroll(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Print styles handler
    window.addEventListener('beforeprint', function() {
        // Hide navigation and other non-essential elements when printing
        const elementsToHide = document.querySelectorAll('.site-header, .scroll-to-top, .menu-toggle');
        elementsToHide.forEach(el => {
            el.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        // Restore hidden elements after printing
        const elementsToShow = document.querySelectorAll('.site-header, .scroll-to-top, .menu-toggle');
        elementsToShow.forEach(el => {
            el.style.display = '';
        });
    });

    // Hash change handler for single page navigation
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Initial hash scroll on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
});

// CSS animations for fade-in effect
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .gallery-item img {
        transition: transform 0.3s ease;
    }
    
    .gallery-item figcaption {
        transition: opacity 0.3s ease;
    }
    
    .error {
        border-color: #ff0000 !important;
        box-shadow: 0 0 5px rgba(255, 0, 0, 0.3) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);
