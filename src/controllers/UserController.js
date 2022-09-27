import User from '../Models/User.js'
import bcrypt from 'bcrypt'

class UserController {
  async saveUser(req, res) {
    try {
      const { name, email_user, password } = req.body

      if (!name || !email_user || !password) throw { msg: 'BAD REQUEST', status: 500 }

      const cryptPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
        name,
        email_user,
        password: cryptPassword
      })

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
