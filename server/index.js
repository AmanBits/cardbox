const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const path = require("path");

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//routers
const router = require("./routes/cardRoutes");
app.use("/api/card", router);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
