import express from "express";

const app = express();

app.use(express.json());


app.get("/api/company", (req, res) => {
  res.json({
    name: "HADES TECH",
    founded: "Februari 2025",
    founder: "HADI DEV",
    location: "Temanggung, Jawa Tengah"
  });
});


export default app;
