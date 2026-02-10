/* PORTFOLIO INTERACTION LOGIC
  Content is now managed directly in index.html to prevent overwriting.
  JS only handles filtering and UI effects.
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Project Filtering Logic ---
    const filters = document.querySelectorAll('.filterPill');
    const projects = document.querySelectorAll('.projectCard');

    filters.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button style
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get selected category from data-key
            const selectedCategory = button.getAttribute('data-key');
            
            projects.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                // Show project if 'all' or if category matches
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
        // Adds 'is-stuck' class for glass effect when scrolling > 8px
        if (header) {
            header.classList.toggle("is-stuck", window.scrollY > 8);
        }
    });
});

/* NOTE: 
  The old renderNav(), renderHero(), renderSkills(), and renderProjects() 
  are removed. Please make sure your index.html contains all the text 
  for these sections.
*/