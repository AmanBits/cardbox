module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("Card", {
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING },
    paragraph: { type: DataTypes.STRING },
    song: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    viewers: { type: DataTypes.INTEGER, defaultValue: 0 }, // Changed to INTEGER
    viewslimit: { type: DataTypes.INTEGER },
    limitcounts: { type: DataTypes.INTEGER, defaultValue: 0 },
    expiry: { type: DataTypes.DATE },
    locked: { type: DataTypes.BOOLEAN, defaultValue: false },
    downloadable: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  return Card;
};
