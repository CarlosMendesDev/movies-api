import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../Models/User.js'

class AuthController {
  async login(req, res) {
    const { email_user, password } = req.body

    try {
      if (!email_user && !password) throw { msg: 'BAD REQUEST', status: 500 }

      const user = await User.findOne({ where: { email_user } })

      if (!user) throw { msg: 'USER NOT FOUND', status: 404 }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) throw { msg: 'INVALID PASSWORD', status: 401 }

      const token = jwt.sign({ iss: user.email_user }, process.env.JWT_KEY, { expiresIn: '2h' })

      res.setHeader('Authorization', `Bearer ${token}`)

      res.status(200).json({
        message: 'LOGED'
      })
    } catch (error) {
      res.status(error.status).json({
        message: error.msg
      })
    }
  }
}

export default new AuthController()
