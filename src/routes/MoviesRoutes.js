import express from 'express'
import MovieController from '../controllers/MovieController.js'

const router = express.Router()

router.get('/movies-list', MovieController.moviesList)
router.post('/favorite-movie', MovieController.favoriteMovie)
router.get('/favorites-list', MovieController.getFavoriteMoviesList)

export default router
