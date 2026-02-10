/* Emma's Portfolio Interaction Logic
  Content is managed in index.html for better maintainability.
  This script handles: 1. Filter Buttons, 2. Sticky Header.
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Project Filtering ---
  const filters = document.querySelectorAll('.filterPill');
  const projects = document.querySelectorAll('.projectCard');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active class for buttons
      filters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Get category key from the clicked button
      const selectedCategory = button.getAttribute('data-key');
      
      projects.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        // Logic: Show if 'all' or if card's category matches the button
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 2. Header Sticky Effect ---
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