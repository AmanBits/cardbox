require('dotenv').config();




module.exports = {
    username: process.env.MY_USERNAME,
    password: process.env.MY_PASSWORD,
    database: process.env.MY_DATABASE,
    host: process.env.MY_HOST,
    dialect: 'mysql',
    port:process.env.MY_PORT
  
  // Add configurations for other environments if needed
};
