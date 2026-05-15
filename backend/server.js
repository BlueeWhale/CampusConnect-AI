const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const app = express(); // ✅ FIRST
const server = http.createServer(app);
require("dotenv").config(); // 👈 MUST FIRST

const connectDB = require("./config/db");

connectDB(); // 👈 AFTER dotenv


// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ✅ STATIC FILES (FIXED POSITION)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ======================
// ROUTES
// ======================

const orderRoutes = require("./routes/orderRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/orders", orderRoutes);
app.use("/api/events", eventRoutes);

// (IF YOU HAVE FOOD ROUTES ADD THIS)
const foodRoutes = require("./routes/foodRoutes");
app.use("/api/food", foodRoutes);

const authRoutes =
require("./routes/authRoutes");

app.use(
  "/api/auth",
  authRoutes
);


// ======================
// SOCKET.IO
// ======================

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("orderReady", (data) => {
    io.emit("orderReadyNotification", data);
  });
});

// ======================
// START SERVER
// ======================

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});