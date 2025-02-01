"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InternalStatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InternalStatuses.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "InternalStatuses",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return InternalStatuses;
};
