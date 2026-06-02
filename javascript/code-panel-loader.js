document.querySelectorAll("[data-code-src]").forEach(async (codeBlock) => {
  const source = codeBlock.dataset.codeSrc;
  if (!source) return;

  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Unable to load ${source}`);
    codeBlock.textContent = await response.text();
  } catch (error) {
    codeBlock.textContent = `Could not load code from ${source}`;
  }
});
