// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const typewriter = document.getElementById('typewriter');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.getElementById('projects-grid');

// Typewriter effect
const typewriterWords = [
  'an iOS Developer',
  'a Software Engineer', 
  'an AI Enthusiast',
  'a Problem Solver'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typewriterEffect() {
  const currentWord = typewriterWords[wordIndex];
  
  if (isDeleting) {
    typewriter.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    isWaiting = true;
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typewriterWords.length;
    typingSpeed = 500;
  }

  setTimeout(typewriterEffect, typingSpeed);
}

// Start typewriter effect
if (typewriter) {
  typewriterEffect();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .about-card, .timeline-item, .project-card, .skill-item, .contact-card').forEach(el => {
  observer.observe(el);
});

// Load projects from API
async function loadProjects() {
  try {
    const response = await fetch('/api/projects?featured=true');
    const projects = await response.json();
    
    if (projectsGrid && projects.length > 0) {
      projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
          <img src="${project.image_url}" alt="${project.title}" class="project-image">
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')}
            </div>
            <div class="project-links">
              ${project.project_url ? `<a href="${project.project_url}" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>` : ''}
              ${project.github_url ? `<a href="${project.github_url}" class="project-link" target="_blank">View Code <i class="fab fa-github"></i></a>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    // Fallback to static projects if API fails
    loadStaticProjects();
  }
}

// Fallback static projects
function loadStaticProjects() {
  const staticProjects = [
    {
      title: 'Seekr AI',
      description: 'AI-based solution for visually impaired people using ultralytics Yolov8 Model and Vision framework.',
      image_url: '/assets/seekr_banner.png',
      tags: 'iOS,AI,Vision Framework',
      project_url: 'https://apps.apple.com/us/app/seekr-ai/id6470461667'
    },
    {
      title: 'Kotha',
      description: 'Social Communication and Lifestyle app with real-time audio/video calling using WebRTC and messaging using Socket.IO.',
      image_url: '/assets/kotha_banner.png',
      tags: 'iOS,WebRTC,Socket.IO',
      project_url: 'https://apps.apple.com/us/app/kotha/id1188060798'
    },
    {
      title: 'WhiteLabel Games',
      description: 'Marketing-focused Advergame development company using Construct3, CreateJS, and JavaScript frameworks.',
      image_url: '/assets/whitelabel_banner.png',
      tags: 'Game Development,Construct3,JavaScript',
      project_url: 'https://playwhitelabel.com'
    },
    {
      title: 'AuctionVilla OÜ',
      description: 'Digital Assets Marketplace in Estonia specializing in mobile application ownership trading.',
      image_url: '/assets/av_banner.png',
      tags: 'Digital Assets,Marketplace,Product Engineering',
      project_url: 'https://auctionvilla.io/'
    }
  ];

  if (projectsGrid) {
    projectsGrid.innerHTML = staticProjects.map(project => `
      <div class="project-card">
        <img src="${project.image_url}" alt="${project.title}" class="project-image">
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.project_url}" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Contact form handling
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    contactForm.classList.add('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.classList.remove('loading');
    }
  });
}

// Show message function
function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Remove any existing messages
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Insert message before the form
  if (contactForm) {
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Analytics tracking
function trackPageView(page) {
  fetch('/api/analytics', {
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
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    hero.style.transform = `
      perspective(1000px)
      rotateY(${mouseX * 5}deg)
      rotateX(${-mouseY * 5}deg)
    `;
  }
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-10px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.5 });

timelineItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
    }, 30);
  });
}

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    if (navMenu && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// Performance optimization: Lazy load images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (!this.classList.contains('btn-secondary')) {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }
  });
});

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealSections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(50px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(section);
});
