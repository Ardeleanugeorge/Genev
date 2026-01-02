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

// Products Carousel - 4 products per group on desktop, 2 on mobile
let currentProductGroup = 0;
let totalProductGroups = 0;
let currentMobilePage = 0;
let totalMobilePages = 0;
let isMobile = window.innerWidth <= 768;

function initProductsCarousel() {
    const productGroups = document.querySelectorAll('.products-carousel-group');
    const carouselWrapper = document.querySelector('.products-carousel-wrapper');
    const carouselTrack = document.querySelector('.products-carousel-track');
    const paginationPrev = document.querySelector('.carousel-pagination-prev');
    const paginationNext = document.querySelector('.carousel-pagination-next');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    
    if (productGroups.length === 0) return;
    
    totalProductGroups = productGroups.length;
    isMobile = window.innerWidth <= 768;
    
    // Calculate total products
    const allProducts = document.querySelectorAll('.products-carousel-group .product-card');
    const totalProducts = allProducts.length;
    
    // On mobile: 2 products per page, on desktop: 4 products per group
    if (isMobile) {
        totalMobilePages = Math.ceil(totalProducts / 2);
    }
    
    // Update pagination counter
    function updatePagination() {
        if (currentPageSpan && totalPagesSpan) {
            if (isMobile) {
                currentPageSpan.textContent = currentMobilePage + 1;
                totalPagesSpan.textContent = totalMobilePages;
            } else {
                currentPageSpan.textContent = currentProductGroup + 1;
                totalPagesSpan.textContent = totalProductGroups;
            }
        }
    }
    
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
        
        // Update pagination
        updatePagination();
    }
    
    function nextProductGroup() {
        if (isMobile) {
            // On mobile, scroll to next 2 products
            currentMobilePage = (currentMobilePage + 1) % totalMobilePages;
            const cardWidth = carouselWrapper?.querySelector('.product-card')?.offsetWidth || 0;
            const gap = 12;
            const productsPerPage = 2;
            const pageWidth = (cardWidth + gap) * productsPerPage;
            const scrollPosition = currentMobilePage * pageWidth;
            
            if (carouselWrapper) {
                carouselWrapper.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
            updatePagination();
        } else {
            // On desktop, use groups
            currentProductGroup = (currentProductGroup + 1) % totalProductGroups;
            showProductGroup(currentProductGroup);
        }
    }
    
    function prevProductGroup() {
        if (isMobile) {
            // On mobile, scroll to previous 2 products
            currentMobilePage = (currentMobilePage - 1 + totalMobilePages) % totalMobilePages;
            const cardWidth = carouselWrapper?.querySelector('.product-card')?.offsetWidth || 0;
            const gap = 12;
            const productsPerPage = 2;
            const pageWidth = (cardWidth + gap) * productsPerPage;
            const scrollPosition = currentMobilePage * pageWidth;
            
            if (carouselWrapper) {
                carouselWrapper.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
            updatePagination();
        } else {
            // On desktop, use groups
            currentProductGroup = (currentProductGroup - 1 + totalProductGroups) % totalProductGroups;
            showProductGroup(currentProductGroup);
        }
    }
    
    if (paginationNext) {
        paginationNext.addEventListener('click', (e) => {
            e.preventDefault();
            nextProductGroup();
        });
    }
    
    if (paginationPrev) {
        paginationPrev.addEventListener('click', (e) => {
            e.preventDefault();
            prevProductGroup();
        });
    }
    
    // Touch/swipe support for mobile with scroll-based pagination
    if (isMobile && carouselWrapper) {
        let startX = 0;
        let scrollLeft = 0;
        let isDown = false;
        
        // Function to update mobile page based on scroll position
        function updateMobilePageFromScroll() {
            const scrollPosition = carouselWrapper.scrollLeft;
            const cardWidth = carouselWrapper.querySelector('.product-card')?.offsetWidth || 0;
            const gap = 12;
            const productsPerPage = 2;
            
            // Calculate which page we're on (2 products per page)
            const currentProductIndex = Math.round(scrollPosition / (cardWidth + gap));
            const newPage = Math.floor(currentProductIndex / productsPerPage);
            
            if (newPage !== currentMobilePage && newPage >= 0 && newPage < totalMobilePages) {
                currentMobilePage = newPage;
                updatePagination();
            }
        }
        
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
            // Snap to nearest 2 products (1 page)
            const scrollPosition = carouselWrapper.scrollLeft;
            const cardWidth = carouselWrapper.querySelector('.product-card')?.offsetWidth || 0;
            const gap = 12;
            const productsPerPage = 2;
            const pageWidth = (cardWidth + gap) * productsPerPage;
            const currentPage = Math.round(scrollPosition / pageWidth);
            const snapPosition = currentPage * pageWidth;
            
            carouselWrapper.scrollTo({
                left: snapPosition,
                behavior: 'smooth'
            });
            
            // Update page after scroll
            setTimeout(() => {
                updateMobilePageFromScroll();
            }, 300);
        });
        
        // Update page on scroll
        carouselWrapper.addEventListener('scroll', () => {
            if (!isDown) {
                updateMobilePageFromScroll();
            }
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
            // Recalculate mobile pages if switching to mobile
            if (isMobile) {
                const allProducts = document.querySelectorAll('.products-carousel-group .product-card');
                totalMobilePages = Math.ceil(allProducts.length / 2);
                currentMobilePage = 0;
            }
            showProductGroup(currentProductGroup);
            updatePagination();
        }
    });
}

