// Mobile menu is now handled by inline script in HTML for maximum reliability

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
        // Remove active class from all slides first (fade out to black)
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Wait for fade out to complete, then show black screen for 40ms
        setTimeout(() => {
            // Black screen moment (all slides are completely hidden) - 40ms instant
            // Then fade in the new slide rapidly
            setTimeout(() => {
                if (slides[index]) {
                    slides[index].classList.add('active');
                }
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }, 40); // Black screen for 40ms - instant and complete
        }, 600); // Wait for fade out (0.6s transition - rapid fade to black)
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
        // Clear any existing interval first
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        carouselInterval = setInterval(() => {
            nextSlide();
        }, 6000); // Change slide every 6 seconds
    }

    function resetCarousel() {
        clearInterval(carouselInterval);
        carouselInterval = null;
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
    
    // Removed pause on hover to prevent carousel from stopping when scrolling
}

// Products Carousel - 4 products per group on desktop, 2 on mobile
let currentDesktopPage = 0;
let currentMobilePage = 0;
let totalDesktopPages = 0;
let totalMobilePages = 0;
let isMobile = window.innerWidth <= 768;

function initProductsCarousel() {
    const carouselWrapper = document.querySelector('.products-carousel-wrapper');
    const carouselTrack = document.querySelector('.products-carousel-track');
    const paginationPrev = document.querySelector('.carousel-pagination-prev');
    const paginationNext = document.querySelector('.carousel-pagination-next');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    
    if (!carouselTrack) return;
    
    isMobile = window.innerWidth <= 768;
    
    // Get all product cards
    const allCards = carouselTrack.querySelectorAll('.product-card');
    const totalProducts = allCards.length;
    
    if (totalProducts === 0) return;
    
    // Calculate pages
    if (isMobile) {
        const productsPerPage = 2;
        totalMobilePages = Math.ceil(totalProducts / productsPerPage);
        if (totalMobilePages === 0) totalMobilePages = 1;
    } else {
        const productsPerPage = 4;
        totalDesktopPages = Math.ceil(totalProducts / productsPerPage);
        if (totalDesktopPages === 0) totalDesktopPages = 1;
    }
    
    // Update pagination counter
    function updatePagination() {
        if (currentPageSpan && totalPagesSpan) {
            if (isMobile) {
                currentPageSpan.textContent = currentMobilePage + 1;
                totalPagesSpan.textContent = totalMobilePages;
            } else {
                currentPageSpan.textContent = currentDesktopPage + 1;
                totalPagesSpan.textContent = totalDesktopPages;
            }
        }
    }
    
    function scrollToMobilePage(pageIndex) {
        if (!carouselWrapper || !isMobile) return;
        
        const allCards = carouselTrack.querySelectorAll('.product-card');
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
    
    function scrollToDesktopPage(pageIndex) {
        if (!carouselTrack || isMobile) return;
        
        const allCards = carouselTrack.querySelectorAll('.product-card');
        if (allCards.length === 0) return;
        
        const productsPerPage = 4;
        const cardWidth = allCards[0].offsetWidth;
        const gap = 20;
        const pageWidth = (cardWidth + gap) * productsPerPage;
        const translateX = -pageIndex * pageWidth;
        
        carouselTrack.style.transform = `translateX(${translateX}px)`;
    }
    
    function nextPage() {
        if (isMobile) {
            currentMobilePage = (currentMobilePage + 1) % totalMobilePages;
            scrollToMobilePage(currentMobilePage);
        } else {
            currentDesktopPage = (currentDesktopPage + 1) % totalDesktopPages;
            scrollToDesktopPage(currentDesktopPage);
        }
        updatePagination();
    }
    
    function prevPage() {
        if (isMobile) {
            currentMobilePage = (currentMobilePage - 1 + totalMobilePages) % totalMobilePages;
            scrollToMobilePage(currentMobilePage);
        } else {
            currentDesktopPage = (currentDesktopPage - 1 + totalDesktopPages) % totalDesktopPages;
            scrollToDesktopPage(currentDesktopPage);
        }
        updatePagination();
    }
    
    if (paginationNext) {
        paginationNext.addEventListener('click', (e) => {
            e.preventDefault();
            nextPage();
        });
    }
    
    if (paginationPrev) {
        paginationPrev.addEventListener('click', (e) => {
            e.preventDefault();
            prevPage();
        });
    }
    
    // Update pagination on scroll for mobile
    if (isMobile && carouselWrapper) {
        let scrollTimeout;
        let isProgrammaticScroll = false;
        
        carouselWrapper.addEventListener('scroll', () => {
            if (isProgrammaticScroll) return;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const allCards = carouselTrack.querySelectorAll('.product-card');
                if (allCards.length > 0) {
                    const scrollPosition = carouselWrapper.scrollLeft;
                    const cardWidth = allCards[0].offsetWidth;
                    const gap = 12;
                    const productsPerPage = 2;
                    const pageWidth = (cardWidth + gap) * productsPerPage;
                    const currentPage = Math.round(scrollPosition / pageWidth);
                    
                    if (currentPage !== currentMobilePage && currentPage >= 0 && currentPage < totalMobilePages) {
                        currentMobilePage = currentPage;
                        updatePagination();
                    }
                }
            }, 150);
        });
    }
    
    // Initialize
    updatePagination();
    if (!isMobile) {
        scrollToDesktopPage(0);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== isMobile) {
            const allCards = carouselTrack.querySelectorAll('.product-card');
            const totalProducts = allCards.length;
            
            if (isMobile) {
                const productsPerPage = 2;
                totalMobilePages = Math.ceil(totalProducts / productsPerPage);
                if (totalMobilePages === 0) totalMobilePages = 1;
                currentMobilePage = 0;
            } else {
                const productsPerPage = 4;
                totalDesktopPages = Math.ceil(totalProducts / productsPerPage);
                if (totalDesktopPages === 0) totalDesktopPages = 1;
                currentDesktopPage = 0;
                scrollToDesktopPage(0);
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
    
    // Mobile menu two-level navigation
    function initMobileMenuNavigation() {
        const menu = document.querySelector('.nav-menu-left');
        const submenu = document.getElementById('mobileSubmenu');
        const submenuTitle = submenu.querySelector('.mobile-submenu-title');
        const submenuList = submenu.querySelector('.mobile-submenu-list');
        
        // Check if mobile
        function isMobile() {
            return window.innerWidth <= 768;
        }
        
        // Handle submenu toggle buttons - for all levels
        // Use event delegation to handle all submenu toggles
        document.addEventListener('click', function(e) {
            // Check if mobile at click time
            if (window.innerWidth > 768) return;
            
            const toggleBtn = e.target.closest('.submenu-toggle');
            if (!toggleBtn) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const parent = toggleBtn.closest('.nav-item-dropdown');
            if (!parent) return;
            
                const dropdown = parent.querySelector('.nav-dropdown');
                if (!dropdown) return;
                
                // Show submenu
            const categoryName = parent.querySelector('.nav-link-main').textContent.trim();
            submenuTitle.textContent = categoryName;
            
            // Populate submenu
            submenuList.innerHTML = '';
            
            // Get all direct children (li elements) from dropdown
            Array.from(dropdown.children).forEach(item => {
                if (item.tagName === 'LI') {
                    const li = document.createElement('li');
                    
                    // Check if this item has a nested dropdown
                    const nestedDropdown = item.querySelector('.nav-dropdown');
                    const nestedLink = item.querySelector('.nav-link-main');
                    
                    if (nestedDropdown && nestedDropdown.children.length > 0) {
                        // This item has subcategories - create a clickable item that opens nested submenu
                        const link = document.createElement('a');
                        link.href = nestedLink ? nestedLink.getAttribute('href') || '#' : '#';
                        link.textContent = nestedLink ? nestedLink.textContent.trim() : item.textContent.trim();
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            showNestedSubmenu(this.textContent.trim(), nestedDropdown);
                        });
                        li.appendChild(link);
                    } else {
                        // Regular link without subcategories
                        const link = item.querySelector('a');
                        if (link) {
                            const newLink = document.createElement('a');
                            newLink.href = link.getAttribute('href') || '#';
                            newLink.textContent = link.textContent.trim();
                            li.appendChild(newLink);
                        }
                    }
                    
                    submenuList.appendChild(li);
                }
            });
            
            // Show submenu, hide main menu
            submenu.style.display = 'block';
            menu.classList.add('submenu-active');
        });
            
            // Prevent link clicks from opening submenu - only button does
            document.querySelectorAll('.nav-menu-left .nav-item-dropdown > .mobile-menu-row > .nav-link-main').forEach(link => {
                link.addEventListener('click', function(e) {
                    // Allow normal navigation for links without preventing default
                    // The button handles submenu opening
                });
            });
        }
    }
    
    function showNestedSubmenu(title, dropdown) {
        const menu = document.querySelector('.nav-menu-left');
        const submenu = document.getElementById('mobileSubmenu');
        const submenuTitle = submenu.querySelector('.mobile-submenu-title');
        const submenuList = submenu.querySelector('.mobile-submenu-list');
        
        submenuTitle.textContent = title;
        submenuList.innerHTML = '';
        
        Array.from(dropdown.children).forEach(item => {
            const subLink = item.querySelector('a');
            if (subLink) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = subLink.getAttribute('href');
                a.textContent = subLink.textContent.trim();
                li.appendChild(a);
                submenuList.appendChild(li);
            }
        });
        
        menu.classList.add('submenu-active');
    }
    
    // Global function to go back to main menu
    window.goBackToMainMenu = function() {
        const menu = document.querySelector('.nav-menu-left');
        const submenu = document.getElementById('mobileSubmenu');
        if (menu) {
            menu.classList.remove('submenu-active');
        }
        if (submenu) {
            submenu.style.display = 'none';
        }
    };
    
    // Initialize mobile menu navigation
    initMobileMenuNavigation();
    
    // Test scroll functionality
    console.log('Scroll functionality initialized');
});

