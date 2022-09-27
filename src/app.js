import express from 'express'
import MoviesRoutes from './routes/MoviesRoutes.js'

class App {
  constructor() {
    this.server = express()
    this.server.use(express.json())
    this.server.use([MoviesRoutes])
  };
};

export default new App().server
