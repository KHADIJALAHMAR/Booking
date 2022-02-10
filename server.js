require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// requiring mongoose
require("./src/config/mongoose");

// requiring middlewares
const cookieParser = require("cookie-parser");
const { authorizeToken } = require("./src/middlewares/authorizeUser");

// requiring Routes
const adminRoutes = require("./src/routes/adminRoutes");
const authentificationRoutes = require("./src/routes/authentificationRoutes");
// const bookingRoutes = require("./src/routes/bookingRoutes");
// const customerRoutes = require("./src/routes/customerRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const ownerRoutes = require("./src/routes/ownerRoutes");
// const reviewRoutes = require("./src/routes/reviewRoutes");
// const roomRoutes = require("./src/routes/roomRoutes");

// using middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Wellcome !!",
  });
});

// Authentification Route
app.use("/auth", authentificationRoutes);

// Authorize Middleware
app.use(authorizeToken);

// Other Routes
app.use("/admin", adminRoutes);
// app.use("/customers", customerRoutes);
app.use("/hotels", hotelRoutes);
app.use("/owners", ownerRoutes);
// app.use("/rooms", roomRoutes);
// app.use("/bookings", bookingRoutes);

// ---------------
app.listen(PORT, () =>
  console.log(`server is running at : http://localhost:${PORT}`)
);
