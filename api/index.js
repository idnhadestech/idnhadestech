import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// COMPANY API
// =====================
app.get("/api/company", (req, res) => {
  res.json({
    name: "HADES TECH",
    founded: "Februari 2025",
    founder: "HADI DEV",
    location: "Temanggung, Jawa Tengah",
    status: "active",
    services: [
      "WhatsApp Automation",
      "PPOB System",
      "Software Development"
    ]
  });
});

// =====================
// HEALTH CHECK
// =====================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime()
  });
});

export default app;
