import 'dotenv/config'
import server from './app.js'

server.listen(process.env.PORT, () => {
  console.log(`Start server on port ${process.env.PORT}! :D`)
})
