const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const getAllBooks = asyncHandler(async (req, res) => {
  const allBooks = await Book.find();
  // console.log("All Books - ", allBooks);
  res.json({
    count: allBooks.length,
    allBooks,
  });
});

const createBook = asyncHandler(async (req, res) => {
  const { title, author, publishYear } = req.body;

  if (!title || !author || !publishYear) {
    return res.json({
      success: false,
      message: "Please provide all fields - title, author, publishYear",
    });
  }

  const existingBook = await Book.findOne({ title });

  if (existingBook) {
    return res.json({
      success: false,
      message: `Book title '${title}' already exists`,
    });
  }

  try {
    const newBook = await Book.create({ title, author, publishYear });
    res.json({
      success: true,
      status: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    // errorHandler(error);
    console.log(error);
  }
});

const getBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingBook = await Book.findById(id);

  if (!existingBook) {
    throw new Error(`Book with id - ${id} not found`);
  }

  res.json(existingBook);
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingBook = await Book.findById(id);

  if (!existingBook) {
    throw new Error(`Book with id - ${id} not found`);
  }

  // console.log(existingBook);
  // console.log("new data =>", req.body);

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    res.json({ success: true, status: "Book updated successfully" });
  } catch (error) {
    console.error(error);
    // errorHandler(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingBook = await Book.findById(id);

  if (!existingBook) {
    throw new Error(`Book with id - ${id} not found`);
  }

  try {
    await Book.findByIdAndDelete(id);

    res.json({
      success: true,
      status: "Book deleted successfully",
    });
  } catch (error) {
    // errorHandler(error);
    console.log(error);
  }
});

module.exports = { getAllBooks, createBook, getBook, updateBook, deleteBook };
