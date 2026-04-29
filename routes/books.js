const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// ─────────────────────────────────────────────
// @route   POST /api/books
// @desc    Add a new book
// @access  Public
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // Basic validation
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide title, author, and price",
      });
    }

    const book = new Book({ title, author, price });
    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: savedBook,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// @route   GET /api/books
// @desc    Retrieve all books
// @access  Public
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// @route   GET /api/books/:id
// @desc    Retrieve a single book by ID
// @access  Public
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// ─────────────────────────────────────────────
// @route   DELETE /api/books/:id
// @desc    Delete a book by ID
// @access  Public
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: `Book "${book.title}" deleted successfully`,
      data: book,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid book ID format" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
