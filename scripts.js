const yearEl = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

yearEl.textContent = new Date().getFullYear();

// ====== Mobile nav toggle ======
function setNavOpen(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => {
  setNavOpen(!navLinks.classList.contains("open"));
});

// Close the menu after picking a link so it doesn't cover the section
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => setNavOpen(false));
});

// ====== Copy-to-clipboard buttons (e.g. email) ======
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied!";
    } catch {
      // Clipboard blocked: fall back to showing the address so it can be copied by hand
      window.prompt("Copy this email address:", text);
    }
    setTimeout(() => (btn.textContent = label), 1500);
  });
});
