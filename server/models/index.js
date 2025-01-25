"use strict";

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

let sequelize;
const dbConfig = require(__dirname + "/../config/config.js")[env];

console.log("dbConfig", dbConfig);

const Sequelize = require("sequelize");
sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig,
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error.message);
  });

// Export sequelize and DataTypes
module.exports.sequelize = sequelize;
module.exports.DataTypes = Sequelize.DataTypes;

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.DataTypes = Sequelize.DataTypes;
db.Sequelize = Sequelize;

module.exports = db;
