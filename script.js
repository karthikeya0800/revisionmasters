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
                // alert(json.message)
            } else {
                console.log(response);
                result.innerHTML = json.message;
                // alert(json.message)
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            // alert("Something went wrong!")
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