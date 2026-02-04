import videos from './demoVideos.json' with { type: 'json' };

// Smooth scroll to section
window.scrollToSection = function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Toggle FAQ
window.toggleFAQ = function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Handle contact form submission
window.handleSubmit = function handleSubmit(event) {
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    event.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================
function initMobileMenu() {
    const toggleButton = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.sidebar a');

    function toggleMenu() {
        body.classList.toggle('menu-open');
    }

    function closeMenu() {
        body.classList.remove('menu-open');
    }

    // Toggle on button click
    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close when clicking the overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close when clicking a sidebar link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

window.changeHeroVideo = function changeHeroVideo(direction) {
    heroVideoIndex += direction;
    if (heroVideoIndex >= videos.length) heroVideoIndex = 0;
    if (heroVideoIndex < 0) heroVideoIndex = videos.length - 1;
    renderHeroVideo();
}

// ========================================
// HERO VIDEO CAROUSEL (Right side of hero)
// ========================================
let heroVideoIndex = 0;

function renderHeroVideo() {
    const container = document.getElementById('hero-video-container');
    if (!container || !videos.length) return;

    const video = videos[heroVideoIndex];
    container.innerHTML = `
        <div class="hero-video-card">
            <div class="hero-video-player">
                <iframe 
                    src="https://www.youtube.com/embed/${video.youtubeId}"
                    title="${video.title}"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="hero-video-info">
                <span class="hero-video-category">${video.category}</span>
                <h3 class="hero-video-title">${video.title}</h3>
            </div>
            <div class="hero-video-nav">
                <button class="hero-nav-btn prev" onclick="changeHeroVideo(-1)" aria-label="Previous video">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <span class="hero-video-counter">${heroVideoIndex + 1} / ${videos.length}</span>
                <button class="hero-nav-btn next" onclick="changeHeroVideo(1)" aria-label="Next video">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    initMobileMenu();

    // Initialize hero video
    renderHeroVideo();

    // Observe all feature cards and other elements for animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .syllabus-card, .testimonial-card, .faq-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll(`nav a[onclick*="${sectionId}"]`).forEach(link => {
                link.style.color = 'var(--secondary)';
            });
        } else {
            document.querySelectorAll(`nav a[onclick*="${sectionId}"]`).forEach(link => {
                link.style.color = 'var(--text-secondary)';
            });
        }
    });
});