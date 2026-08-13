(() => {
  const backToWork = document.createElement('a');
  const inHtmlFolder = window.location.pathname.includes('/html/');
  backToWork.className = 'backToWork';
  backToWork.href = `${inHtmlFolder ? '../' : ''}index.html#projectsPanel`;
  backToWork.setAttribute('aria-label', 'Back to selected work');
  backToWork.textContent = '← Work';
  document.body.appendChild(backToWork);
})();
