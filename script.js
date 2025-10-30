// =============================================================================
// DATA AND CONFIGURATION
// =============================================================================

// Sample assets data - replace with real data in production
const assetsData = [
    {
        id: 1,
        name: "Manhattan Commercial Tower",
        type: "real-estate",
        location: "New York, NY",
        yield: 7.2,
        maturity: "2030-12-31",
        value: "$85M",
        description: "Prime commercial real estate in Manhattan's financial district with long-term corporate tenants."
    },
    {
        id: 2,
        name: "California Solar Farm",
        type: "infrastructure",
        location: "Mojave Desert, CA",
        yield: 5.8,
        maturity: "2035-06-30",
        value: "$120M",
        description: "Large-scale solar energy facility with 20-year power purchase agreements."
    },
    {
        id: 3,
        name: "Fine Art Collection",
        type: "fine-art",
        location: "Global",
        yield: 12.5,
        maturity: "2028-03-15",
        value: "$45M",
        description: "Curated collection of contemporary art from emerging and established artists."
    },
    {
        id: 4,
        name: "Industrial Warehouse Portfolio",
        type: "real-estate",
        location: "Chicago, IL",
        yield: 6.9,
        maturity: "2032-09-30",
        value: "$65M",
        description: "Collection of logistics and distribution centers serving major metropolitan areas."
    },
    {
        id: 5,
        name: "Precious Metals Fund",
        type: "commodities",
        location: "Global",
        yield: 3.5,
        maturity: "2027-11-30",
        value: "$150M",
        description: "Diversified portfolio of gold, silver, and platinum stored in secure vaults."
    },
    {
        id: 6,
        name: "Tech Campus",
        type: "real-estate",
        location: "Austin, TX",
        yield: 8.1,
        maturity: "2033-05-31",
        value: "$95M",
        description: "State-of-the-art office campus leased to leading technology companies."
    }
];

// Sample team data
const teamData = [
    {
        id: 1,
        name: "Alexandra Chen",
        role: "CEO & Founder",
        bio: "Former investment banker with 15+ years in financial markets and blockchain technology.",
        initials: "AC"
    },
    {
        id: 2,
        name: "Marcus Rodriguez",
        role: "CTO",
        bio: "Blockchain architect with expertise in DeFi protocols and smart contract development.",
        initials: "MR"
    },
    {
        id: 3,
        name: "Sarah Johnson",
        role: "Head of Legal",
        bio: "Securities lawyer specializing in digital assets and regulatory compliance.",
        initials: "SJ"
    },
    {
        id: 4,
        name: "David Kim",
        role: "Head of Asset Management",
        bio: "Real estate investment professional with a decade of portfolio management experience.",
        initials: "DK"
    }
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Helper to create DOM elements with attributes
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'textContent') {
            element.textContent = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    // Append children
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const sunIcons = document.querySelectorAll('.theme-icon-sun');
    const moonIcons = document.querySelectorAll('.theme-icon-moon');
    
    if (theme === 'light') {
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
    } else {
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
    }
}

// =============================================================================
// ROUTING SYSTEM
// =============================================================================

function initRouter() {
    // Show the page based on the current hash
    function showPage() {
        const hash = window.location.hash || '#/';
        const pageId = hash.replace('#/', '') || 'home';
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the current page
        const currentPage = document.getElementById(pageId);
        if (currentPage) {
            currentPage.classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top when changing pages
            window.scrollTo(0, 0);
        } else {
            // Fallback to home if page doesn't exist
            document.getElementById('home').classList.add('active');
        }
        
        // Close mobile menu if open
        closeMobileMenu();
    }
    
    // Listen for hash changes
    window.addEventListener('hashchange', showPage);
    
    // Initial page load
    showPage();
}

// =============================================================================
// MOBILE MENU
// =============================================================================

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    
    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('open');
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function closeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    
    mobileToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
}

// =============================================================================
// ASSETS MANAGEMENT
// =============================================================================

