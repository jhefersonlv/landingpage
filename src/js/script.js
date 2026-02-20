// ============================================
// ANIMATIONS ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.section-header, .problem-card, .solution-card, .benefit-item, .differential-card, .beta-card, .footer-logo'
  );

  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
  });

  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // BUTTON INTERACTIONS
  // ============================================

  const buttons = document.querySelectorAll('.cta-button, .beta-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  //Scroll

  // Whatsapp Group
  document.getElementById("betaBtn").addEventListener('click', function() {
    window.open("https://chat.whatsapp.com/C984xAvYh0l7PQXuPmHbwd?mode=gi_t", "_blank");
  });

  // Add ripple styles
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .cta-button, .beta-button {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);


  // ============================================
  // CARD HOVER EFFECTS
  // ============================================

  const cards = document.querySelectorAll('.problem-card, .solution-card, .benefit-item, .differential-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease-out';
    });
  });

  // ============================================
  // IMAGE LAZY LOADING WITH FALLBACK
  // ============================================

  const images = document.querySelectorAll('img[onerror]');
  
  images.forEach(img => {
    // Store original src
    if (!img.dataset.originalSrc) {
      img.dataset.originalSrc = img.src;
    }
    
    // Add error handler
    img.addEventListener('error', function() {
      if (this.src !== this.dataset.fallbackSrc) {
        this.dataset.fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
        this.src = this.dataset.fallbackSrc;
      }
    });
  });

  // ============================================
  // MOBILE MENU (if needed in future)
  // ============================================

  // Placeholder for future mobile menu functionality

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
  }, 10);

  window.addEventListener('scroll', optimizedScrollHandler);

  // ============================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================

  // Add keyboard navigation for buttons
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // ============================================
  // CONSOLE MESSAGE
  // ============================================

  console.log('%cWordVirtua Soluções Web', 'color: #223B71; font-size: 20px; font-weight: bold;');
  console.log('%cLanding Page - Sistema em Desenvolvimento', 'color: #585B5C; font-size: 12px;');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Export functions for potential external use
window.WordVirtuaUtils = {
  scrollToElement,
  isInViewport
};

