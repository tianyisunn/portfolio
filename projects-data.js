const PROJECTS = [
  {
    id: "blossom",
    category: "Product Design",
    title: "Blossom",
    facts: [
      { label: "Tools", value: "Procreate, Blender, 3ds Max, Illustrator, CAD" },
      { label: "Role", value: "Designer" },
      { label: "Year", value: "2025" },
      { label: "Description", value: "2024" }
    ],
    boards: [
      // 长展板
      { type: "image", src: "./media/blossom.jpg", alt: "Blossom board" }
    ],
    
  },

  // 你再加第二个项目就复制一份改 id/title/图
  {
    id: "library",
    category: "Interior Design",
    title: "UP - A Library for Children",
    facts: [
      { label: "Tools", value: "3ds Max, CAD, Photoshop" },
      { label: "Role", value: "Interior Designer" },
      { label: "Year", value: "2024" },
      { label: "Description", value: "2024" }
    ],
    boards: [
      { type: "image", src: "./media/library.jpg", alt: "Library board" }
    ],
    sections: [
  
      { h: "Problem", p: "What problem you solved." },
      { h: "Process", p: "Key steps and decisions." },
      { h: "Outcome", p: "Final outcome and results." }
    
    ]
  },
  {
    id: "kidchair",
    category: "Product Design",
    title: "Children's Modular Seating Design",
    facts: [
      { label: "Tools", value: "3ds Max, CAD, Photoshop" },
      { label: "Role", value: "Interior Designer" },
      { label: "Year", value: "2024" },
      { label: "Description", value: "2024" }
    ],
    boards: [
      { type: "image", src: "./media/kidchair.jpg", alt: "Chair board" }
    ],
    sections: [
      
      { h: "Overview", p: "Short overview text goes here." },
      { h: "Problem", p: "What problem you solved." },
      { h: "Process", p: "Key steps and decisions." },
      { h: "Outcome", p: "Final outcome and results." }
    
    ]
  },
  {
    id: "block",
    category: "Product Design",
    title: 
    "  MODUCATE: Modular learning system for children.",
    facts: [
      { label: "Tools", value: "3ds Max, Blender, Procreate, CAD, Photoshop" },
      { label: "Role", value: "3D Modelling" },
      { label: "Year", value: "2023" },
      { label: "Description", value: "Modular + Educate = MODUCATE," }
    ],
    boards: [
      { type: "image", src: "./media/block.jpg", alt: "Modular system board" }
    ],
    sections: [
      
      { h: "Overview", p: "Short overview text goes here." },
      { h: "Problem", p: "What problem you solved." },
      { h: "Process", p: "Key steps and decisions." },
      { h: "Outcome", p: "Final outcome and results." }
    
    ]
  },
  {
  id: "sunday",
  category: "Interactive Design",
  title: "Sunday",
  layout: "narrative",
  facts: [
    { label: "Tools", value: "Twine, JavaScript, HTML/CSS" },
    { label: "Role", value: "Interactive Designer, Narrative Designer" },
    { label: "Year", value: "2026" }
  ],

  // 这个作业没展板，所以 boards 可以留空或放一张封面
  boards: [
    { type: "image", src: "./media/passages.png", alt: "Cover of Sunday", role: "cover", maxWidth: 600}
  ],

  // ✅ 新闻式图文排版从这里开始
  sections: [
  {
    type: "text",
    h: "Overview",
    p:
`This is a looping interactive story about a 12-year-old girl who does not speak English well.
She has been sent far from her hometown to an English-speaking summer camp, where she struggles to express herself and connect with others.

The player experiences her final day at the camp—Sunday—repeatedly.
Rather than focusing on performance or fluency, the story centers on emotional presence, self-acceptance, and the quiet process of letting go.`
  },

  {
    type: "gallery",
    h: "Key Screens",
    items: [
      {
        src: "./media/entry.png",
        alt: "Entry screen",
        cap: "Entry screen — establishes tone, isolation, and emotional distance."
      },
      {
        src: "./media/branch.png",
        alt: "Narrative structure map",
        cap: "Structure map — multiple branches fold back into a single recurring day."
      }
    ]
  },

  {
    type: "text",
    h: "Narrative Structure — Why a Loop?",
    p:
`The looping structure functions as a metaphor for social anxiety and emotional paralysis.
Sunday repeats not as a physical event, but as a mental state of being stuck—where self-judgment prevents emotional movement.

Progression is not driven by external plot changes, but by subtle internal shifts.
The static environment allows even the smallest changes in perception—such as how a moment is described—to become emotionally meaningful.`
  },

  {
    type: "text",
    h: "Loop Exit Mechanism",
    p:
`Exiting the loop is governed by an invisible point-based system that tracks emotional openness rather than success or failure.
Points are accumulated through small, everyday choices such as pausing, observing, remaining present, or choosing reflection over avoidance.

The loop does not end because the player makes a single correct decision.
Instead, it ends when emotional readiness quietly reaches a threshold, reframing progress as an internal process rather than a goal-oriented task.`
  },

  {
    type: "image",
    h: "Shifting Emotional Climax Across Loops",
    src: "./media/climax.jpg",
    alt: "Different emotional climaxes across loops",
    cap:
"Although the environment remains the same, emotional tension shifts across playthroughs as awareness increases."
  },

  {
    type: "text",
    p:
`In the first playthrough, the conversation with Bob functions as the emotional climax.
It provides a clear explanation for the protagonist’s discomfort, revealing how linguistic and cultural misunderstanding leads to withdrawal.

In subsequent loops, this confrontation loses intensity.
Once the player anticipates the encounter, emotional tension shifts earlier—to the moment the loop itself is recognized.
Repetition replaces uncertainty, creating a deeper, quieter form of unease rooted in awareness rather than conflict.`
  },

  {
    type: "compare",
    h: "Same Moment, Different Meaning",
    left: {
      title: "Loop 1 — Before Awareness",
      src: "./media/sunset-loop1.png",
      alt: "Sunset scene, first loop",
      cap: "A calm, surface-level reading — the day still feels ordinary."
    },
    right: {
      title: "Loop 2 — After Awareness",
      src: "./media/sunset-loop2.png",
      alt: "Sunset scene, later loop",
      cap: "The same scene becomes heavier — meaning shifts through awareness."
    }
  },

  {
    type: "text",
    h: "Perspective — Why Second Person?",
    p:
`The use of second-person narration (“you”) removes distance between the player and the protagonist. The player does not observe anxiety from the outside, but inhabits it—sharing hesitation, shame, and relief moment by moment.

This perspective prioritizes emotional fluctuation over plot progression, allowing acceptance to feel personal rather than observed.`
  },

  {
    type: "text",
    h: "Language as Emotional Feedback",
    p:
`Language complexity functions as emotional feedback rather than reward. In low-resolve states, sentences are shorter and vocabulary remains simple, reflecting restraint and self-protection.

As emotional openness increases, the same scenes shift linguistically. Sentences become longer, more fluid, and descriptive, suggesting internal freedom rather than improved language skill.

The sunset scene serves as an emotional release regardless of score— a moment of calm that exists outside success or failure.`
  },

  {
    type: "text",
    h: "Core Theme",
    p:
`The protagonist's struggle is not poor English, but the self-judgment that emerges from it.
Rather than overcoming this flaw through performance, the narrative resolves through acceptance.

The player does not “win” by speaking correctly, but by choosing to stop judging themselves. In this story, acceptance becomes the true form of progress.`
  }

    

  ]
},

    {
  id: "rosetta",
  category: "Visual Computing & Graphic Design",
  title: "Rosetta Stone Rebrand",
  layout: "narrative",
  facts: [
    { label: "Module", value: "CS7029 — Visual Computing and Design" },
    { label: "Role", value: "Brand / Visual Designer (Group Project)" },
    { label: "Team", value: "Emma Tianyi Sun, Amna Seth, Kayla Byrnes, Ellie Beyhaghi, Anna Luczynski" },
    { label: "Year", value: "2025" }
  ],
  boards: [
    {
      type: "image",
      src: "./media/rosetta/thumbnail-rosetta.png",
      alt: "Rosetta Rebrand cover",
      role: "cover"
    }
  ],
  sections: [
    {
      type: "text",
      h: "Overview",
      p:
      `A full rebrand concept for Rosetta Stone, repositioning the brand as a premium, mastery-focused language platform for serious learners. The system prioritizes clarity, credibility, and cross-platform consistency — designed to compete in a crowded digital learning market without copying gamified competitors.`
    },

    {
      type: "text",
      h: "Research",
      p:
`We used a Design Thinking framework to guide research and decisions.
• Rosetta Stone evolved from CD-ROM to cloud/mobile, but the brand identity didn’t keep pace with its digital transformation.
• Competitors (e.g., Duolingo, Babbel) signal modern UX with fast, distinctive identities.
• Rosetta’s advantage is immersive, long-term learning and higher retention — so the brand should look serious and credible, not playful.
This led us to a contemporary, minimal system designed for “serious learning, lasting fluency.”`
    },
{
  type: "gallery",
  h: "Rebranding Timeline",
  items: [
    { src: "./media/rosetta/timeline-1992-2007.png", alt: "Rosetta Stone logo 1992-2007", cap: "1992–2007 — early identity with globe metaphor." },
    { src: "./media/rosetta/timeline-2007-2012.png", alt: "Rosetta Stone logo 2007-2012", cap: "2007–2012 — shift toward a stone icon and brighter palette." },
    { src: "./media/rosetta/timeline-2012-now.png", alt: "Rosetta Stone logo 2012-now", cap: "2012–now — 3D stone mark paired with wordmark." }
  ]
},
{
  type: "text",
  h: "Moodboard & Visual Direction",
  p: 
`Before finalising the logo design, we developed a moodboard to define the emotional and visual direction of the rebrand.
The goal was to move Rosetta Stone away from playful or gamified language-learning aesthetics and toward a more serious, mastery-focused identity.

The moodboard emphasises qualities such as:
• focus and discipline
• depth and long-term commitment
• cultural richness
• calm confidence and trust

These visual cues informed our decisions around typography, colour palette, and overall brand tone, ensuring consistency across digital and physical touchpoints.`
},
{
  type: "image",
  src: "./media/rosetta/moodboard.png",
  alt: "Rosetta Stone rebrand moodboard",
  cap: "Moodboard defining the emotional tone and visual language of the rebrand.",
  maxWidth: 1000
},

    {
  type: "text",
  h: "Logo Rationale",
  p:
`Rosetta Stone's logo has evolved several times—from a globe, to a 2D stone, and later a 3D stone. This history matters, but our research showed the current mark creates visual repetition: “Rosetta Stone” followed by a literal stone, effectively “Rosetta Stone — Stone.”

We also found that many users today don't strongly associate the brand with the historical Rosetta Stone artifact. In a market where competitors signal modern UX instantly (e.g., Duolingo's playful identity and Babbel's structured clarity), the stone metaphor risks reading as old-fashioned rather than credible.

Because Rosetta Stone's real strength is immersive, long-term learning and retention, we intentionally shifted toward a typographic identity. A wordmark better matches how modern education platforms communicate authority: clean, scalable, and recognizable across app, web, and marketing.

We chose serif-led typography to signal tradition, seriousness, and trust. The display typeface communicates authority, while the supporting text face improves readability across longer formats. The controlled blue tone reinforces focus and credibility rather than gamification.

To retain a subtle link to the brand origin without being literal, the final “A” in ROSETTA includes two engraved-like lines, echoing the texture of the original stone as a quiet conceptual cue.`
},

    {
      type: "gallery",
      h: "Logo System",
      items: [
        { src: "./media/rosetta/rosetta-wordmark-black.png", alt: "Wordmark", cap: "Primary wordmark — simplified typographic identity." },
        { src: "./media/rosetta/rosetta-icon.png", alt: "App icon", cap: "App icon — bold, minimal, and scalable." }
      ],
      maxWidth: 260
    },

    {
      type: "text",
      h: "Brand System",
      p:
`We aimed for a premium learning platform look:
• Minimal layouts + legibility-first typography (closer to editorial / trusted education brands).
• Serif-led tone to communicate authority, tradition, and seriousness — balanced with modern spacing and hierarchy.
• A controlled color palette (monochrome + refined blue accent) to reduce noise and signal focus + discipline.`
    },

    {
  type: "gallery",
  h: "Core Message Posters",
  items: [
    {
      src: "./media/rosetta/serious-learning-poster2.png",
      alt: "Rosetta poster — abstract"
    },
    {
      src: "./media/rosetta/serious-learning-poster3.png",
      alt: "Serious Learning — text-led"
    },
    {
      src: "./media/rosetta/serious-learning-poster.png",
      alt: "Serious Learning — outlined house"
    }
  ]
},

    {
      type: "text",
      h: "Applications",
      p:
`The system was designed to scale across digital touchpoints (social, mobile UI, web) and physical brand moments — keeping the same disciplined tone and hierarchy.`
    },

    {
      type: "gallery",
      h: "Social & UI Mockups",
      items: [
        { src: "./media/rosetta/ad-insta.jpg", alt: "Instagram ads", cap: "Instagram ad concept — consistent diagonal structure + typography." },
        { src: "./media/rosetta/facebook-mockup.jpg", alt: "Facebook page mockup", cap: "Facebook page mockup — banner + post template working together." },
        { src: "./media/rosetta/rosetta-rebrand-02.png", alt: "Mobile UI screens", cap: "Mobile UI set — structured, readable, and brand-consistent." }
      ]
    },

    {
      type: "gallery",
      h: "Brand Guidelines Highlights",
      items: [
        { src: "./media/rosetta/rosetta-rebrand-04.png", alt: "Merch mockups", cap: "Merchandise mockups — wordmark scalability test." },
        { src: "./media/rosetta/rosetta-rebrand-05.png", alt: "Outdoor posters", cap: "Outdoor applications — high contrast + editorial voice." }
      ]
    },

    {
  type: "image",
  h: "Iconography",
  src: "./media/rosetta/icon.png",
  alt: "Rosetta iconography sheet",
  cap: "A consistent icon set designed to support navigation and learning modes across the platform."
}

  ]
},
{
  id: "pinocchio",
  category: "Visual Narratives",
  title: "Pinocchio — Workshop Awakening",
  layout: "narrative",
  coverPlacement: "board",

  facts: [
    { label: "Tools", value: "Blender" },
    { label: "Role", value: "3D Modelling + Animation" },
    { label: "Year", value: "2026" },
    { label: "Focus", value: "Camera movement, acting, object interaction" }
  ],

  boards: [
    { type: "image", src: "./media/pinocchio.jpg", alt: "Pinocchio cover", role: "cover", maxWidth: 1200}
  ],

  sections: [
    {
      type: "links",
      h: "Watch",
      items: [
        { label: "Watch animation (MP4)", href: "./media/pinocchio.mp4" }
      ]
    },

    {
      type: "text",
      h: "Story Idea",
      p:
`This animation is set in a workshop. Pinocchio sits on the table, suddenly comes alive, and starts observing the surroundings. He interacts with a glass ball next to him. When he notices someone entering the room, he returns to his original posture — as if nothing happened.`
    },

    {
      type: "text",
      h: "Camera Movement",
      p:
`Shot 1 — A long camera move from the back of the scene to the front. The camera then centers and focuses on Pinocchio, capturing his interaction with surrounding objects. The shot ends when he notices someone entering and freezes back into position.

Shot 2 — A clear cut. The camera follows the action and quickly hides behind the hat to build tension, suggesting someone has entered. It ends with a high-angle top view that reveals the full workshop environment.`
    },

    {
      type: "text",
      h: "Object Animation",
      p:
`• Pinocchio’s head — facial expressions and eye movement as he looks around.
• Pinocchio’s body — hands, arms, and torso motion to mimic puppet-like movement.
• Glass balls — one ball is rolled by Pinocchio and collides with another, creating a chain reaction.`
    },

    {
      type: "text",
      h: "Technical Notes",
      p:
`The entire piece was built and animated in Blender, including both camera animation and object animation. I avoided external video-editing filters — all motion, timing, and effects come directly from the 3D scene setup and animation.`
    }
  ]
},




];
