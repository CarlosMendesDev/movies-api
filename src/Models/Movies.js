import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'

const Movie = sequelize.define('Movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genres: {
    type: DataTypes.JSON,
    allowNull: false
  },
  email_user: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {})

export default Movie
