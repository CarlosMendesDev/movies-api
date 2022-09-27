import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.PATH_DATABASE
})

sequelize.sync().catch((err) => {
  console.log(err)
})

export default sequelize
