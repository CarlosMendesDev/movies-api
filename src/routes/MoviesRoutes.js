import express from 'express'
import MovieController from '../controllers/MovieController.js'
import Auth from '../middlewares/Auth.js'

const router = express.Router()

router.get('/movies-list', Auth.verify, MovieController.moviesList)
router.post('/favorite-movie', Auth.verify, MovieController.favoriteMovie)
router.get('/favorites-list', Auth.verify, MovieController.getFavoriteMoviesList)
router.get('/recomendations-list', Auth.verify, MovieController.getRecomendations)

export default router
