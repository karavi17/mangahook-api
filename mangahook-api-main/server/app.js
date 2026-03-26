const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ApiKey = require("./middleware/apiKeyMiddleware");

const mangaRouter = require("./routes/mangaRouter");
const mangaListRouter = require("./routes/mangaListRouter");
const mangaSearch = require("./routes/mangaSearch");

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(ApiKey);

// Root route
app.get("/", (req, res) => {
  res.send("MangaHook API is running 🚀");
});

// API routes
app.use("/api/manga", mangaRouter);
app.use("/api/mangaList", mangaListRouter);
app.use("/api/search", mangaSearch);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Start On Port ${PORT} 🎉✨`);
});
