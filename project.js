// project.js

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

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ✅ FIX: imgStyle is defined (your error)
function imgStyle(maxWidth) {
  if (!maxWidth) return "";
  const n = Number(maxWidth);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `style="max-width:${n}px"`;
}

function renderSectionBlock(s, fallbackTitle = "") {
  const type = s.type || "text";

  if (type === "text") {
    const h = escapeHtml(s.h || "");
    const p = escapeHtml(s.p || "").replaceAll("\n", "<br/>");
    return `
      <section class="nBlock nText">
        ${h ? `<h2>${h}</h2>` : ""}
        ${p ? `<p>${p}</p>` : ""}
      </section>
    `;
  }

  if (type === "image") {
    return `
      <section class="nBlock nImage">
        ${s.h ? `<h2>${escapeHtml(s.h)}</h2>` : ""}
        <figure class="nFigure">
          <img
            src="${s.src}"
            alt="${escapeHtml(s.alt || fallbackTitle)}"
            loading="lazy"
            data-zoom="1"
            ${imgStyle(s.maxWidth)}
          />
          ${s.cap ? `<figcaption>${escapeHtml(s.cap)}</figcaption>` : ""}
        </figure>
      </section>
    `;
  }

  if (type === "gallery") {
    const items = (s.items || []).map(it => `
      <figure class="nFigure">
        <img
          src="${it.src}"
          alt="${escapeHtml(it.alt || fallbackTitle)}"
          loading="lazy"
          data-zoom="1"
          ${imgStyle(it.maxWidth)}
        />
        ${it.cap ? `<figcaption>${escapeHtml(it.cap)}</figcaption>` : ""}
      </figure>
    `).join("");

    return `
      <section class="nBlock nGallery">
        ${s.h ? `<h2>${escapeHtml(s.h)}</h2>` : ""}
        <div class="nGrid">
          ${items}
        </div>
      </section>
    `;
  }

  if (type === "compare") {
    const L = s.left || {};
    const R = s.right || {};
    return `
      <section class="nBlock nCompare">
        ${s.h ? `<h2>${escapeHtml(s.h)}</h2>` : ""}
        <div class="nCompareGrid">
          <div class="nCompareCol">
            <div class="nMiniTitle">${escapeHtml(L.title || "Version A")}</div>
            <figure class="nFigure">
              <img
                src="${L.src}"
                alt="${escapeHtml(L.alt || fallbackTitle)}"
                loading="lazy"
                data-zoom="1"
                ${imgStyle(L.maxWidth)}
              />
              ${L.cap ? `<figcaption>${escapeHtml(L.cap)}</figcaption>` : ""}
            </figure>
          </div>

          <div class="nCompareCol">
            <div class="nMiniTitle">${escapeHtml(R.title || "Version B")}</div>
            <figure class="nFigure">
              <img
                src="${R.src}"
                alt="${escapeHtml(R.alt || fallbackTitle)}"
                loading="lazy"
                data-zoom="1"
                ${imgStyle(R.maxWidth)}
              />
              ${R.cap ? `<figcaption>${escapeHtml(R.cap)}</figcaption>` : ""}
            </figure>
          </div>
        </div>
      </section>
    `;
  }

  return "";
}

function renderProject() {
  if (typeof PROJECTS === "undefined") {
    console.error("PROJECTS not found. Did you load projects-data.js before project.js?");
    return;
  }

  const id = (getQueryParam("id") || "blossom").toLowerCase();
  const project = PROJECTS.find(p => String(p.id).toLowerCase() === id);

  if (!project) {
    document.body.innerHTML = `<pre>Project not found: ${escapeHtml(id)}</pre>`;
    throw new Error(`Project not found: ${id}`);
  }

  document.body.dataset.layout = project.layout || "default";
  document.title = `${project.title} — Emma`;

  const categoryEl = document.getElementById("projectCategory");
  const titleEl = document.getElementById("projectTitle");
  if (categoryEl) categoryEl.textContent = project.category || "";
  if (titleEl) titleEl.textContent = project.title || "";

  // ✅ cover image under title for narrative projects (Sunday "小花" / Rosetta cover)
  if ((project.layout || "") === "narrative" && titleEl) {
    const cover = (project.boards || []).find(b => b.role === "cover" && b.type === "image");
    const old = document.querySelector(".titleMark");
    if (old) old.remove();

    if (cover) {
      const img = document.createElement("img");
      img.src = cover.src;
      img.alt = cover.alt || "Cover mark";
      img.className = "titleMark";
      img.loading = "lazy";
      img.setAttribute("data-zoom", "1");

      // apply maxWidth if present
      if (cover.maxWidth) img.style.maxWidth = `${Number(cover.maxWidth)}px`;

      titleEl.insertAdjacentElement("afterend", img);
    }
  }

  // facts
  const factsEl = document.getElementById("projectFacts");
  if (factsEl) {
    factsEl.innerHTML = (project.facts || []).map(f => `
      <div class="factBlock">
        <div class="factLabel">${escapeHtml(f.label || "")}</div>
        <div class="factValue">${escapeHtml(f.value || "")}</div>
      </div>
    `).join("");
  }

  // boards (skip cover when narrative because we already put it under title)
  const boardEl = document.getElementById("projectBoard");
  if (boardEl) {
    boardEl.innerHTML = (project.boards || []).map(b => {
      if ((project.layout || "") === "narrative" && b.role === "cover") return "";

      if (b.type === "image") {
        const roleClass = b.role ? `board board--${b.role}` : "board";
        const wrapStyle = b.maxWidth ? `style="max-width:${Number(b.maxWidth)}px"` : "";
        return `
          <div class="${roleClass}" ${wrapStyle}>
            <img
              class="boardImg"
              src="${b.src}"
              alt="${escapeHtml(b.alt || project.title || "")}"
              loading="lazy"
              data-zoom="1"
            />
          </div>
        `;
      }
      return "";
    }).join("");
  }

  // sections
  const textEl = document.getElementById("projectText");
  if (textEl) {
    const sections = project.sections || [];

    if ((project.layout || "") === "narrative") {
      textEl.innerHTML = `
        <div class="nWrap">
          ${sections.map(s => renderSectionBlock(s, project.title)).join("")}
        </div>
      `;
    } else {
      textEl.innerHTML = sections.map(s => `
        <div class="textBlock">
          <h2>${escapeHtml(s.h || "")}</h2>
          <p>${escapeHtml(s.p || "")}</p>
        </div>
      `).join("");
    }
  }
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

// ===== Lightbox =====
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbClose = document.getElementById("lightboxClose");

function openLightbox(src, alt = "") {
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt;
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lb || !lbImg) return;
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

if (lb) {
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
}
if (lbClose) lbClose.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ✅ click any img[data-zoom="1"] to open (titleMark/boards/gallery/compare all supported)
document.addEventListener("click", (e) => {
  const img = e.target.closest('img[data-zoom="1"]');
  if (!img) return;
  openLightbox(img.src, img.alt || "");
});

// Boot
renderNavSimple();
renderProject();
renderFooter();
