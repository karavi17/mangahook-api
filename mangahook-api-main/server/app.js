// 🔥 IMPORTS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// 🔥 ROUTES & MIDDLEWARE
const ApiKey = require("./middleware/apiKeyMiddleware");
const mangaRouter = require("./routes/mangaRouter");
const mangaListRouter = require("./routes/mangaListRouter");
const mangaSearch = require("./routes/mangaSearch");

// 🔥 APP INIT
const app = express();

// 🔥 MIDDLEWARES
app.use(cors()); // ✅ CORS FIX
app.use(bodyParser.json());

// 🔥 ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔥 API ROUTES
app.use(ApiKey);
app.use("/api/manga", mangaRouter);
app.use("/api/mangaList", mangaListRouter);
app.use("/api/search", mangaSearch);

// 🔥 PORT FIX (IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Start On Port ${PORT} 🎉✨`);
});
