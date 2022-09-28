import jwt from 'jsonwebtoken'

class Auth {
  verify(req, res, next) {
    try {
      const { authorization	} = req.headers

      const [_, token] = authorization.split(' ')

      if (!token) throw { msg: 'NOT AUTHORIZATION', status: 401 }

      const isValidToken = jwt.verify(token, process.env.JWT_KEY)

      if(!isValidToken) throw { msg: 'NOT AUTHORIZATION', status: 401 }

      const decoded = jwt.decode(token, process.env.JWT_KEY)

      req.decoded = { email_user: decoded.iss }
      next()
    } catch (error) {
      res.status(error.status).json(error.msg)
    }
  }
}

export default new Auth()
