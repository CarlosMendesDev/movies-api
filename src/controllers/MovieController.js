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
      res.status(error?.status || error.request.res.statusCode).json({
        code: error?.status || error.request.res.statusCode,
        message: error?.msg || error.request.res.statusMessage
      })
    }
  }

  async favoriteMovie(req, res) {
    try {
      const { movie_id } = req.body

      if (!movie_id) throw { msg: 'BAD REQUEST: required parameters {movie_id}', status: 500 }

      const { email_user } = req.decoded

      const { data: movieDetails, status } = await apiTMDB.get(`/movie/${movie_id}?api_key=${process.env.API_KEY}&language=pt-BR`)

      const [ movie, statusCreated ] = await Movie.findOrCreate({
        where: { email_user, movie_id },
        defaults: {
          movie_id: movieDetails.id,
          title: movieDetails.title,
          genres: movieDetails.genres,
          email_user,
        }
      })

      res.status(status).json({
        message: statusCreated ? 'CREATED' : 'Already favorite movie',
        movie: statusCreated ? movie : null 
      })
    } catch (error) {
      res.status(error?.status || error.request.res.statusCode).json({
        code: error?.status || error.request.res.statusCode,
        message: error?.msg || error.request.res.statusMessage
      })
    }
  }

  async getFavoriteMoviesList(req, res) {
    try {
      const { email_user } = req.decoded

      const movies = await Movie.findAll({ where: { email_user } })

      res.status(200).json({ movies })
    } catch (error) {
      console.log(error)
    }
  }

  async getRecomendations(req, res) {
    try {
      const { email_user } = req.decoded

      const movies = await Movie.findAll({ where: { email_user } })

      if (!movies.length) throw { msg: 'NOT FOUND', status: 404 }

      const genres = movies.flatMap((movie) => {
        const genre_ids = movie.genres.map(genre => genre.id)

        return genre_ids
      })

      const { data, status } = await apiTMDB.get(`/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genres.join('|')}&language=pt-BR`)

      res.status(status).json(data)
    } catch (error) {
      res.status(error?.status || error.request.res.statusCode).json({
        code: error?.status || error.request.res.statusCode,
        message: error?.msg || error.request.res.statusMessage
      })
    }
  }
}

export default new MovieController()