// Search Functionality
function initSearch() {
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.querySelector('.search-modal-close');
    const searchOverlay = document.querySelector('.search-modal-overlay');
    
    if (searchTriggers.length === 0 || !searchModal || !searchInput || !searchResults) return;
    
    // Collect all products from the page
    function getAllProducts() {
        const products = [];
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent?.trim() || '';
            const price = card.querySelector('.price')?.textContent?.trim() || '';
            const link = card.querySelector('a')?.href || card.closest('a')?.href || '#';
            const image = card.querySelector('img')?.src || '';
            const alt = card.querySelector('img')?.alt || title;
            
            if (title) {
                products.push({
                    title: title,
                    price: price,
                    link: link,
                    image: image,
                    alt: alt
                });
            }
        });
        
        return products;
    }
    
    // Search products
    function searchProducts(query) {
        const products = getAllProducts();
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            searchResults.innerHTML = '<p class="search-placeholder">Start typing to search for products...</p>';
            return;
        }
        
        const filtered = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.alt.toLowerCase().includes(searchTerm)
        );
        
        if (filtered.length === 0) {
            searchResults.innerHTML = '<p class="search-no-results">No products found. Try a different search term.</p>';
            return;
        }
        
        // Display results
        const resultsHTML = `
            <div class="search-results-grid">
                ${filtered.map(product => `
                    <a href="${product.link}" class="search-result-item">
                        <img src="${product.image}" alt="${product.alt}">
                        <h4>${product.title}</h4>
                        <span class="price">${product.price}</span>
                    </a>
                `).join('')}
            </div>
        `;
        
        searchResults.innerHTML = resultsHTML;
    }
    
    // Open search modal
    function openSearch() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }
    
    // Close search modal
    function closeSearch() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-placeholder">Start typing to search for products...</p>';
    }
    
    // Event listeners
    // Open search modal - works for both desktop and mobile
    searchTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openSearch();
        });
    });
    
    searchClose?.addEventListener('click', closeSearch);
    searchOverlay?.addEventListener('click', closeSearch);
    
    // Search on input
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('GENEV website loaded successfully');
    initCarousel();
    initProductsCarousel();
    initSearch();
    
    // Test scroll functionality
    console.log('Scroll functionality initialized');
});

