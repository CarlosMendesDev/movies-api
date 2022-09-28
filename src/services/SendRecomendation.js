import transport from '../config/nodemail.js'
import Movie from '../Models/Movies.js'
import User from '../Models/User.js'
import apiTMDB from '../config/axios.js'

export default async function SendRecomendation() {
  const moviesFavorite = await Movie.findAll()

  const moviesUser = moviesFavorite.reduce((list, movieFavorite) => {
    const index = list.findIndex((userMovie) => userMovie.email_user === movieFavorite.email_user)
    const genres = movieFavorite.genres.map((genre) => genre.id)

    if (index > -1) {
      list[index].genres = list[index].genres.concat(genres) 
    } else {
      list.push({
        genres,
        email_user: movieFavorite.email_user
      })
    }
    return list
  }, [])

  for (const user of moviesUser) {
    const UserDetail = await User.findOne({ where: { email_user: user.email_user }})

    const genres = user.genres.join('|')

    const { data } = await apiTMDB.get(`/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genres}&language=pt-BR`)

    const recomendations = data.results.slice(0, 5).map((movie) => `<p> - ${movie.title} </p>`).join(' ')

    const html = `<div>
                    <h1> ${UserDetail.name}, chegou suas recomendações </h1>
                    </br>
                    <p>Filmes que talvez você goste:</p> 
                    ${recomendations}
                  </div>`

    await transport.sendMail({
      to: user.email_user,
      subject: 'Recomendações de filmes',
      html
    })
  }
}
