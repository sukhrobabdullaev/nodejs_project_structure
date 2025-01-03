const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const verifyToken = require("../middlewares/authMiddleware.js");
const authJwt = require("../helpers/jwt.js");
const errorHandler = require("../helpers/error-handler.js");
const path = require('path');

require("dotenv").config(); // Load environment variables

const app = express();
const API_URL = process.env.API_URL || "/api/v1";

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all origins; modify this for security in production
  //   process.env.ALLOWED_ORIGIN || "http://localhost:3000", // Replace with your frontend domain
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests globally

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt())
app.use(errorHandler)
app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')));


// Routes
const productRoutes = require("../routes/product.routes.js");
const categoryRoutes = require("../routes/category.routes.js");
const userRoutes = require("../routes/user.routes.js");
const orderRoutes = require("../routes/order.routes.js");

// app.use(verifyToken);

// Use routes with the API_URL as the base path
app.use(`${API_URL}/products`, productRoutes);
app.use(`${API_URL}/categories`, categoryRoutes);
app.use(`${API_URL}/users`, userRoutes);
app.use(`${API_URL}/orders`, orderRoutes);


module.exports = app;
