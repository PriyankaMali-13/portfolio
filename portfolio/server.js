/**
 * server.js — Entry point for the portfolio web server.
 * Run: node server.js
 */

const express      = require("express");
const path         = require("path");
const contactRoute = require("./routes/contact");
const portfolio    = require("./data/portfolio");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything inside /public as static files (CSS, JS, images, resume PDF)
app.use(express.static(path.join(__dirname, "public")));

// ── API Routes ──────────────────────────────────────────────────────────────

// Expose portfolio data as JSON so the front-end can fetch it dynamically
app.get("/api/portfolio", (req, res) => {
  res.json(portfolio);
});

// Contact form handler
app.use("/api/contact", contactRoute);

// ── Page Routes ─────────────────────────────────────────────────────────────
// All routes serve the same SPA index.html; client-side JS handles sections.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅ Portfolio server running at http://localhost:${PORT}`);
  console.log("   Press Ctrl+C to stop.\n");
});
