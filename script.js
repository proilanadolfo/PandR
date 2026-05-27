// ===========================
// MOBILE MENU FUNCTIONALITY
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// MENU CATEGORY FILTER
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

// Observe elements for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// Observe info cards
document.querySelectorAll('.info-card').forEach(card => {
    observer.observe(card);
});

// ===========================
// BUTTON CLICK HANDLERS
// ===========================

const orderBtn = document.querySelector('.btn-primary');
const viewMenuBtn = document.querySelector('.btn-secondary');

orderBtn.addEventListener('click', () => {
    alert('Thank you for your interest! Order functionality coming soon. 🎉');
    // Smooth scroll to menu section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

viewMenuBtn.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// Product button handlers
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.closest('.product-card').querySelector('h3').textContent;
        
        // Show feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Added to Cart';
        btn.style.background = 'linear-gradient(135deg, #10b981, #6ee7b7)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, #2563eb, #60a5fa)';
        }, 2000);
        
        // Show toast notification
        showToast(`${productName} added to cart!`);
    });
});

// Contact links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.textContent;
        alert(`Follow us on ${platform}! Link will be available soon. 📱`);
    });
});

// ===========================
// TOAST NOTIFICATION
// ===========================

function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #2563eb, #60a5fa);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.5s ease-out;
        font-weight: 500;
        z-index: 9999;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Add slide animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// SMOOTH SCROLL ENHANCEMENT
// ===========================

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    // Add fade-in class to hero on load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease-out';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 1s ease-out 0.2s forwards';
    }
});

// ===========================
// INTERACTIVE EFFECTS
// ===========================

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for blobs (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.animated-blob');
    
    blobs.forEach((blob, index) => {
        blob.style.transform = `translate(${scrolled * 0.05 * (index + 1)}px, ${scrolled * 0.03 * (index + 1)}px)`;
    });
});

// ===========================
// PHONE AND FACEBOOK LINKS
// ===========================

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default behavior on devices that support tel:
        if (!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))) {
            e.preventDefault();
            alert('Phone call feature not available. Number: ' + link.textContent);
        }
    });
});

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Keyboard navigation for menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus styles for accessibility
document.addEventListener('focus', (e) => {
    if (e.target.matches('a, button')) {
        e.target.style.outline = 'none';
        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.3)';
    }
}, true);

document.addEventListener('blur', (e) => {
    if (e.target.matches('a, button')) {
        e.target.style.boxShadow = 'none';
    }
}, true);

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log('%c✨ Welcome to P&R Tea House! ✨', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cSip the Moment - Premium Tea & Café Experience', 'color: #60a5fa; font-size: 14px;');
