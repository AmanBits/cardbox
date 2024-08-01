const db = require("../models");
const path = require("path");
const Card = db.Card;

// Encode link
const encodeLink = (result) => {
  return new Promise((resolve, reject) => {
    try {
      const links = result.map((item) => {
        const buffer1 = Buffer.alloc(4);
        const buffer2 = Buffer.alloc(4);
        buffer1.writeUInt32BE(item.id);
        buffer2.writeUInt32BE(item.user_id);
        let combined = Buffer.concat([buffer1, buffer2]);
        let encoded = combined.toString("base64");
        return `http://localhost:5173/cardbox/preview/${encoded}`;
      });

      resolve(links);
    } catch (error) {
      reject(error);
    }
  });
};

// Decode Link
const decodeIds = (encodedIds) => {
  return new Promise((resolve, reject) => {
    try {
      // Decode Base64 to Buffer
      const combinedBuffer = Buffer.from(encodedIds, "base64");

      // Extract individual IDs
      const cardid = combinedBuffer.readUInt32BE(0);
      const user_id = combinedBuffer.readUInt32BE(4);

      resolve({ cardid, user_id });
    } catch (error) {
      reject(error);
    }
  });
};

// Decode the encoded IDs
//  const { id1: decodedId1, id2: decodedId2 } = await decodeIds(encodedIds);
//  console.log('Decoded IDs:', { id1: decodedId1, id2: decodedId2 });

const createCard = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  console.log(req.body);
  try {
    // Save file paths and text data
    const newUpload = await Card.create(
      {
        name: req.body.name,
        title: req.body.title,
        paragraph: req.body.paragraph,
        image: path.basename(req.files["image"][0].path),
        song: path.basename(req.files["song"][0].path),
        viewers: req.body.viewers,
        viewslimit: req.body.viewslimit,
        expiry: req.body.expiry,
        locked: req.body.locked,
        downloadable: req.body.downloadable,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(201).json(newUpload);
  } catch (error) {
    console.error("Error:", error);
    await transaction.rollback();
    res.status(500).send("Internal Server Error");
  }
};

const history = async (req, res) => {
  try {
    const result = await Card.findAll();
    const links = await encodeLink(result);
    res.status(200).json({ data: links });
  } catch (error) {
    console.log(error);
  }
};

const preview = async (req, res) => {
  try {
    const link = req.body.linkdata;

    // Decode IDs and fetch the card
    const { cardid, user_id } = await decodeIds(link);
    const result = await Card.findAll({ where: { id: cardid } });

    // Check if the result is empty
    if (result.length === 0) {
      return res.status(200).json({ mystatus:222, data: "Card not found" });
    }

    // Check expiration date
    if (new Date(req.body.expirydate) > new Date(result[0].expiry)) {
      return res.status(200).json({mystatus:223, data: "Link expired" });
    } else {
      return res.status(200).json({mystatus:224, data: result });
    }
  } catch (error) {
    // Log detailed error information
    console.error("Preview fetch error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createCard,
  history,
  preview,
};
