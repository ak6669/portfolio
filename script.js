// ========================================
// BRUTALIST PORTFOLIO - Advanced Animations
// Inspired by chdartmaker.com
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initTypingAnimation();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initParallaxEffect();
    initSkillBars();
    initCursorTrail();
    initMagneticButtons();
});

// ========================================
// TYPING ANIMATION
// ========================================
const typedText = document.getElementById('typed-text');
const roles = ['Cloud Engineer', 'DevOps Specialist', 'Data Analyst', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function initTypingAnimation() {
    if (typedText) {
        setTimeout(typeRole, 1500);
    }
}

function typeRole() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Sections Observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.fade-up, .slide-left, .slide-right, .scale-up');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${0.1 * index}s`;
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Observe individual animated elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                elementObserver.unobserve(entry.target);
            }
        });
    }, { ...observerOptions, threshold: 0.2 });

    document.querySelectorAll('.fade-in, .fade-up, .slide-left, .slide-right, .scale-up, .line-draw, .image-reveal').forEach(el => {
        elementObserver.observe(el);
    });

    // Project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.15 * index}s`;
        card.classList.add('fade-up');
        elementObserver.observe(card);
    });

    // Certification cards with staggered animation
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
        card.classList.add('scale-up');
        elementObserver.observe(card);
    });

    // Achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.transitionDelay = `${0.1 * index}s`;
        card.classList.add('fade-up');
        elementObserver.observe(card);
    });

    // Education items
    const eduItems = document.querySelectorAll('.edu-item');
    eduItems.forEach((item, index) => {
        item.style.transitionDelay = `${0.15 * index}s`;
        item.classList.add('slide-left');
        elementObserver.observe(item);
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (!hero || !heroContent) return;

        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            // Parallax fade out effect
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            const translateY = scrolled * 0.3;
            const scale = 1 - (scrolled / heroHeight) * 0.1;

            heroContent.style.transform = `translateY(${translateY}px) scale(${Math.max(scale, 0.9)})`;
            heroContent.style.opacity = Math.max(opacity, 0);
        }
    });

    // Parallax for other elements
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = parseFloat(getComputedStyle(el).getPropertyValue('--parallax-speed')) || 0.1;
            const rect = el.getBoundingClientRect();
            const scrolled = window.scrollY;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');

                // Delay for staggered effect
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);

                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ========================================
// CUSTOM CURSOR TRAIL
// ========================================
function initCursorTrail() {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    // Create cursor trail element
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow effect
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;

        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .cert-card, .achievement-card, .contact-card, .social-link');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorTrail.style.transform = 'scale(2)';
            cursorTrail.style.borderColor = 'var(--color-gray)';
        });

        el.addEventListener('mouseleave', () => {
            cursorTrail.style.transform = 'scale(1)';
            cursorTrail.style.borderColor = 'var(--color-black)';
        });
    });
}

// ========================================
// MAGNETIC BUTTONS EFFECT
// ========================================
function initMagneticButtons() {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const magneticElements = document.querySelectorAll('.btn, .social-link');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHT
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.opacity = '0.5';
            });
            if (navLink) {
                navLink.style.opacity = '1';
            }
        }
    });
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c AKHILESH KAPARAJU ', 'background: #0a0a0a; color: #ffffff; font-size: 24px; font-weight: bold; padding: 10px 20px;');
console.log('%c Cloud Engineer | DevOps | Data Analytics ', 'background: #ffffff; color: #0a0a0a; font-size: 12px; padding: 5px 10px; border: 1px solid #0a0a0a;');
console.log('%c Built with ♥ using pure HTML, CSS & JavaScript ', 'color: #888; font-size: 10px;');
