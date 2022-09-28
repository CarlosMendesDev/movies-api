import 'dotenv/config'
import cron from 'node-cron';
import server from './app.js'
import SendRecomendation from './services/SendMailRecomendationService.js'

server.listen(process.env.PORT, () => {
  cron.schedule('*/2 * * * *', SendRecomendation)
  console.log(`Start server on port ${process.env.PORT}! :D`)
})
