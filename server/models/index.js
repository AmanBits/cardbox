const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);



sequelize
  .authenticate()
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

  
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;


db.Card = require("./Card")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync done !");
});



module.exports = db;
