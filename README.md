# movies-api 🎬

## Descrição

Está api foi desenvolvida com objetivo de listar filmes, onde o usuário pode favoritar algum desses filmes e depois receber recomendações baseadas em seus favoritos.

## Rodando local

- A API_KEY do TMDB pode ser gerada <a target="_blank" href="https://developers.themoviedb.org/3/getting-started">aqui</a>;
- Crie um arquivo .env na raiz do projeto adicionando o conteúdo do arquivo .env.example e preenchendo a variável API_KEY com sua chave gerada;
- Siga os comando abaixo para rodar o projeto:
```bash
  npm install # instala todas as dependências
  npm start # roda o projeto na porta 8000
```
Você pode pegar a collection para testar os endpoints aqui:</br>
obs: sugiro que use o Insomnia.</br>
[Insomnia_2022-09-28.zip](https://github.com/CarlosMendesDev/movies-api/files/9666150/Insomnia_2022-09-28.zip)

## Tecnologias utilizadas

- NodeJS
- Express
- Sequelize
- SQLite
- Axios
- API externa: https://developers.themoviedb.org/3
