// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Smooth scrolling and active link highlighting
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update active link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// Update active link on scroll
function updateActiveLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
      currentSection = '#' + section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
}

// Animate elements when they come into view
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate-fade-in');
    }
  });
}

// Animate skill bars when they come into view
function animateSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                     (rect.bottom >= window.innerHeight * 0.2);
    
    if (isVisible && !card.classList.contains('in-view')) {
      card.classList.add('in-view');
      const skillLevel = card.querySelector('.skill-level');
      const width = skillLevel.style.width;
      skillLevel.style.setProperty('--skill-level', width);
      skillLevel.style.width = 'var(--skill-level)';
    }
  });
}

// Enhanced scroll-based animations
function initializeAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-slide-right, .animate-slide-up, .animate-scale'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = 'visible';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
    observer.observe(element);
  });
}

// Add this to your existing JavaScript
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }
});
// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initial animations
  animateOnScroll();
  animateSkillBars();
  initializeAnimations();
  
  // Set up scroll event listeners
  window.addEventListener('scroll', function() {
    updateActiveLink();
    animateOnScroll();
    animateSkillBars();
  });
});