const data = {
  nav: [
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    titleTop: "I turn ideas into clear, usable",
    titleBlue: "digital experiences.",
    intro: `I design and prototype interactive experiences — combining
      <span class="blue">UX thinking</span>, <span class="blue">visual design</span>, and
      <span class="blue">front-end implementation</span> to make content intuitive and engaging.
      Currently pursuing an M.Sc. at Trinity College Dublin.`
  },
  skills: {
    tag: "What I do",
    title: "Expertise & Skills",
    desc: `I am fascinated by <b>user psychology</b> and how human behavior shapes digital interactions.
      My design philosophy centers on creating intuitive, inclusive, and aesthetically grounded solutions.
      I believe in <span class="quote">"Design to create a better world"</span>, where technology serves as a bridge, not a barrier.
      By blending research-driven <b>UX thinking</b> with high-fidelity <b>3D visualization</b>, I strive to build experiences that are not only functional but emotionally resonant.`,
    cards: [
      {
        title: "Interaction & UX",
        text: "Crafting seamless digital interfaces through user research, wireframing, and prototyping for intelligent, accessible systems."
      },
      {
        title: "3D & Spatial",
        text: "Creating high-fidelity 3D assets and spatial layouts using 3ds Max/Blender with professional CAD documentation."
      },
      {
        title: "Visual Narratives",
        text: "Crafting high-quality print, posters, and graphic layouts with strong hand-drawing and visual storytelling skills."
      }
    ]
  },
//Add the new projects here!!
 projects:{
  title: "Selected Projects",
  filters: [
  { key: "all", label: "All" },
  { key: "Interaction & UX Design", label: "Interaction & UX Design" },
  { key: "Product & Interior Design", label: "Product & Interior Design" },
  { key: "Visual Narratives", label: "Visual Narratives" }
],

  items: [
    {
      category: "Interaction & UX Design",
      title: "Looping Narrative (Twine)",
      desc: "Branching story with variable-driven loops and aesthetic customization.",
      tags: ["Twine", "Narrative", "Interaction"],
      img: "https://picsum.photos/800/500?random=11",
      href: "#"
    },
    {
      category: "Product & Interior Design",
      title: "MODU",
      id: "block",
      desc: "Camera movement + lighting tests with optimized render pipeline.",
      tags: ["Furniture", "3D", "Interior"],
      img: "./media/thumbnail-block.png",
      href: "project.html?id=block"
    },
    {
      category: "Product & Interior Design",
      title: "Blossom",
      id: "blossom",
      desc: "Camera movement + lighting tests with optimized render pipeline.",
      tags: ["Furniture", "3D", "Interior"],
      img: "./media/thumbnail-blossom.png",
      href: "project.html?id=blossom"
    },
    {
      category: "Product & Interior Design",
      title: "UP - A Library for Children",
      id: "library",
      desc: "Camera movement + lighting tests with optimized render pipeline.",
      tags: ["Furniture", "3D", "Interior"],
      img: "./media/thumbnail-up.png",
      href: "project.html?id=library"
    },
    {
      category: "Visual Narratives",
      title: "Poster Series",
      desc: "Graphic layout exploration with strong typographic hierarchy.",
      tags: ["Visual", "Print", "Layout"],
      img: "https://picsum.photos/800/500?random=14",
      href: "#"
    },
    {
      category: "Product & Interior Design",
      title: "Children's Modular Seating Design",
      desc: "Graphic layout exploration with strong typographic hierarchy.",
      tags: ["Visual", "Print", "Layout"],
      img: "./media/thumbnail-kidchair.png",
      href: "project.html?id=kidchair"
    }
  ],
  viewAllHref: "#"
},

  footer: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/emma-sun-138798325" },
    phone: "+353 87 039 2996",
    email: "tianyi_sun0611@163.com"
  }
};

function renderNav() {
  const nav = document.getElementById("navLinks");
  nav.innerHTML = data.nav.map(item => `<a href="${item.href}">${item.label}</a>`).join("");
}

function renderHero() {
  document.getElementById("heroTop").textContent = data.hero.titleTop;
  document.getElementById("heroBlue").textContent = data.hero.titleBlue;
  document.getElementById("heroIntro").innerHTML = data.hero.intro;
}

function renderSkills() {
  document.getElementById("skillsTag").textContent = data.skills.tag;
  document.getElementById("skillsTitle").textContent = data.skills.title;
  document.getElementById("skillsDesc").innerHTML = data.skills.desc;

  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = data.skills.cards.map(card => `
    <div class="skillCard">
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </div>
  `).join("");
}
function renderProjects() {
  const container = document.getElementById("projectsMount");
  if (!container) return;

  container.innerHTML = `
    <div class="projectsBlock" id="projects">
      <div class="projectsTop">
        <h3 class="projectsTitle">${data.projects.title}</h3>
      </div>

      <div class="projectsFilters" id="projectsFilters"></div>
      <div class="projectsGrid" id="projectsGrid"></div>
    </div>
  `;

  const filtersEl = document.getElementById("projectsFilters");
  filtersEl.innerHTML = data.projects.filters
    .map((f, idx) => `<button class="filterPill ${idx===0 ? "active" : ""}" data-key="${f.key}">${f.label}</button>`)
    .join("");

  function paint(key) {
    const grid = document.getElementById("projectsGrid");
    const items = (key === "all")
      ? data.projects.items
      : data.projects.items.filter(p => p.category === key);

    grid.innerHTML = items.map(p => `
      <article class="projectCard" data-id="${p.id || p.title}">

        <div class="projectImg">
          <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="projectBody">
          <h4 class="projectName">${p.title}</h4>
          <p class="projectDesc">${p.desc}</p>

          <div class="projectTags">
            ${p.tags.map(t => `<span class="tagChip">${t}</span>`).join("")}
          </div>

          <a class="projectLink" href="${p.href}">
            View project <span class="arrow">↗</span>
          </a>
        </div>
      </article>
    `).join("");
  }

  paint("all");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filterPill");
    if (!btn) return;
    document.querySelectorAll(".filterPill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    paint(btn.dataset.key);
  });

  const gridEl = document.getElementById("projectsGrid");

gridEl.addEventListener("click", (e) => {
  const card = e.target.closest(".projectCard");
  if (!card) return;

  document.querySelectorAll(".projectCard").forEach(c => c.classList.remove("is-active"));
  card.classList.add("is-active");
});

}


function renderFooter() {
  const linkedinLink = document.getElementById("linkedinLink");
  linkedinLink.textContent = data.footer.linkedin.label;
  linkedinLink.href = data.footer.linkedin.href;

  document.getElementById("phoneText").textContent = data.footer.phone;

  const emailLink = document.getElementById("emailLink");
  emailLink.textContent = data.footer.email;
  emailLink.href = `mailto:${data.footer.email}`;
}

// Boot
renderNav();
renderHero();
renderSkills();
renderProjects();
renderFooter();


// 👇👇👇【就在这里加！！】👇👇👇
const header = document.querySelector(".top");

window.addEventListener("scroll", () => {
  header.classList.toggle("is-stuck", window.scrollY > 8);
});


