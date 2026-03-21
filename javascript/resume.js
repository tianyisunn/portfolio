// ===== DATA (keep it simple) =====
const data = {
  nav: [
    { label: "Work", href: "index.html#work" },
    { label: "Contact", href: "index.html#contact" }
  ],
  footer: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/emma-sun-138798325" },
    phone: "+353 87 039 2996",
    email: "tianyi_sun0611@163.com"
  },
  resume: {
    metaLine: "Dublin, Ireland • tianyi_sun0611@163.com • (+353) 87 039 2996",
    sections: [
      {
        h: "Summary",
        p:
          "Interactive Digital Media MSc student at Trinity College Dublin. Product Design foundation with a focus on UX research and interaction design. Skilled in planning, prototyping (HTML/CSS/JavaScript), quick usability checks, and evidence-based iteration to improve user flows and content clarity."
      },
      {
        h: "Education",
        items: [
          {
            title: "M.Sc. Interactive Digital Media — Trinity College Dublin",
            meta: "2025–2026 (Expected)"
          },
          {
            title: "B.A. Product Design (Furniture & Interior) — Sichuan Agricultural University",
            meta: "2021–2025 • GPA 87.9 (Top 10%)"
          }
        ]
      },
      {
        h: "Experience",
        items: [
          {
            title: "Trinity College Dublin — MSc Interactive Digital Media (Coursework Projects)",
            meta: "2025–Present",
            bullets: [
              "Produced multimedia deliverables (video, web, audio) with clear narratives and consistent presentation.",
              "Built an interactive project webpage with HTML/CSS/JavaScript to present outcomes and media assets in a structured format.",
              "Ran quick usability checks with peers and iterated IA + UI clarity based on feedback.",
              "Collaborated in a 3-person cross-disciplinary team to coordinate assets and integrate visual/sound/web components."
            ]
          },
          {
            title: "Self-initiated Multimedia Project — Content Producer",
            meta: "2021–Present",
            bullets: [
              "Built and managed bilingual short-form video channel from 0 → 10K views within 2 weeks.",
              "Produced 50+ videos; single-post peak views 300K+ with 70K engagements.",
              "Improved retention by 20% by iterating hooks and pacing based on CTR + watch-time insights.",
              "Tools: Premiere Pro, After Effects, Audacity, Canva, Excel."
            ]
          },
          {
            title: "Sichuan Agricultural University Student Union — Design Team Member",
            meta: "2021–2022",
            bullets: [
              "Delivered event visual assets aligned with brand guidelines across multiple campaigns.",
              "Produced 300+ printed signage/tags for campus use with consistent, accurate delivery."
            ]
          }
        ]
      },
      {
        h: "Selected Work",
        items: [
          {
            title: "Personal Website for Content Publishing",
            meta: "Nov 2025",
            bullets: [
              "Structured projects as data (JSON) to enable filtering, reuse, and rapid updates.",
              "Improved discoverability via IA, client-side filtering, and persistent preferences (localStorage).",
              "Balanced usability, performance, and maintainability in HTML/CSS/JS implementation.",
              "Refined labels, hierarchy, and interaction patterns based on peer feedback."
            ]
          },
          {
            title: "Smart Home Interaction System Design Project",
            meta: "Sep 2024",
            bullets: [
              "Developed persona for urban solo dwellers and synthesized pain points in smart home ecosystems.",
              "Streamlined IA into four modules to reduce cognitive load.",
              "Designed one-touch scenario modes (Away/Sleep/Entertainment) for synchronized settings.",
              "Created minimalist UI with clear feedback for real-time control."
            ]
          },
          {
            title: "UPenn Summer Program — Project Website",
            meta: "Aug 2024",
            bullets: [
              "Designed a structured project page with clean navigation and content hierarchy for clear communication."
            ]
          },
          {
            title: "Van Gogh “Almond Blossoms” Inspired Furniture Collection (Graduation Project)",
            meta: "Jan 2025",
            bullets: [
              "Designed modern-minimal furniture set translated into a consistent form + CMF system.",
              "Delivered sketches, CAD drawings, 3D models, and interior-scene renders for exhibition.",
              "Tools: Procreate, AutoCAD, 3ds Max, Blender."
            ]
          }
        ]
      },
      {
        h: "Skills",
        columns: [
          {
            title: "UX / Research",
            chips: ["Figma", "FigJam", "Wireframing", "Prototyping", "IA", "Usability Testing", "User Interviews", "Research Synthesis", "Accessibility"]
          },
          {
            title: "Prototyping & Visual",
            chips: ["Webflow", "Adobe CC", "Blender", "3ds Max", "AutoCAD", "Photoshop", "Illustrator", "Canva", "Procreate"]
          },
          {
            title: "Web / Tech",
            chips: ["HTML", "CSS", "JavaScript", "APIs", "Arduino IDE", "Wiring & Serial", "Sensors"]
          },
          {
            title: "Media & Audio",
            chips: ["Premiere Pro", "After Effects", "Audacity", "Reaper", "CapCut"]
          },
          {
            title: "AI Tools",
            chips: ["ChatGPT", "Gemini", "Figma AI", "Midjourney", "Adobe Firefly", "ComfyUI"]
          }
        ]
      }
    ]
  }
};

// ===== RENDER =====
function renderNav() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.innerHTML = data.nav.map(item => `<a href="${item.href}">${item.label}</a>`).join("");
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

function el(tag, cls, html) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderResume() {
  const meta = document.getElementById("resumeMeta");
  if (meta) meta.textContent = data.resume.metaLine;

  const root = document.getElementById("resumeContent");
  if (!root) return;

  data.resume.sections.forEach(section => {
    const block = el("section", "resumeSection");
    block.appendChild(el("h2", "resumeH2", section.h));

    if (section.p) {
      block.appendChild(el("p", "resumeP", section.p));
    }

    if (section.items) {
      const list = el("div", "resumeList");
      section.items.forEach(item => {
        const row = el("div", "resumeItem");
        row.appendChild(el("div", "resumeItemTitle", item.title));
        if (item.meta) row.appendChild(el("div", "resumeItemMeta", item.meta));

        if (item.bullets?.length) {
          const ul = el("ul", "resumeBullets");
          item.bullets.forEach(b => ul.appendChild(el("li", "", b)));
          row.appendChild(ul);
        }
        list.appendChild(row);
      });
      block.appendChild(list);
    }

    if (section.columns) {
      const grid = el("div", "resumeSkillGrid");
      section.columns.forEach(col => {
        const card = el("div", "resumeSkillCard");
        card.appendChild(el("div", "resumeSkillTitle", col.title));
        const chips = el("div", "resumeChips");
        col.chips.forEach(c => chips.appendChild(el("span", "resumeChip", c)));
        card.appendChild(chips);
        grid.appendChild(card);
      });
      block.appendChild(grid);
    }

    root.appendChild(block);
  });
}

// Sticky effect (same as your home)
const header = document.querySelector(".top");
window.addEventListener("scroll", () => {
  header?.classList.toggle("is-stuck", window.scrollY > 8);
});

// Boot
renderNav();
renderResume();
renderFooter();
