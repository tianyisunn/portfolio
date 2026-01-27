const data = {
  footer: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/emma-sun-138798325" },
    phone: "+353 87 039 2996",
    email: "tianyi_sun0611@163.com"
  }
};

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function renderNavSimple() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;

  nav.innerHTML = `
    <a href="index.html#work">Work</a>
    <a href="index.html#contact">Contact</a>
  `;
}

function renderProject() {
  if (typeof PROJECTS === "undefined") {
    console.error("PROJECTS not found. Did you load projects-data.js before project.js?");
    return;
  }

  const id = getQueryParam("id") || "blossom";
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

  document.title = `${project.title} — Emma`;

  document.getElementById("projectCategory").textContent = project.category || "";
  document.getElementById("projectTitle").textContent = project.title || "";

  const factsEl = document.getElementById("projectFacts");
  factsEl.innerHTML = (project.facts || []).map(f => `
    <div class="factBlock">
      <div class="factLabel">${f.label || ""}</div>
      <div class="factValue">${f.value || ""}</div>
    </div>
  `).join("");

  const boardEl = document.getElementById("projectBoard");
  boardEl.innerHTML = (project.boards || []).map(b => {
    if (b.type === "image") {
      return `<img class="boardImg" src="${b.src}" alt="${b.alt || project.title || ""}">`;
    }
    return "";
  }).join("");

  const textEl = document.getElementById("projectText");
  textEl.innerHTML = (project.sections || []).map(s => `
    <div class="textBlock">
      <h2>${s.h || ""}</h2>
      <p>${s.p || ""}</p>
    </div>
  `).join("");
}

function renderFooter() {
  const linkedinLink = document.getElementById("linkedinLink");
  if (linkedinLink) {
    linkedinLink.textContent = data.footer.linkedin.label;
    linkedinLink.href = data.footer.linkedin.href;
  }

  const phoneText = document.getElementById("phoneText");
  if (phoneText) phoneText.textContent = data.footer.phone;

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.textContent = data.footer.email;
    emailLink.href = `mailto:${data.footer.email}`;
  }
}

// ✅ project page boot
renderNavSimple();
renderProject();
renderFooter();
