import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {})

export default User
