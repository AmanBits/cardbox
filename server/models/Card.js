module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define("Cards", {
      user_id:{type:DataTypes.INTEGER},
      name: { type: DataTypes.STRING },
      title: { type: DataTypes.STRING },
      paragraph: { type: DataTypes.STRING },
      song: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING }
    });
    return Card;
  };
  