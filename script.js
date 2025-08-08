// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// API Configuration
const API_BASE_URL = 'https://ahnaf-portfolio.ahnafrahatifty.workers.dev';

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                contactForm.innerHTML = `
                    <div style="text-align: center;">
                        <h3 style="color: #a78bfa; margin-bottom: 1rem;">Message Sent!</h3>
                        <p>Thanks for reaching out. I'll get back to you soon.</p>
                    </div>
                `;
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Show error message
            contactForm.innerHTML = `
                <div style="text-align: center;">
                    <h3 style="color: #e11d48; margin-bottom: 1rem;">Error!</h3>
                    <p>Sorry, there was an error sending your message. Please try again later.</p>
                    <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #a78bfa; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        Try Again
                    </button>
                </div>
            `;
        }
    });
}

// Analytics tracking
function trackPageView(page) {
    fetch(`${API_BASE_URL}/api/analytics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page })
    }).catch(error => {
        console.error('Analytics error:', error);
    });
}

// Track page views
document.addEventListener('DOMContentLoaded', () => {
    trackPageView(window.location.pathname);
    initContactForm();
});

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    hero.style.transform = `
        perspective(1000px)
        rotateY(${mouseX * 5}deg)
        rotateX(${-mouseY * 5}deg)
    `;
});

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const navLinksContainer = document.querySelector('.nav-links-container');

if (burgerMenu && navLinksContainer) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
} 