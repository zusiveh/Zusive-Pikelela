// ============================================
// ZUSIVE PIKELELA PORTFOLIO - JAVASCRIPT
// ============================================

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL INDICATOR
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}



// ============================================
// IMAGE MODAL / ZOOM FUNCTIONALITY
// ============================================

// Create modal element
const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <span class="modal-nav modal-prev">&#10094;</span>
            <img class="modal-image" src="" alt="">
            <span class="modal-nav modal-next">&#10095;</span>
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

// Initialize modal
const modal = createModal();
const modalImg = modal.querySelector('.modal-image');
const modalCaption = modal.querySelector('.modal-caption');
const closeBtn = modal.querySelector('.modal-close');
const prevBtn = modal.querySelector('.modal-prev');
const nextBtn = modal.querySelector('.modal-next');

// Get all achievement images
const achievementImages = document.querySelectorAll('.achievement-image');
let currentImageIndex = 0;
let imagesArray = [];

// Store images in array with their data
achievementImages.forEach((img, index) => {
    imagesArray.push({
        src: img.src,
        alt: img.alt,
        caption: img.closest('.achievement-card').querySelector('h3').textContent
    });
    
    // Add click event to open modal
    img.addEventListener('click', () => {
        openModal(index);
    });
});

// Open modal function
const openModal = (index) => {
    currentImageIndex = index;
    const imageData = imagesArray[index];
    
    modalImg.src = imageData.src;
    modalImg.alt = imageData.alt;
    modalCaption.textContent = imageData.caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close modal function
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

// Navigation functions
const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    openModal(currentImageIndex);
};

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    openModal(currentImageIndex);
};

// Event listeners for modal
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll('.skill-card, .timeline-item, .achievement-card, .goal-card');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNav);

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Welcome to my portfolio!', 'color: #f59e0b; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion by Zusive Pikelela', 'color: #e11d48; font-size: 14px;');
console.log('%cInterested in collaboration? Let\'s connect!', 'color: #3b82f6; font-size: 14px;');
