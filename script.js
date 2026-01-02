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
    
    if (productGroups.length === 0 || !carouselTrack) return;
    
    totalProductGroups = productGroups.length;
    isMobile = window.innerWidth <= 768;
    
    // Calculate total products
    const allProducts = document.querySelectorAll('.products-carousel-group .product-card');
    const totalProducts = allProducts.length;
    
    // On mobile: 2 products per page, on desktop: 4 products per group
    if (isMobile) {
        const productsPerPage = 2;
        totalMobilePages = Math.ceil(totalProducts / productsPerPage);
        // Ensure at least 1 page
        if (totalMobilePages === 0) totalMobilePages = 1;
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
            // On desktop, use transform translate
            if (carouselTrack) {
                const translateX = -normalizedIndex * 100;
                carouselTrack.style.transform = `translateX(${translateX}%)`;
            }
        }
        
        // Update pagination
        updatePagination();
    }
    
    function scrollToMobilePage(pageIndex) {
        if (!carouselWrapper || !isMobile) return;
        
        const allCards = carouselWrapper.querySelectorAll('.product-card');
        if (allCards.length === 0) return;
        
        const productsPerPage = 2;
        const targetCardIndex = pageIndex * productsPerPage;
        
        if (targetCardIndex >= 0 && targetCardIndex < allCards.length) {
            const targetCard = allCards[targetCardIndex];
            const cardWidth = targetCard.offsetWidth;
            const gap = 12;
            const pageWidth = (cardWidth + gap) * productsPerPage;
            const targetScroll = pageIndex * pageWidth;
            
            carouselWrapper.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    }
    
    function nextProductGroup() {
        if (isMobile) {
            // On mobile, scroll to next 2 products
            currentMobilePage = (currentMobilePage + 1) % totalMobilePages;
            scrollToMobilePage(currentMobilePage);
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
            scrollToMobilePage(currentMobilePage);
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
        let isProgrammaticScroll = false; // Flag to prevent scroll loop
        
        // Function to update mobile page based on scroll position
        function updateMobilePageFromScroll() {
            const allCards = carouselWrapper.querySelectorAll('.product-card');
            if (allCards.length === 0) return;
            
            const scrollPosition = carouselWrapper.scrollLeft;
            const wrapperRect = carouselWrapper.getBoundingClientRect();
            const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
            
            // Find which card is closest to center
            let closestCardIndex = 0;
            let minDistance = Infinity;
            
            allCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - wrapperCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCardIndex = index;
                }
            });
            
            // Calculate page based on card index (2 products per page)
            const productsPerPage = 2;
            const newPage = Math.floor(closestCardIndex / productsPerPage);
            
            if (newPage !== currentMobilePage && newPage >= 0 && newPage < totalMobilePages) {
                currentMobilePage = newPage;
                updatePagination();
            }
        }
        
        // Smooth scroll with snap - prevent infinite loop
        let scrollTimeout;
        carouselWrapper.addEventListener('scroll', () => {
            // Ignore scroll events triggered by programmatic scrolling
            if (isProgrammaticScroll) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (!isDown && !isScrolling) {
                    updateMobilePageFromScroll();
                    // Only snap if user is not actively scrolling
                    const productsPerPage = 2;
                    const allCards = carouselWrapper.querySelectorAll('.product-card');
                    if (allCards.length > 0) {
                        const scrollPosition = carouselWrapper.scrollLeft;
                        const cardWidth = allCards[0].offsetWidth;
                        const gap = 12;
                        const pageWidth = (cardWidth + gap) * productsPerPage;
                        const currentPage = Math.round(scrollPosition / pageWidth);
                        
                        if (currentPage !== currentMobilePage && currentPage >= 0 && currentPage < totalMobilePages) {
                            isProgrammaticScroll = true;
                            scrollToMobilePage(currentPage);
                            setTimeout(() => {
                                isProgrammaticScroll = false;
                            }, 300);
                        }
                    }
                }
            }, 200);
        });
        
        // Touch events for smooth scrolling
        let touchStartX = 0;
        let touchStartScrollLeft = 0;
        let isScrolling = false;
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartScrollLeft = carouselWrapper.scrollLeft;
            isScrolling = true;
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            // Let native scroll handle it for smoothness
        }, { passive: true });
        
        carouselWrapper.addEventListener('touchend', () => {
            if (!isScrolling) return;
            isScrolling = false;
            
            // Snap to nearest page after touch ends
            setTimeout(() => {
                updateMobilePageFromScroll();
                isProgrammaticScroll = true;
                scrollToMobilePage(currentMobilePage);
                setTimeout(() => {
                    isProgrammaticScroll = false;
                }, 300);
            }, 150);
        }, { passive: true });
        
        // Mouse drag support (for testing on desktop with mobile view)
        let mouseStartX = 0;
        let mouseStartScrollLeft = 0;
        let isMouseDown = false;
        
        carouselWrapper.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseStartX = e.pageX;
            mouseStartScrollLeft = carouselWrapper.scrollLeft;
            carouselWrapper.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                isMouseDown = false;
                carouselWrapper.style.cursor = 'grab';
                // Snap to nearest page
                setTimeout(() => {
                    updateMobilePageFromScroll();
                    isProgrammaticScroll = true;
                    scrollToMobilePage(currentMobilePage);
                    setTimeout(() => {
                        isProgrammaticScroll = false;
                    }, 300);
                }, 150);
            }
        });
        
        carouselWrapper.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                carouselWrapper.style.cursor = 'grab';
                // Snap to nearest page
                setTimeout(() => {
                    updateMobilePageFromScroll();
                    isProgrammaticScroll = true;
                    scrollToMobilePage(currentMobilePage);
                    setTimeout(() => {
                        isProgrammaticScroll = false;
                    }, 300);
                }, 150);
            }
        });
        
        carouselWrapper.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (x - mouseStartX) * 1.5; // Smooth drag
            carouselWrapper.scrollLeft = mouseStartScrollLeft - walk;
        });
    }
    
    // Initialize first group
    if (!isMobile) {
        // On desktop, show first group
        showProductGroup(0);
    } else {
        // On mobile, initialize pagination and scroll to first page
        currentMobilePage = 0;
        updatePagination();
        // Scroll to first page after a short delay to ensure DOM is ready
        setTimeout(() => {
            scrollToMobilePage(0);
        }, 100);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            // Recalculate mobile pages if switching to mobile
            if (isMobile) {
                const allProducts = document.querySelectorAll('.products-carousel-group .product-card');
                const productsPerPage = 2;
                totalMobilePages = Math.ceil(allProducts.length / productsPerPage);
                if (totalMobilePages === 0) totalMobilePages = 1;
                currentMobilePage = 0;
                setTimeout(() => {
                    scrollToMobilePage(0);
                }, 100);
            } else {
                // Switch back to desktop, reset to first group
                currentProductGroup = 0;
                showProductGroup(0);
            }
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

