const sequelize = require("../config/db");
const Role = require("../models/Role");

const seedRoles = async () => {
  await sequelize.sync();
  await Role.bulkCreate([{ name: "user" }, { name: "admin" }], { ignoreDuplicates: true });
  console.log("Roles seeded");
  process.exit();
};

seedRoles();
