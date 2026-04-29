require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const bookRoutes = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookstore";

// ─── Middleware ───────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (frontend UI)
app.use(express.static(path.join(__dirname, "public")));

// ─── API Routes ───────────────────────────────
app.use("/api/books", bookRoutes);

// ─── Root route serves the frontend ──────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Connect to MongoDB & Start Server ────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`   Database: ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 Book API available at http://localhost:${PORT}/api/books`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ─── Graceful Shutdown ────────────────────────
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("\n🔌 MongoDB connection closed. Server shut down.");
  process.exit(0);
});
