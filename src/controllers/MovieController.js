import apiTMDB from '../config/axios.js'

class MovieController {
  async moviesList(req, res) {
    try {
      const { page } = req.query

      if (!page) throw { msg: 'BAD REQUEST: missing parameter {page}', status: 400 }

      const { data, status } = await apiTMDB.get(`/discover/movie?api_key=${process.env.API_KEY}&language=pt-BR&page=${page}`)

      res.status(status).json(data)
    } catch (error) {
      res.status(error.status).json({
        code: error.status,
        message: error.msg
      })
    }
  }
}

export default new MovieController()
