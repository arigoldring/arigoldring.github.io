// ====== Simple data-driven projects (edit this!) ======
const projects = [
  {
    title: "Strahd Hub",
    tagline: "Full-stack D&D campaign management app",
    description:
      "Shared inventory, spellbooks, maps, and NPC records with role-gated visibility, spanning 23 Postgres tables and 47 versioned SQL migrations. Authorization is enforced in the database through 23 row-level security policies, so content hidden from players never leaves the server. Closed a privilege-escalation path by routing every profile mutation through security-definer Postgres functions.",
    tags: ["web", "security"],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Cloudflare Pages"],
    github: "https://github.com/arigoldring/strahd-hub",
    demo: "https://dnd-cos.pages.dev",
    image: null, // set to "assets/strahd-hub.png" if you add an image
    role: "Solo developer: schema, RLS policies, frontend, and deployment",
  },
  {
    title: "Tails of the Tower",
    tagline: "Semester-long team game, shipped to itch.io",
    description:
      "Managed timeline and scope for a 24-person dev team across 5 sub-teams (art, programming, design, music, writing). Designed and ran 3 structured playtests and synthesized the findings into visual summaries that drove design decisions.",
    tags: ["game"],
    tech: ["Godot"],
    github: null,
    demo: "https://udel.itch.io/tails-of-the-tower",
    image: null,
    role: "Producer: scheduling, scope, playtesting",
  },
  {
    title: "Policy Lens",
    tagline: "Hackathon Chrome extension for Terms of Service",
    description:
      "Flags concerning clauses in any Terms of Service the user submits. A context input (“I’m a photographer posting to Pinterest…”) and category filters (data use, IP, liability) scope Gemini's analysis to the user's actual concerns.",
    tags: ["web", "ai"],
    tech: ["Chrome Extension", "Google Gemini API"],
    github: null,
    demo: null,
    image: null,
    role: "Co-creator: Gemini integration, prompt design, response parsing, in-page highlight overlay",
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
    : `<div class="thumb">${p.title}</div>`;

  const techBadges = p.tech.map((t) => `<span class="badge">${t}</span>`).join("");
  const tagBadges = p.tags.map((t) => `<span class="badge">${t}</span>`).join("");

  const links = [
    p.demo && `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>`,
    p.github && `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>`,
  ].filter(Boolean).join("");

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
        ${links ? `<div class="links">${links}</div>` : ""}
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
if (mailtoForm) {
  mailtoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(mailtoForm);
    const subject = encodeURIComponent(formData.get("subject") || "");
    const body = encodeURIComponent(formData.get("body") || "");

    const to = "arigoldring77@gmail.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
