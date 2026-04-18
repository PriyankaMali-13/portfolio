/**
 * main.js — Portfolio client-side logic
 * Fetches data from /api/portfolio and renders all sections.
 */

/* ══════════════════════════════════════════════════════════
   BOOTSTRAP + AOS + TYPED.JS INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", async () => {
  // Init AOS (animate on scroll)
  AOS.init({ once: true, duration: 700, easing: "ease-out-cubic", offset: 60 });

  // Navbar scroll shadow
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Smooth scroll for anchor links (supplement Bootstrap's default)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        // Close mobile navbar if open
        const nav = document.getElementById("navbarNav");
        if (nav.classList.contains("show")) {
          bootstrap.Collapse.getInstance(nav)?.hide();
        }
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Active nav link via scroll spy
  initScrollSpy();

  // Contact form
  initContactForm();

  // Footer year
  document.getElementById("footerYear").textContent =
    `© ${new Date().getFullYear()} All rights reserved.`;

  // Fetch portfolio data and render
  try {
    const res  = await fetch("/api/portfolio");
    const data = await res.json();
    renderHero(data);
    renderAbout(data);
    renderProjects(data.projects);
    renderContact(data.contact);
    document.getElementById("footerName").textContent = data.name;
    document.title = `${data.name} | ${data.title}`;
  } catch (err) {
    console.error("Failed to load portfolio data:", err);
  }
});

/* ══════════════════════════════════════════════════════════
   RENDER — HERO
   ══════════════════════════════════════════════════════════ */
