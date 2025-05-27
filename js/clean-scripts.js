// Clean JavaScript for Horsopia website
(function() {
    'use strict';

    // DOM elements
    let navToggle;
    let navMenu;
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const header = document.querySelector('.site-header');

    // Mobile navigation toggle
    function initMobileNavigation() {
        // 重新获取元素，确保它们已经加载到DOM中
        navToggle = document.querySelector('.nav-toggle');
        navMenu = document.querySelector('.nav-menu');
        const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Toggle hamburger animation
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.toggle('active');
                }
                
                // Update aria-expanded attribute
                const isExpanded = navMenu.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // 如果点击的是 dropdown toggle，就不要关闭整个菜单
    if (link.classList.contains('dropdown-toggle')) {
      e.preventDefault(); // 阻止 # 跳转
      return;
    }

    // 否则正常关闭菜单
    navMenu.classList.remove('active');
    const hamburger = navToggle.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    const hamburger = navToggle.querySelector('.hamburger');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        } else {
            console.warn('Navigation elements not found. Will retry after header loads.');
        }
        if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault(); // 阻止跳转 #
      dropdown.classList.toggle('active');
    });
  }
});
    }

    // Scroll to top functionality
    function initScrollToTop() {
        if (scrollToTopBtn) {
            // Show/hide scroll to top button
            function toggleScrollToTopButton() {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            }

            // Scroll to top when button is clicked
            scrollToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Listen for scroll events
            window.addEventListener('scroll', toggleScrollToTopButton);
            
            // Initial check
            toggleScrollToTopButton();
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active navigation highlighting
    function initActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .nav-menu a[href="/"]');
        const sections = document.querySelectorAll('section[id], main');
        
        function updateActiveNavigation() {
            const scrollPosition = window.pageYOffset + 150; // Offset for header
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to corresponding nav link
                    if (sectionId) {
                        const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavigation);
        updateActiveNavigation(); // Initial call
    }

    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Animation on scroll
    function initScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements that should animate
            const animateElements = document.querySelectorAll('.service-card, .event-card, .section-header');
            animateElements.forEach(el => {
                el.classList.add('animate-on-scroll');
                animationObserver.observe(el);
            });
        }
    }

    // Form handling (if forms are added later)
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    // Handle form submission here
                    console.log('Form is valid and ready to submit');
                    // You can add AJAX submission logic here
                }
            });
        });
    }

    // Accessibility improvements
    function initAccessibility() {
        // Add main content ID if it doesn't exist
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }

        // Keyboard navigation for mobile menu
        if (navToggle) {
            navToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }

        // Focus management for mobile menu
        const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];
        if (navLinks.length > 0) {
            navLinks[navLinks.length - 1].addEventListener('keydown', function(e) {
                if (e.key === 'Tab' && !e.shiftKey && navMenu.classList.contains('active')) {
                    e.preventDefault();
                    navToggle.focus();
                }
            });
        }
    }

    // Performance optimization
    function initPerformanceOptimizations() {
        // Throttle scroll events
        let scrollTimeout;
        
        function throttleScroll(callback, delay = 16) {
            return function() {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    callback.apply(this, arguments);
                    scrollTimeout = null;
                }, delay);
            };
        }

        // Preload critical images
        const criticalImages = [
            '/images/马图1.png',
            '/images/Horsopialogo无背景.PNG'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Error handling
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // You can add error reporting here
        });

        // Handle image loading errors
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
    }

document.addEventListener('click', function (e) {
  const toggle = e.target.closest('.dropdown-toggle');
  if (toggle) {
    e.preventDefault();
    const dropdown = toggle.parentElement.querySelector('.submenu');
    if (dropdown) {
      // 关闭所有其他打开的 submenu（可选）
      document.querySelectorAll('.submenu.active').forEach(menu => {
        if (menu !== dropdown) menu.classList.remove('active');
      });

      dropdown.classList.toggle('active');
    }
  } else {
    // 点击外部关闭所有 submenu
    document.querySelectorAll('.submenu.active').forEach(menu => {
      menu.classList.remove('active');
    });
  }
});


    function initLanguageSwitcher() {
  const languageLinks = document.querySelectorAll('.language-dropdown .submenu a');

  languageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetLang = link.getAttribute('data-lang'); // zh / en / fr
      const currentPath = window.location.pathname;

      // 提取当前页面文件名，例如 journey.html
      const parts = currentPath.split('/');
      const currentFile = parts[2] || 'index.html'; // zh/index.html → index.html

      // 构建目标路径
      const targetPath = `/${targetLang}/${currentFile}`;

      window.location.href = targetPath;
    });
  });
}

    // Initialize all functionality when DOM is ready
    function init() {
        initMobileNavigation();
        initScrollToTop();
        initSmoothScrolling();
        initActiveNavigation();
        initLazyLoading();
        initScrollAnimations();
        initFormHandling();
        initAccessibility();
        initPerformanceOptimizations();
        initErrorHandling();
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('js-loaded');
        
        console.log('Horsopia website initialized successfully');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 监听头部加载完成事件
    async function loadReusableParts() {
    
            const langFolder = window.location.pathname.split("/")[1]; // zh / en / fr

    // 加载 header
    fetch(`/${langFolder}/header.html`)
      .then(res => res.text())
      .then(data => {
        document.getElementById("include-header").innerHTML = data;
         initMobileNavigation();
         initLanguageSwitcher();
      });

    // 加载 footer
    fetch(`/${langFolder}/footer.html`)
      .then(res => res.text())
      .then(data => {
        document.getElementById("include-footer").innerHTML = data;
      });
        }

    // 执行加载可重用部分
    loadReusableParts();

    // Expose some functions globally for potential external use
    window.HorsopiaWebsite = {
        scrollToTop: function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        closeMenu: function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        },
        // 添加重新初始化导航的方法，以便在需要时手动调用
        reinitNavigation: function() {
            initMobileNavigation();
        }
    };

})();

// Additional CSS for animations (injected via JavaScript)
const animationStyles = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .js-loaded .service-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .js-loaded .event-card {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    .error {
        border-color: #cf2e2e !important;
        box-shadow: 0 0 0 2px rgba(207, 46, 46, 0.2) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

