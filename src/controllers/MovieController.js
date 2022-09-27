import apiTMDB from '../config/axios.js'
import Movie from '../Models/Movies.js'

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

  async favoriteMovie(req, res) {
    try {
      const { movie_id } = req.body

      const { data: movieDetails, status } = await apiTMDB.get(`/movie/${movie_id}?api_key=${process.env.API_KEY}&language=pt-BR`)

      const movie = await Movie.create({
        movie_id: movieDetails.id,
        title: movieDetails.title,
        genres: movieDetails.genres
      })

      res.status(201).json({
        message: 'CREATED',
        movie
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getFavoriteMoviesList(req, res) {
    try {
      const movies = await Movie.findAll()

      res.status(200).json({ movies })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MovieController()