function renderHero({ name, title, summary, skills }) {
  setText("heroName",    name);
  setText("heroSummary", summary);

  // Typed.js rotating titles
  new Typed("#typedText", {
    strings: [
      title,
      "AWS Serverless Expert",
      "Node.js Developer",
      "Cloud-Native Builder",
      "DevOps Practitioner",
    ],
    typeSpeed:    55,
    backSpeed:    30,
    backDelay:    2200,
    startDelay:   600,
    loop:         true,
    showCursor:   false,
  });

  // Hero skill tags — top 8 across all categories
  const tags      = Object.values(skills).flat().slice(0, 8);
  const container = document.getElementById("heroSkills");
  tags.forEach(s => {
    const span = document.createElement("span");
    span.className   = "hero-tag";
    span.textContent = s;
    container.appendChild(span);
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER — ABOUT
   ══════════════════════════════════════════════════════════ */
function renderAbout({ summary, skills, experience, education, awards, certifications }) {
  setText("aboutSummary", summary);

  // Skill groups
  const grid = document.getElementById("skillsGrid");
  Object.entries(skills).forEach(([category, items], i) => {
    const div = document.createElement("div");
    div.className = "skill-group";
    div.setAttribute("data-aos", "fade-right");
    div.setAttribute("data-aos-delay", String(i * 60));
    div.innerHTML = `
      <p class="skill-group-title">${category}</p>
      <div>${items.map(s => `<span class="skill-pill">${s}</span>`).join("")}</div>
    `;
    grid.appendChild(div);
  });

  // Experience timeline
  buildTimeline("timeline", experience, item => `
    <p class="role">${item.role}</p>
    <p class="company"><i class="bi bi-building me-1"></i>${item.company} &mdash; ${item.location}</p>
    <p class="period"><i class="bi bi-calendar3 me-1"></i>${item.period}</p>
    <ul>${item.points.map(p => `<li>${p}</li>`).join("")}</ul>
  `);

  // Education timeline
  buildTimeline("educationTimeline", education, item => `
    <p class="role">${item.degree}</p>
    <p class="company"><i class="bi bi-building me-1"></i>${item.school}</p>
    <p class="period"><i class="bi bi-calendar3 me-1"></i>${item.year} &middot; ${item.grade}</p>
  `);

  // Awards
  if (awards?.length) {
    const ul = document.getElementById("awardsList");
    awards.forEach(a => {
      const li = document.createElement("li");
      li.className   = "award-item";
      li.textContent = a;
      ul.appendChild(li);
    });
  }

  // Certifications
  if (certifications?.length) {
    const ul = document.getElementById("certList");
    certifications.forEach(c => {
      const li = document.createElement("li");
      li.className   = "cert-item";
      li.innerHTML   = `<i class="bi bi-check-circle-fill me-2" style="color:var(--cyan)"></i>${c}`;
      ul.appendChild(li);
    });
  }
}

function buildTimeline(id, items, templateFn) {
  const container = document.getElementById(id);
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = templateFn(item);
    container.appendChild(div);
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER — PROJECTS
   ══════════════════════════════════════════════════════════ */
function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");

  projects.forEach((project, i) => {
    const col  = document.createElement("div");
    col.className = "col-md-6 col-lg-6";
    col.setAttribute("data-aos", "fade-up");
    col.setAttribute("data-aos-delay", String(i * 80));

    const techBadges = project.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");

    const links = [];
    if (project.github) links.push(`<a href="${project.github}" class="project-link" target="_blank" rel="noopener"><i class="bi bi-github"></i> GitHub</a>`);
    if (project.live)   links.push(`<a href="${project.live}"   class="project-link" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Live Demo</a>`);

    col.innerHTML = `
      <div class="project-card h-100">
        <p class="project-number">Project ${String(i + 1).padStart(2, "0")}</p>
        <h5 class="project-title">${project.title}</h5>
        <hr class="project-divider" />
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">${techBadges}</div>
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      </div>
    `;
    grid.appendChild(col);
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER — CONTACT
   ══════════════════════════════════════════════════════════ */
function renderContact({ email, phone, location, linkedin, github }) {
  setText("infoPhone",    phone);
  setText("infoLocation", location);

  const emailEl = document.getElementById("infoEmail");
  if (emailEl) emailEl.innerHTML = `<a href="mailto:${email}" style="color:inherit">${email}</a>`;

  const socialContainer = document.getElementById("socialLinks");
  [
    { label: "LinkedIn", url: linkedin, icon: "bi-linkedin" },
    { label: "GitHub",   url: github,   icon: "bi-github"   },
  ].forEach(({ label, url, icon }) => {
    const a = document.createElement("a");
    a.href      = url;
    a.target    = "_blank";
    a.rel       = "noopener";
    a.className = "social-link";
    a.innerHTML = `<i class="bi ${icon}"></i> ${label}`;
    socialContainer.appendChild(a);
  });
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════════════════════════ */
function initContactForm() {
  const form      = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const status    = document.getElementById("formStatus");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    clearErrors();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();
    let   valid   = true;

    if (!name) {
      showFieldError("nameError", form.name, "Please enter your name.");
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError("emailError", form.email, "Please enter a valid email address.");
      valid = false;
    }
    if (!message || message.length < 10) {
      showFieldError("messageError", form.message, "Message must be at least 10 characters.");
      valid = false;
    }
    if (!valid) return;

    submitBtn.disabled    = true;
    submitBtn.innerHTML   = `<span class="spinner-border spinner-border-sm me-2"></span>Sending…`;

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
      submitBtn.disabled  = false;
      submitBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Send Message`;
    }
  });

  form.querySelectorAll("input, textarea").forEach(el => {
    el.addEventListener("input", () => {
      el.classList.remove("is-invalid");
      const errEl = document.getElementById(el.id + "Error");
      if (errEl) errEl.textContent = "";
    });
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL SPY
   ══════════════════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showFieldError(errId, inputEl, msg) {
  const el = document.getElementById(errId);
  if (el) el.textContent = msg;
  inputEl.classList.add("is-invalid");
}

function clearErrors() {
  ["nameError","emailError","messageError"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  status.className   = "";
  status.textContent = "";
}

function showStatus(type, msg) {
  const el = document.getElementById("formStatus");
  el.className   = type;
  el.textContent = msg;
}
