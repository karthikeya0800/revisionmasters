// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Toggle FAQ
function toggleFAQ(element) {
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

// Video interaction
function playVideo(container) {
    const iframe = container.querySelector('iframe');
    const src = iframe.src;

    // Add autoplay parameter if not already present
    if (src.indexOf('autoplay=1') === -1) {
        iframe.src = src + (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const subject = encodeURIComponent('Inquiry from Revision Masters Website');
    const body = encodeURIComponent(`Email: ${email}

Message:
${message}`);
    window.location.href = `mailto:revisionmasters18@gmail.com?subject=${subject}&body=${body}`;

    // Show success message
    alert('Thank you for your message! Your email client will open to send the message.');

    // Reset form
    event.target.reset();
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

// Observe all feature cards and other elements
document.addEventListener('DOMContentLoaded', () => {
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