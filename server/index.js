const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const PORT = 3000;

const path = require("path");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routers
const router = require("./routes/cardRoutes");
app.use("/api/card", router);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
