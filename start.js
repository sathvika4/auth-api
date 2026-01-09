const app = require("./server");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
