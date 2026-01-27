const data = {
  nav: [
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    titleTop: "I turn ideas into clear, usable",
    titleBlue: "digital experiences.",
    intro:
      `I design and prototype interactive experiences — combining
      <span class="blue">UX thinking</span>, <span class="blue">visual design</span>, and
      <span class="blue">front-end implementation</span> to make content intuitive and engaging.
      Currently pursuing an M.Sc. at Trinity College Dublin.`,
    imageSrc: "./portrait.jpg" // 你换成自己的照片路径
  },
  skills: {
    tag: "What I do",
    title: "Expertise & Skills",
    desc:
      `I am fascinated by <b>user psychology</b> and how human behavior shapes digital interactions.
      My design philosophy centers on creating intuitive, inclusive, and aesthetically grounded solutions.
      I believe in <span class="quote">"Design to create a better world"</span>, where technology serves as a bridge, not a barrier.
      By blending research-driven <b>UX thinking</b> with high-fidelity <b>3D visualization</b>, I strive to build experiences that are not only functional but emotionally resonant.`,
    cards: [
      {
        title: "Digital Experience & UX",
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
  footer: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/" }, // 换成你的
    phone: "+353 87 039 2996",
    email: "tianyi_sun0611@163.com"
  }
};

function renderNav() {
  const nav = document.getElementById("navLinks");
  nav.innerHTML = data.nav
    .map(item => `<a href="${item.href}">${item.label}</a>`)
    .join("");
}

function renderApp() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <section class="container">
      <h1 class="heroTitle">
        ${data.hero.titleTop}<br/>
        <span class="blue">${data.hero.titleBlue}</span>
      </h1>

      <div class="introCard" id="work">
        <div class="introText">
          ${data.hero.intro}
        </div>

        <div class="portrait" aria-label="Portrait">
          <img src="${data.hero.imageSrc}" alt="Portrait"/>
        </div>
      </div>

      <div class="sectionPanel">
        <span class="sectionTag">${data.skills.tag}</span>
        <h2 class="sectionTitle">${data.skills.title}</h2>
        <p class="sectionDesc">${data.skills.desc}</p>

        <div class="skillGrid">
          ${data.skills.cards.map(card => `
            <div class="skillCard">
              <h3>${card.title}</h3>
              <p>${card.text}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}



function linkedinIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM6.813 20.452H3.86V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
    </svg>
  `;
}
function phoneIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.25 1.01l-2.2 2.19z"/>
    </svg>
  `;
}
function mailIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  `;
}

// Boot
renderNav();
renderApp();
renderFooter();
