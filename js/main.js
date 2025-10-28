// ======================
// MAIN.JS - Core Functionality
// ======================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.1, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 1, direction: "none", random: true }
        }
    });

    // ======================
    // OPTIMIZED MOBILE MENU - FIXED VERSION
    // ======================

    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    const body = document.body;

    // Create or get overlay element
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
    }

    // Open mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileMenu();
        });
    }

    // Close mobile menu
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileMenuFunction();
        });
    }

    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', closeMobileMenuFunction);

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenuFunction);
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenuFunction();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenuFunction();
        }
    });

    function openMobileMenu() {
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('menu-open');
        
        // Prevent body scroll
        document.documentElement.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
    }

    function closeMobileMenuFunction() {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Restore body scroll
        document.documentElement.style.overflow = '';
        body.style.overflow = '';
    }

    // Initialize Swiper for Expertise Section
    const expertiseSwiper = new Swiper('.slider-section .swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + (counter.getAttribute('data-target') === '99' ? '%' : '+');
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Form Validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        if (!phone) return true; // Phone is optional
        
        const cleanedPhone = phone.replace(/[^\d+]/g, '');
        
        if (/^\+977\d{10}$/.test(cleanedPhone)) return true;
        if (/^9\d{9}$/.test(cleanedPhone)) return true;
        if (/^98\d{8}$/.test(cleanedPhone)) return true;
        
        return false;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        
        formGroup.appendChild(errorEl);
        
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }

    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        field.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        field.style.boxShadow = 'none';
    }

    // Loading state functions
    function showLoading(button, originalText = null) {
        if (!originalText) {
            button.setAttribute('data-original-text', button.innerHTML);
        }
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        button.disabled = true;
    }

    function hideLoading(button) {
        const originalText = button.getAttribute('data-original-text');
        if (originalText) {
            button.innerHTML = originalText;
        }
        button.disabled = false;
    }

    // Simple Form Handler - UPDATED FOR NETLIFY FORMS
    const simpleForm = document.getElementById('simple-contact-form');
    const simpleMessage = document.getElementById('simple-form-message');

    if (simpleForm) {
        simpleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('simple-name').value.trim();
            const email = document.getElementById('simple-email').value.trim();
            const message = document.getElementById('simple-message').value.trim();
            
            if (!name || !email || !message) {
                showSimpleMessage('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showSimpleMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = simpleForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Netlify Forms will handle the submission
            // We'll let the form submit normally after validation
            setTimeout(() => {
                // Show success message
                showSimpleMessage('Thank you! We will contact you within 24 hours.', 'success');
                
                // Reset form and button
                setTimeout(() => {
                    simpleForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
                
                // Actually submit the form to Netlify
                simpleForm.submit();
            }, 1000);
        });
    }

    function showSimpleMessage(text, type) {
        if (simpleMessage) {
            simpleMessage.textContent = text;
            simpleMessage.className = 'simple-message';
            simpleMessage.classList.add(type === 'success' ? 'simple-success' : 'simple-error');
            simpleMessage.style.display = 'block';
            
            if (type === 'success') {
                setTimeout(() => {
                    simpleMessage.style.display = 'none';
                }, 5000);
            }
        }
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
                header.style.padding = '5px 0';
            } else {
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
                header.style.padding = '0';
            }
        }
    });

    // Newsletter Form Functionality - UPDATED FOR NETLIFY FORMS
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email-newsletter');
            const email = emailInput.value.trim();
            
            if (newsletterMessage) {
                newsletterMessage.style.display = 'none';
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitButton.disabled = true;
            
            // Netlify Forms will handle the submission
            setTimeout(() => {
                showNewsletterMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Actually submit the form to Netlify
                newsletterForm.submit();
            }, 1000);
        });
    }

    function showNewsletterMessage(message, type) {
        if (newsletterMessage) {
            newsletterMessage.textContent = message;
            newsletterMessage.className = `newsletter-message newsletter-${type}`;
            newsletterMessage.style.display = 'block';
            
            if (type === 'success') {
                setTimeout(() => {
                    newsletterMessage.style.display = 'none';
                }, 3000);
            }
        }
    }

    // Lazy loading for images
    const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Content verification checklist (development only)
    const contentChecklist = {
        'Hero Title': document.querySelector('.hero-text h1')?.textContent === 'PREMIUM WEB SOLUTIONS FOR MODERN BUSINESSES',
        'Phone Number': document.querySelector('.contact-info')?.textContent.includes('+977 9761762036'),
        'Email': document.querySelector('.contact-info')?.textContent.includes('regmiashish629@gmail.com'),
        'Services Count': document.querySelectorAll('.service-card').length === 6,
        'Form Present': document.getElementById('simple-contact-form') !== null,
        'Chatbot Present': document.getElementById('chatbot-container') !== null
    };
    
    console.log('Content Verification:', contentChecklist);

    // Netlify Forms Success Handling (for when form is submitted successfully)
    if (window.location.search.includes('form_submitted=true')) {
        // Show success message for any form submission
        const successMessage = document.createElement('div');
        successMessage.className = 'global-success-message';
        successMessage.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 10000;">
                <i class="fas fa-check-circle"></i> Form submitted successfully!
            </div>
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});