// Page Transition Controller with Loading Animation
function navigateWithTransition(url) {
  const transition = document.querySelector('.page-transition');
  const loaderText = transition.querySelector('.loader-text');
  
  // Fallback if transition element doesn't exist
  if (!transition) {
    window.location.href = url;
    return;
  }
  
  // Activate transition overlay
  transition.classList.add('active');
  
  // Optional: Update loading text
  if (loaderText) {
    loaderText.textContent = 'Credit Swiss...';
  }
  
  // Wait for animation to complete
  setTimeout(() => {
    // Small delay to ensure animation is visible
    setTimeout(() => {
      window.location.href = url;
      
      // Fallback in case redirect fails
      setTimeout(() => {
        if (window.location.href !== url) {
          transition.classList.remove('active');
        }
      }, 1000);
    }, 50);
  }, 500); // Matches the 0.5s CSS transition
}

// Enhanced link interception
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    // Skip links with no-transition class
    if (link.classList.contains('no-transition')) return;
    
    link.addEventListener('click', (e) => {
      // Skip special clicks (new tab, download, etc.)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      
      try {
        const url = new URL(link.href);
        
        // Only intercept same-origin navigation
        if (url.origin === window.location.origin) {
          e.preventDefault();
          
          // Skip for hash links (#anchor)
          if (url.pathname === window.location.pathname && url.hash) {
            window.location.href = link.href;
            return;
          }
          
          navigateWithTransition(link.href);
        }
      } catch (e) {
        // Invalid URL, let default behavior handle it
      }
    });
  });
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle FAQ question clicks
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle answer visibility
            answer.classList.toggle('active');
            
            // Rotate icon
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
            
            // Close other open answers if needed
            // faqQuestions.forEach(otherQuestion => {
            //     if (otherQuestion !== question) {
            //         otherQuestion.nextElementSibling.classList.remove('active');
            //         otherQuestion.querySelector('i').classList.add('fa-chevron-down');
            //         otherQuestion.querySelector('i').classList.remove('fa-chevron-up');
            //     }
            // });
        });
    });

    // Handle FAQ tab switching
    const faqTabs = document.querySelectorAll('.faq-tab');
    
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Remove active class from all tabs and categories
            faqTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.faq-category').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            tab.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });
});