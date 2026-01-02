// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenuLeft = document.querySelector('.nav-menu-left');
const navOverlay = document.querySelector('.nav-overlay');

if (hamburger && navMenuLeft && navOverlay) {
    hamburger.addEventListener('click', () => {
        navMenuLeft.classList.toggle('active');
        navOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenuLeft.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on overlay
    navOverlay.addEventListener('click', () => {
        navMenuLeft.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenuLeft.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenuLeft.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Color Selection
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Size Selection
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to Cart Functionality
const addToCartBtn = document.querySelector('.btn-add-cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const selectedColor = document.querySelector('.color-option.active')?.textContent || 'Silver';
        const selectedSize = document.querySelector('.size-option.active')?.textContent || 'M';
        
        alert(`Produs adăugat în coș!\nCuloare: ${selectedColor}\nMărime: ${selectedSize}`);
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Mulțumim! Te-ai abonat cu adresa: ${email}`);
        newsletterForm.reset();
    });
}

// Lazy Loading Images (excluding product images with hover effect)
const images = document.querySelectorAll('img:not(.product-image-main):not(.product-image-hover)');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s';
        imageObserver.observe(img);
    });
}

// Header Scroll Effect - using .header--scrolled class
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    if (currentScroll > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});

// Product Card Hover Effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease';
    });
});

// Size Chart Toggle
const sizeChartLink = document.querySelector('a[href="#size-chart"]');
const sizeChartSection = document.querySelector('.size-chart-section');

if (sizeChartLink && sizeChartSection) {
    sizeChartLink.addEventListener('click', (e) => {
        e.preventDefault();
        sizeChartSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Carousel Functionality
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (slides.length === 0) return;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetCarousel();
    }

    function startCarousel() {
        carouselInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    // Set up event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetCarousel();
        });
    }
    
    // Set up dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Start auto-play
    startCarousel();
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            startCarousel();
        });
    }
}

// Products Carousel - 4 products per group
let currentProductGroup = 0;
let totalProductGroups = 0;
let isMobile = window.innerWidth <= 768;

function initProductsCarousel() {
    const productGroups = document.querySelectorAll('.products-carousel-group');
    const nextBtn = document.querySelector('.products-carousel-next-btn');
    const carouselWrapper = document.querySelector('.products-carousel-wrapper');
    const carouselTrack = document.querySelector('.products-carousel-track');
    
    if (productGroups.length === 0) return;
    
    totalProductGroups = productGroups.length;
    isMobile = window.innerWidth <= 768;
    
    function showProductGroup(index) {
        // Normalize index for infinite loop
        const normalizedIndex = index % totalProductGroups;
        
        if (isMobile) {
            // On mobile, use scroll
            if (carouselWrapper && productGroups[normalizedIndex]) {
                const group = productGroups[normalizedIndex];
                const scrollLeft = group.offsetLeft - carouselWrapper.offsetLeft;
                carouselWrapper.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        } else {
            // On desktop, use opacity/visibility
            productGroups.forEach(group => group.classList.remove('active'));
            if (productGroups[normalizedIndex]) {
                productGroups[normalizedIndex].classList.add('active');
            }
        }
        
        // Never hide next button - infinite loop
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }
    
    function nextProductGroup() {
        // Infinite loop - always go to next, wrap around to 0
        currentProductGroup = (currentProductGroup + 1) % totalProductGroups;
        showProductGroup(currentProductGroup);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextProductGroup();
        });
    }
    
    // Touch/swipe support for mobile with infinite scroll
    if (isMobile && carouselWrapper) {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        // Clone first and last groups for infinite scroll
        const firstGroup = productGroups[0];
        const lastGroup = productGroups[productGroups.length - 1];
        if (firstGroup && lastGroup && carouselTrack) {
            const firstClone = firstGroup.cloneNode(true);
            firstClone.classList.add('clone', 'clone-first');
            const lastClone = lastGroup.cloneNode(true);
            lastClone.classList.add('clone', 'clone-last');
            
            carouselTrack.insertBefore(lastClone, firstGroup);
            carouselTrack.appendChild(firstClone);
            
            // Scroll to first real group
            setTimeout(() => {
                carouselWrapper.scrollLeft = lastClone.offsetWidth;
            }, 100);
        }
        
        // Handle infinite scroll
        carouselWrapper.addEventListener('scroll', () => {
            if (!isDown) {
                const scrollPos = carouselWrapper.scrollLeft;
                const wrapperWidth = carouselWrapper.offsetWidth;
                const trackWidth = carouselTrack.offsetWidth;
                
                // If scrolled to clone at the end, jump to real start
                if (scrollPos >= trackWidth - wrapperWidth - 50) {
                    carouselWrapper.scrollLeft = wrapperWidth;
                }
                // If scrolled to clone at the start, jump to real end
                else if (scrollPos <= 50) {
                    carouselWrapper.scrollLeft = trackWidth - wrapperWidth * 2;
                }
            }
        });
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
        });
        
        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - carouselWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });
        
        carouselWrapper.addEventListener('touchend', () => {
            isDown = false;
            // Snap to nearest product
            const scrollPosition = carouselWrapper.scrollLeft;
            const cardWidth = carouselWrapper.querySelector('.product-card')?.offsetWidth || 0;
            const gap = 12;
            const snapPosition = Math.round(scrollPosition / (cardWidth + gap)) * (cardWidth + gap);
            carouselWrapper.scrollTo({
                left: snapPosition,
                behavior: 'smooth'
            });
        });
        
        // Mouse drag support (for testing on desktop with mobile view)
        carouselWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carouselWrapper.offsetLeft;
            scrollLeft = carouselWrapper.scrollLeft;
            carouselWrapper.style.cursor = 'grabbing';
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            carouselWrapper.style.cursor = 'grab';
        });
        
        carouselWrapper.addEventListener('mouseup', () => {
            isDown = false;
            carouselWrapper.style.cursor = 'grab';
        });
        
        carouselWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carouselWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            carouselWrapper.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Initialize first group
    showProductGroup(0);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        if (wasMobile !== isMobile) {
            showProductGroup(currentProductGroup);
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('GENEV website loaded successfully');
    initCarousel();
    initProductsCarousel();
    
    // Test scroll functionality
    console.log('Scroll functionality initialized');
});

