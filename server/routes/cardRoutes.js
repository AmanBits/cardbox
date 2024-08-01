const router = require("express").Router();
const cardController = require("../controllers/cardController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/create",
  upload.fields([{ name: "image" }, { name: "song" }]),
  cardController.createCard
);

router.get("/history", cardController.history);

router.post("/preview", cardController.preview);

// Streaming audio route
router.get("/audio/:filename", (req, res) => {
  const { filename } = req.params;
  const audioPath = path.join(__dirname, "..", "uploads", filename); // Adjust path as needed

  if (!fs.existsSync(audioPath)) {
    return res.status(404).json({ error: "Audio file not found" });
  }

  const stat = fs.statSync(audioPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = Math.min(start + 999999, fileSize - 1);

    const chunksize = end - start + 1;
    const file = fs.createReadStream(audioPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mpeg",
    };

    res.writeHead(200, head);
    fs.createReadStream(audioPath).pipe(res);
  }
});

module.exports = router;
