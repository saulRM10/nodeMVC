"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.UserRoles, {
        foreignKey: "role_id",
        sourceKey: "id",
      });
    }
  }
  Role.init(
    {
      role_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Role;
};
