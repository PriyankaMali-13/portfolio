const express = require("express");
const router  = express.Router();

/**
 * POST /api/contact
 * Handles contact form submissions.
 * Logs the message to the console (swap for nodemailer/DB later).
 */
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email." });
  }

  // Log the submission (replace with nodemailer or DB insert as needed)
  console.log("\n📬 New contact form submission:");
  console.log("  Name   :", name);
  console.log("  Email  :", email);
  console.log("  Message:", message);
  console.log("  Time   :", new Date().toISOString());

  res.json({ success: true, message: "Thank you! Your message has been received." });
});

module.exports = router;
