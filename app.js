// Abhijith R Pillai (p1ll3chan) Portfolio JavaScript - Fixed Version

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const particlesContainer = document.getElementById('particles');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Improved Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;

        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
});

// Fixed Portfolio Filter Functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Reset card styles first
                card.style.transition = 'all 0.3s ease';

                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
        });
    });
}

// Particle System for Cosmic Background
function createParticles() {
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 8;

        // Cosmic colors matching Abhijith's theme
        const colors = ['#FFD700', '#8B0000', '#4169E1', '#663399', '#CC6699', '#32C8CD'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.7 + 0.3};
            box-shadow: 0 0 ${size * 3}px ${color};
        `;

        particlesContainer.appendChild(particle);
    }

    // Add CSS animation for particles
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            .particle {
                pointer-events: none;
                z-index: 1;
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                25% {
                    transform: translateY(-30px) rotate(90deg);
                }
                50% {
                    transform: translateY(-60px) rotate(180deg);
                }
                75% {
                    transform: translateY(-30px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');

                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.6 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
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
}

// Contact Form Handling
function handleContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const nameField = contactForm.querySelector('input[type="text"]');
            const emailField = contactForm.querySelector('input[type="email"]');
            const subjectFields = contactForm.querySelectorAll('input[type="text"]');
            const subjectField = subjectFields[1] || subjectFields[0];
            const messageField = contactForm.querySelector('textarea');

            const name = nameField?.value || '';
            const email = emailField?.value || '';
            const subject = subjectField?.value || '';
            const message = messageField?.value || '';

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                showNotification('🚀 Message sent successfully! Abhijith will respond soon. 🚀', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-family: 'Exo 2', sans-serif;
        font-size: 14px;
        line-height: 1.4;
    `;

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(45deg, #32C8CD, #4169E1)',
        error: 'linear-gradient(45deg, #8B0000, #660000)',
        info: 'linear-gradient(45deg, #4169E1, #663399)'
    };

    notification.style.background = colors[type] || colors.info;
    notification.innerHTML = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);

    // Allow manual close on click
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Cosmic Glow Effect on Hover
function addCosmicGlowEffects() {
    const glowElements = document.querySelectorAll('.cosmic-btn, .portfolio-card, .skill-card, .timeline-content');

    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.15) saturate(1.3)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1) saturate(1)';
        });
    });
}

// Parallax Effect for Hero Section
function addParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });
}

// Typing Effect for Hero Title
function addTypingEffect() {
    const titleElement = document.querySelector('.title-line');
    if (!titleElement) return;

    const originalText = titleElement.textContent;
    titleElement.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Smooth Reveal Animation for Sections
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.about-content, .portfolio-card, .timeline-item, .skill-card, .code-snippet');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Random Star Field Background
function createStarField() {
    const starCount = 300;
    const body = document.body;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.8 + 0.2;
        const twinkle = Math.random() * 4 + 2;

        star.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation: twinkle ${twinkle}s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
        `;

        body.appendChild(star);
    }

    // Add twinkle animation
    if (!document.getElementById('star-styles')) {
        const style = document.createElement('style');
        style.id = 'star-styles';
        style.textContent = `
            @keyframes twinkle {
                0% { opacity: 0.2; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Code Animation Effect
function animateCodeSnippet() {
    const codeLines = document.querySelectorAll('.code-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeSnippet = entry.target.closest('.code-snippet');
                if (codeSnippet) {
                    animateTyping(codeLines);
                }
            }
        });
    }, { threshold: 0.5 });

    if (codeLines.length > 0) {
        observer.observe(codeLines[0]);
    }
}

function animateTyping(codeLines) {
    codeLines.forEach((line, index) => {
        const originalText = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';

        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < originalText.length) {
                    line.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 800);
    });
}

// GitHub Project Links (simulated)
function addProjectLinks() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;

            // Simulate opening GitHub project
            showNotification(`🚀 Opening ${projectTitle} project... 🚀`, 'info');

            // In a real scenario, this would open the actual GitHub link
            setTimeout(() => {
                // window.open('https://github.com/p1ll3chan/project-name', '_blank');
            }, 1000);
        });

        // Add hover effect for better UX
        card.style.cursor = 'pointer';
    });
}

// Fixed Navigation Setup
function setupNavigation() {
    // Setup nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                scrollToSection(targetId);
            }
        });
    });

    // Setup hero buttons with proper error handling
    const viewWorkBtn = document.getElementById('view-work-btn');
    const contactBtn = document.getElementById('contact-btn');

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('portfolio');
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
}

// Cosmic Cursor Effect
function addCosmicCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0.8;
    `;

    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .portfolio-card, .skill-card, .nav-link');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(65,105,225,0.8) 0%, rgba(65,105,225,0) 70%)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%)';
        });
    });
}

// Easter Egg: Competitive Programming Mode
let keySequence = [];
const cpSequence = [67, 80]; // C, P for Competitive Programming

document.addEventListener('keydown', (e) => {
    keySequence.push(e.keyCode);

    if (keySequence.length > cpSequence.length) {
        keySequence.shift();
    }

    if (keySequence.join(',') === cpSequence.join(',')) {
        activateCompetitiveProgrammingMode();
        keySequence = [];
    }
});

function activateCompetitiveProgrammingMode() {
    showNotification('🏆 COMPETITIVE PROGRAMMING MODE ACTIVATED! 🏆', 'success');

    // Add special effects
    document.body.style.animation = 'cp-pulse 3s ease-in-out';

    // Add CP pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cp-pulse {
            0%, 100% {
                filter: hue-rotate(0deg) brightness(1);
            }
            25% {
                filter: hue-rotate(90deg) brightness(1.2);
            }
            50% {
                filter: hue-rotate(180deg) brightness(1.4);
            }
            75% {
                filter: hue-rotate(270deg) brightness(1.2);
            }
        }
    `;
    document.head.appendChild(style);

    // Show programming quote
    setTimeout(() => {
        showNotification('💻 "I debug therefore I am!" - Abhijith R Pillai 💻', 'info');
    }, 1500);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create cosmic effects
    createParticles();
    createStarField();

    // Initialize interactive features
    setupNavigation(); // Fixed navigation setup
    initializePortfolioFilters(); // Fixed portfolio filters
    animateSkillBars();
    updateActiveNavLink();
    handleContactForm();
    addCosmicGlowEffects();
    addParallaxEffect();
    addRevealAnimations();
    animateCodeSnippet();
    addProjectLinks();

    // Add typing effect after page load
    setTimeout(addTypingEffect, 800);

    // Add cosmic cursor effect
    addCosmicCursor();

    // Welcome message for Abhijith's portfolio
    setTimeout(() => {
        showNotification('Welcome to Abhijith\'s cosmic portfolio! 🌟', 'info');
    }, 2000);
});

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations already handled in other functions
}, 16)); // ~60fps
