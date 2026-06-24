import express from "express";

const app = express();

app.get("/api/company", (req, res) => {
  res.json({
    name: "HADES TECH",
    founded: "Februari 2025",
    founder: "Suseno Hadi Maksum",
    location: "Temanggung, Jawa Tengah",
    focus: ["WhatsApp Bot", "PPOB System", "Software Development"]
  });
});

export default app;