function initAssets() {
    const assetsGrid = document.getElementById('assetsGrid');
    const typeFilter = document.getElementById('assetTypeFilter');
    const sortBy = document.getElementById('sortBy');
    const yieldRange = document.getElementById('yieldRange');
    const yieldValue = document.getElementById('yieldValue');
    
    // Update yield range display
    yieldRange.addEventListener('input', () => {
        yieldValue.textContent = `0-${yieldRange.value}%`;
        filterAndRenderAssets();
    });
    
    // Add event listeners for filtering and sorting
    typeFilter.addEventListener('change', filterAndRenderAssets);
    sortBy.addEventListener('change', filterAndRenderAssets);
    
    // Initial render
    renderAssets(assetsData);
    
    function filterAndRenderAssets() {
        const typeValue = typeFilter.value;
        const sortValue = sortBy.value;
        const maxYield = parseInt(yieldRange.value);
        
        let filteredAssets = assetsData.filter(asset => {
            // Filter by type
            if (typeValue !== 'all' && asset.type !== typeValue) {
                return false;
            }
            
            // Filter by yield
            if (asset.yield > maxYield) {
                return false;
            }
            
            return true;
        });
        
        // Sort assets
        filteredAssets.sort((a, b) => {
            switch (sortValue) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'yield-high':
                    return b.yield - a.yield;
                case 'yield-low':
                    return a.yield - b.yield;
                case 'maturity':
                    return new Date(a.maturity) - new Date(b.maturity);
                default:
                    return 0;
            }
        });
        
        renderAssets(filteredAssets);
    }
    
    function renderAssets(assets) {
        assetsGrid.innerHTML = '';
        
        if (assets.length === 0) {
            assetsGrid.innerHTML = '<p class="no-results" style="text-align: center; grid-column: 1 / -1; padding: var(--space-2xl);">No assets match your filters. Try adjusting your criteria.</p>';
            return;
        }
        
        assets.forEach(asset => {
            const assetCard = createAssetCard(asset);
            assetsGrid.appendChild(assetCard);
        });
    }
    
    function createAssetCard(asset) {
        const card = createElement('div', { className: 'card asset-card' });
        
        // Asset image with badge
        const assetImage = createElement('div', { className: 'asset-image' }, [
            asset.name
        ]);
        
        const badge = createElement('div', { 
            className: 'asset-badge',
            textContent: asset.type.charAt(0).toUpperCase() + asset.type.slice(1).replace('-', ' ')
        });
        assetImage.appendChild(badge);
        
        // Asset content
        const assetContent = createElement('div', { className: 'asset-content' }, [
            createElement('h4', { textContent: asset.name }),
            createElement('p', { 
                className: 'text-light',
                textContent: asset.location 
            }),
            createElement('p', { 
                textContent: asset.description 
            })
        ]);
        
        // Asset meta (yield and maturity)
        const assetMeta = createElement('div', { className: 'asset-meta' }, [
            createElement('div', { 
                className: 'asset-yield',
                textContent: `${asset.yield}% Yield` 
            }),
            createElement('div', { 
                className: 'asset-maturity',
                textContent: `Matures: ${formatDate(asset.maturity)}` 
            })
        ]);
        
        assetContent.appendChild(assetMeta);
        
        // Assemble card
        card.appendChild(assetImage);
        card.appendChild(assetContent);
        
        return card;
    }
}

// =============================================================================
// TEAM MANAGEMENT
// =============================================================================

function initTeam() {
    const teamGrid = document.getElementById('teamGrid');
    
    teamData.forEach(member => {
        const teamCard = createTeamCard(member);
        teamGrid.appendChild(teamCard);
    });
    
    function createTeamCard(member) {
        const card = createElement('div', { className: 'card team-card' });
        
        // Avatar
        const avatar = createElement('div', { 
            className: 'team-avatar',
            textContent: member.initials
        });
        
        // Content
        const content = createElement('div', {}, [
            createElement('h4', { textContent: member.name }),
            createElement('p', { 
                className: 'text-primary',
                textContent: member.role 
            }),
            createElement('p', { 
                textContent: member.bio 
            })
        ]);
        
        // Social links
        const social = createElement('div', { className: 'team-social' }, [
            createSocialLink('linkedin'),
            createSocialLink('twitter'),
            createSocialLink('github')
        ]);
        
        card.appendChild(avatar);
        card.appendChild(content);
        card.appendChild(social);
        
        return card;
    }
    
    function createSocialLink(platform) {
        const link = createElement('a', { 
            className: 'social-link',
            href: '#',
            'aria-label': `${platform} profile`
        });
        
        let iconSvg;
        switch (platform) {
            case 'linkedin':
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 9H2V21H6V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
            case 'twitter':
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
            case 'github':
                iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.7C15.1 17.1 15 16.5 14.8 16C17.3 15.7 20 14.7 20 9C19.9 7.7 19.3 6.6 18.4 5.8C18.8 4.8 18.8 3.7 18.4 2.8C18.4 2.8 17.3 2.5 15 4.1C13.1 3.6 11 3.6 9.1 4.1C6.8 2.5 5.7 2.8 5.7 2.8C5.3 3.7 5.3 4.8 5.7 5.8C4.8 6.6 4.1 7.8 4.1 9C4.1 14.6 6.8 15.6 9.3 16C9.1 16.4 9 17 9.1 17.6V21M9 19C9 20.1 9 21 9 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
        }
        
        link.innerHTML = iconSvg;
        return link;
    }
}

// =============================================================================
// FAQ ACCORDION
// =============================================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the item
            item.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
        
        // Keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

// =============================================================================
// CONTACT FORM
// =============================================================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            showToast('Your message has been sent successfully!');
            form.reset();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        // Clear error on input
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
    
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}Error`);
        
        // Clear previous error
        clearError(field);
        
        // Check required fields
        if (field.hasAttribute('required') && value === '') {
            setError(field, errorElement, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function setError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.id}Error`);
        errorElement.textContent = '';
    }
    
    function showToast(message) {
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
}

// =============================================================================
// SCROLL EFFECTS
// =============================================================================

function initScrollEffects() {
    // Header background on scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10));
}

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRouter();
    initMobileMenu();
    initAssets();
    initTeam();
    initFAQ();
    initContactForm();
    initScrollEffects();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links, not our SPA routing
            if (href.startsWith('#/') || href === '#') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});