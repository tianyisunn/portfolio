(() => {
  const body = document.body;
  const selector = body.dataset.progressSelector;
  if (!selector) return;

  const sections = [...document.querySelectorAll(selector)].filter((section) => section.offsetParent !== null);
  if (!sections.length) return;

  const accent = body.dataset.progressAccent || '#2F80FF';
  const ink = body.dataset.progressInk || accent;
  const onAccent = body.dataset.progressOnAccent || '#FFFFFF';
  const labelSelector = body.dataset.progressLabelSelector || 'h2, h3, h1';
  const hex = accent.replace('#', '');
  const rgb = hex.length === 3
    ? hex.split('').map((value) => parseInt(value + value, 16))
    : [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16));

  const rail = document.createElement('aside');
  rail.className = `caseProgress${sections.length > 7 ? ' caseProgress--dense' : ''}`;
  rail.setAttribute('aria-label', 'Reading progress');
  rail.style.setProperty('--case-accent', accent);
  rail.style.setProperty('--case-accent-rgb', rgb.join(','));
  rail.style.setProperty('--case-ink', ink);
  rail.style.setProperty('--case-on-accent', onAccent);

  const nav = document.createElement('nav');
  nav.className = 'caseProgressNav';
  nav.setAttribute('aria-label', 'Project sections');
  nav.innerHTML = '<span class="caseProgressTrack" aria-hidden="true"><span class="caseProgressFill"></span></span>';

  const linksWrap = document.createElement('div');
  linksWrap.className = 'caseProgressLinks';

  const links = sections.map((section, index) => {
    if (!section.id) section.id = `project-section-${index + 1}`;
    section.classList.add('caseProgressSection');

    const labelSource = section.querySelector(labelSelector);
    const label = section.dataset.progressLabel || labelSource?.textContent?.trim() || `Section ${index + 1}`;
    const link = document.createElement('a');
    link.className = 'caseProgressLink';
    link.href = `#${section.id}`;
    link.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${label}`);
    const number = document.createElement('span');
    number.setAttribute('aria-hidden', 'true');
    number.textContent = String(index + 1).padStart(2, '0');
    const labelElement = document.createElement('strong');
    labelElement.className = 'caseProgressLabel';
    labelElement.textContent = label;
    link.append(number, labelElement);
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const nextUrl = `${window.location.pathname}${window.location.search}#${section.id}`;
      window.history.replaceState(window.history.state, '', nextUrl);
      section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
    linksWrap.appendChild(link);
    return link;
  });

  nav.appendChild(linksWrap);
  rail.appendChild(nav);
  body.appendChild(rail);

  const fill = rail.querySelector('.caseProgressFill');
  let ticking = false;

  const update = () => {
    const readingLine = window.innerHeight * 0.36;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) activeIndex = index;
    });

    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    if (atPageEnd) activeIndex = sections.length - 1;

    links.forEach((link, index) => {
      if (index === activeIndex) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });

    const firstTop = sections[0].getBoundingClientRect().top + window.scrollY;
    const lastRect = sections.at(-1).getBoundingClientRect();
    const lastBottom = lastRect.bottom + window.scrollY;
    const start = firstTop - readingLine;
    const end = lastBottom - window.innerHeight * .64;
    const amount = atPageEnd ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
    fill.style.transform = `scaleY(${amount})`;
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
