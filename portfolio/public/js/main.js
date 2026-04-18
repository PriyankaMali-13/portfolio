/**
 * main.js — Client-side logic for the portfolio website.
 * Fetches portfolio data from /api/portfolio and renders all sections.
 */

/* ════════════════════════════════════════════════════════════════
   1. FETCH DATA & BOOTSTRAP
   ════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res  = await fetch("/api/portfolio");
    const data = await res.json();

    renderHero(data);
    renderAbout(data);
    renderProjects(data.projects);
    renderContact(data.contact);
    renderFooter(data);
  } catch (err) {
    console.error("Failed to load portfolio data:", err);
  }

  initNavbar();
  initSmoothScroll();
  initScrollSpy();
  initContactForm();
  initScrollReveal();
  initMobileMenu();
  setFooterYear();
});

/* ════════════════════════════════════════════════════════════════
   2. RENDER FUNCTIONS
   ════════════════════════════════════════════════════════════════ */

/** Hero Section */
function renderHero({ name, title, summary, skills }) {
  document.title = `Portfolio | ${name}`;
  setText("heroName", name);
  setText("heroTitle", title);
  setText("heroSummary", summary);

  // Flatten first 3 skill categories into hero tags
  const allSkills = Object.values(skills).flat().slice(0, 8);

  const container = document.getElementById("heroSkills");
  allSkills.forEach(s => {
    const span = document.createElement("span");
    span.className = "skill-tag";
    span.textContent = s;
    container.appendChild(span);
  });
}

/** About Section */
function renderAbout({ summary, skills, experience, education, awards, certifications }) {
  setText("aboutSummary", summary);

  // Skills grid
  const skillsContainer = document.getElementById("skillsGrid");
  Object.entries(skills).forEach(([category, items]) => {
    const group = document.createElement("div");
    group.className = "skill-group";
    group.innerHTML = `
      <p class="skill-group-title">${category}</p>
      <div class="skill-list">${items.map(s => `<span class="skill-pill">${s}</span>`).join("")}</div>
    `;
    skillsContainer.appendChild(group);
  });

  // Experience timeline
  renderTimeline("timeline", experience, item => `
    <p class="role">${item.role}</p>
    <p class="company">${item.company} — ${item.location}</p>
    <p class="period">${item.period}</p>
    <ul>${item.points.map(p => `<li>${p}</li>`).join("")}</ul>
  `);

  // Education timeline
  renderTimeline("educationTimeline", education, item => `
    <p class="role">${item.degree}</p>
    <p class="company">${item.school}</p>
    <p class="period">${item.year} &middot; ${item.grade}</p>
  `);

  // Awards
  if (awards?.length) {
    const awardsList = document.getElementById("awardsList");
    awards.forEach(award => {
      const li = document.createElement("li");
      li.className = "award-item";
      li.textContent = award;
      awardsList.appendChild(li);
    });
  }

  // Certifications
  if (certifications?.length) {
    const certList = document.getElementById("certList");
    certifications.forEach(cert => {
      const li = document.createElement("li");
      li.className = "cert-item";
      li.textContent = cert;
      certList.appendChild(li);
    });
  }
}

function renderTimeline(containerId, items, templateFn) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = templateFn(item);
    container.appendChild(div);
  });
}

/** Projects Section */
function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");

  projects.forEach((project, i) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.transitionDelay = `${i * 80}ms`;

    const techBadges = project.tech
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join("");

    const links = [];
    if (project.github) links.push(`<a href="${project.github}" class="project-link" target="_blank" rel="noopener">⬡ GitHub</a>`);
    if (project.live)   links.push(`<a href="${project.live}"   class="project-link" target="_blank" rel="noopener">↗ Live Demo</a>`);

    card.innerHTML = `
      <p class="project-number">Project ${String(i + 1).padStart(2, "0")}</p>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tech">${techBadges}</div>
      ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
    `;
    grid.appendChild(card);
  });
}

/** Contact Info */
function renderContact({ email, phone, location, linkedin, github }) {
  setText("infoLocation", location);
  setText("infoPhone",    phone);

  // Clickable email
  const emailEl = document.getElementById("infoEmail");
  if (emailEl) emailEl.innerHTML = `<a href="mailto:${email}">${email}</a>`;

  const socialContainer = document.getElementById("socialLinks");
  const socials = [
    { label: "LinkedIn", url: linkedin, icon: "in" },
    { label: "GitHub",   url: github,   icon: "{}" },
  ];
  socials.forEach(({ label, url, icon }) => {
    const a = document.createElement("a");
    a.href      = url;
    a.target    = "_blank";
    a.rel       = "noopener";
    a.className = "social-link";
    a.innerHTML = `<span>${icon}</span> ${label}`;
    socialContainer.appendChild(a);
  });
}

/** Footer */
function renderFooter({ name }) {
  setText("footerName", name);
}

/* ════════════════════════════════════════════════════════════════
   3. CONTACT FORM
   ════════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form      = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const status    = document.getElementById("formStatus");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    let   valid   = true;

    if (!name) {
      showError("nameError",    "Please enter your name.");
      form.name.classList.add("error");
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError",   "Please enter a valid email address.");
      form.email.classList.add("error");
      valid = false;
    }
    if (!message || message.length < 10) {
      showError("messageError", "Message must be at least 10 characters.");
      form.message.classList.add("error");
      valid = false;
    }

    if (!valid) return;

    // Submit
    submitBtn.disabled    = true;
    submitBtn.textContent = "Sending…";

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (data.success) {
        showStatus("success", "✅ " + data.message);
        form.reset();
      } else {
        showStatus("error", "⚠️ " + (data.error || "Something went wrong."));
      }
    } catch {
      showStatus("error", "⚠️ Network error. Please try again.");
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = "Send Message";
    }
  });

  // Remove error styling on input
  form.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => el.classList.remove("error"));
  });
}

/* ════════════════════════════════════════════════════════════════
   4. NAVBAR — scroll shadow + mobile menu
   ════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   5. SCROLL SPY — highlight active nav link
   ════════════════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = document.querySelectorAll(".section");
  const links    = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ════════════════════════════════════════════════════════════════
   6. SCROLL REVEAL — animate elements when they enter viewport
   ════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll(".timeline-item, .project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════════════════════
   7. SMOOTH SCROLL (polyfill for anchor links)
   ════════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   8. HELPERS
   ════════════════════════════════════════════════════════════════ */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearErrors() {
  ["nameError", "emailError", "messageError"].forEach(id => showError(id, ""));
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
  const status = document.getElementById("formStatus");
  status.className = "form-status";
  status.textContent = "";
}

function showStatus(type, msg) {
  const el = document.getElementById("formStatus");
  el.className   = `form-status ${type}`;
  el.textContent = msg;
}

function setFooterYear() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = `© ${new Date().getFullYear()} All rights reserved.`;
}
