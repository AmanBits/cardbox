const router = require("express").Router();
const cardController = require("../controllers/cardController");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

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

router.get('/history',cardController.history);

router.post('/preview',cardController.preview);

module.exports = router;
