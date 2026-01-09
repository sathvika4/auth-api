const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role");

const User = sequelize.define("User", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.INTEGER, references: { model: Role, key: "id" } },
});

// Associations
User.belongsTo(Role, { foreignKey: "roleId", as: "Role" });
Role.hasMany(User, { foreignKey: "roleId", as: "Users" });

module.exports = User;
