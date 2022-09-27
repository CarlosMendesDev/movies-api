import User from '../Models/User.js'
import bcrypt from 'bcrypt'

class UserController {
  async saveUser(req, res) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) throw { msg: 'BAD REQUEST', status: 500 }

      const cryptPassword = await bcrypt.hash(password, 10)

      console.log(cryptPassword)

      const user = await User.create({
        name,
        email,
        password: cryptPassword
      })

      console.log(user)

      res.status(201).json({
        message: 'CREATED',
        user
      })
    } catch (error) {
      res.status(error.status).json({
        code: error.status,
        message: error.msg
      })
    }
  }
}

export default new UserController()
