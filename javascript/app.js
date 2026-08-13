/* 
  This script handles: 1. Filter Buttons, 2. Sticky Header.
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Project Filtering (Filter Buttons) ---
  const filters = document.querySelectorAll('.filterPill');
  const projects = document.querySelectorAll('.projectCard');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active class for buttons
      filters.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      // Get category key from the clicked button
      const selectedCategory = button.getAttribute('data-key');
      
      projects.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        // Logic: Show if 'all' or if card's category matches the button
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
    });
  });

  // --- 2. Scroll Reveal Animation ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // 只触发一次
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- 3. Header Sticky Effect ---
  const header = document.querySelector(".top");
  window.addEventListener("scroll", () => {
    if (header) {
      // Adds glass effect class when scrolled more than 8px
      header.classList.toggle("is-stuck", window.scrollY > 8);
    }
  });

});

/* Note: renderProjects() and other data-rendering functions are removed 
  to prevent overwriting your custom HTML text. 
*/
