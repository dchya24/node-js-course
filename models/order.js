const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Order