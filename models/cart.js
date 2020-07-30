const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Cart