// ====== Simple data-driven projects (edit this!) ======
const projects = [
  {
    title: "PolicyLens",
    tagline: "AI-powered Terms of Service analyzer",
    description:
      "Scans policies, highlights potentially problematic clauses, and summarizes key sections.",
    tags: ["web", "ai"],
    tech: ["React", "TypeScript", "Node"],
    github: "https://github.com/arigoldring",
    demo: "#",
    image: null, // set to "assets/policylens.png" if you add an image
    role: "Built detector pipeline + UI interactions",
  },
  {
    title: "Unity Tavern Game",
    tagline: "Team-based game project",
    description:
      "Prototype loop: combat → resources → tavern upgrades → repeat. Built in a large team setting.",
    tags: ["game"],
    tech: ["Unity", "C#"],
    github: "https://github.com/arigoldring",
    demo: "#",
    image: null,
    role: "Implemented combat logic + progression hooks",
  },
  {
    title: "D&D Character Builder",
    tagline: "Web app for creating and exporting characters",
    description:
      "Character creation flow with save/load, structured data, and a clean UI for editing.",
    tags: ["web"],
    tech: ["Python", "Flask", "JSON"],
    github: "https://github.com/arigoldring",
    demo: "#",
    image: null,
    role: "Designed data model + save/load flow",
  },
];

// ====== Render ======
const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("projectSearch");
const tagFilter = document.getElementById("tagFilter");
const yearEl = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");
const mailtoForm = document.getElementById("mailtoForm");

yearEl.textContent = new Date().getFullYear();

function matchesFilter(project, query, tag) {
  const q = query.trim().toLowerCase();
  const inText =
    project.title.toLowerCase().includes(q) ||
    project.tagline.toLowerCase().includes(q) ||
    project.description.toLowerCase().includes(q) ||
    project.tech.join(" ").toLowerCase().includes(q);

  const inTag = tag === "all" ? true : project.tags.includes(tag);
  return (q === "" || inText) && inTag;
}

function cardTemplate(p) {
  const thumb = p.image
    ? `<img src="${p.image}" alt="Screenshot of ${p.title}" style="width:100%;height:180px;object-fit:cover;" />`
    : `<div class="thumb">Add a screenshot in /assets</div>`;

  const techBadges = p.tech.map((t) => `<span class="badge">${t}</span>`).join("");
  const tagBadges = p.tags.map((t) => `<span class="badge">${t}</span>`).join("");

  return `
    <article class="card">
      ${thumb}
      <div class="body">
        <h3>${p.title}</h3>
        <p><strong>${p.tagline}</strong></p>
        <p>${p.description}</p>
        <div class="meta" aria-label="Tech stack">${techBadges}</div>
        <div class="meta" aria-label="Tags">${tagBadges}</div>
        <p class="muted"><strong>My role:</strong> ${p.role}</p>
        <div class="links">
          <a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>
          <a href="${p.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const query = searchInput.value || "";
  const tag = tagFilter.value || "all";

  const filtered = projects.filter((p) => matchesFilter(p, query, tag));
  grid.innerHTML = filtered.map(cardTemplate).join("");

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="panel" style="grid-column: 1 / -1;">
      <h3>No matches</h3>
      <p class="muted">Try clearing the search or switching the tag filter.</p>
    </div>`;
  }
}

searchInput.addEventListener("input", render);
tagFilter.addEventListener("change", render);
render();

// ====== Mobile nav toggle ======
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

// ====== Static contact: open an email draft ======
mailtoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(mailtoForm);
  const subject = encodeURIComponent(formData.get("subject") || "");
  const body = encodeURIComponent(formData.get("body") || "");

  // TODO: put your real email here
  const to = "your.email@example.com";
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});