module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("Card", {
    user_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    paragraph: { type: DataTypes.STRING },
    song: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    viewers: { type: DataTypes.STRING }, // Assuming viewers is an integer count
    viewslimit: { type: DataTypes.INTEGER }, // Correct type for numeric limits
    expiry: { type: DataTypes.DATE },
    locked: { type: DataTypes.BOOLEAN },
    downloadable: { type: DataTypes.BOOLEAN }
  });

  return Card;
};
