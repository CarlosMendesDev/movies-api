import express from 'express'
import MoviesRoutes from './routes/MoviesRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

class App {
  constructor() {
    this.server = express()
    this.server.use(express.json())
    this.server.use([MoviesRoutes, UserRoutes])
  };
};

export default new App().server
