import express from "express";

const app = express();

app.use(express.json());

// API
app.get("/api/company", (req, res) => {
  res.status(200).json({
    name: "HADES TECH",
    founded: "Februari 2025",
    founder: "HADI DEV",
    location: "Temanggung, Jawa Tengah",
    focus: [
      "WhatsApp Bot",
      "PPOB System",
      "Software Development"
    ]
  });
});

// Vercel handler
export default function handler(req, res) {
  return app(req, res);
      }
