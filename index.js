import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/company", (req, res) => {
  res.json({
    name: "HADES TECH",
    founded: "Februari 2025",
    founder: "HADI DEV",
    location: "Temanggung, Jawa Tengah"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
