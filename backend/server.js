import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// 🔥 Pexels API
const API_KEY = "zcRlpDgUIOBVBuW61KNhE94StSVyXUabnI1ooWvX4YB6ykzoAkL6yutL";

// Questions
const questions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["2", "4", "6", "8"],
    answer: "4"
  },
  {
    id: 2,
    question: "Capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi"
  }
];

// Get Questions
app.get("/", (req, res) => {
  res.redirect("/api/questions");
});


// Submit Exam
app.post("/api/submit", (req, res) => {
  const answers = req.body.answers;
  let score = 0;

  questions.forEach(q => {
    if (answers[q.id] === q.answer) score++;
  });

  res.json({ score, total: questions.length });
});

// Pexels Image
app.get("/api/image", async (req, res) => {
  const query = req.query.q || "study";

  const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: { Authorization: API_KEY }
  });

  const data = await response.json();
  res.json(data.photos[0]);
});

// Health (for Railway)
app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
