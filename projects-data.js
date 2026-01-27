const PROJECTS = [
  {
    id: "blossom",
    category: "Product Design",
    title: "Blossom",
    facts: [
      { label: "Tools", value: "Procreate, Blender, 3ds Max, Illustrator, CAD" },
      { label: "Role", value: "Designer" },
      { label: "Year", value: "2025" }
    ],
    boards: [
      // 你可以放一张长展板，也可以放多张图
      { type: "image", src: "./media/blossom.jpg", alt: "Blossom board" }
    ],
    
  },

  // 你再加第二个项目就复制一份改 id/title/图
  {
    id: "library",
    category: "Interior Design",
    title: "Library Space Concept",
    facts: [
      { label: "Tools", value: "3ds Max, CAD, Photoshop" },
      { label: "Role", value: "Interior Designer" },
      { label: "Year", value: "2024" }
    ],
    boards: [
      { type: "image", src: "./media/library-board.jpg", alt: "Library board" }
    ],
    sections: [
      
      { h: "Overview", p: "Short overview text goes here." },
      { h: "Problem", p: "What problem you solved." },
      { h: "Process", p: "Key steps and decisions." },
      { h: "Outcome", p: "Final outcome and results." }
    
    ]
  }
];
