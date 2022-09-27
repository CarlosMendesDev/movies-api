import express from 'express'
import UserController from '../controllers/UserController.js'
import AuthController from '../controllers/AuthController.js'
import Auth from '../middlewares/Auth.js'

const router = express.Router()

router.post('/login', AuthController.login)
router.post('/save-user', UserController.saveUser)

export default router
