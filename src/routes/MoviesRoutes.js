import express from 'express'
import MovieController from '../controllers/MovieController.js'

const router = express.Router()

router.get('/movies-list', MovieController.moviesList)

export default router
