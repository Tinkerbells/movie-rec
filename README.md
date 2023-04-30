# Movie-rec app

Looking for the next movie or series to watch but don't know where to start? With this app, you can easily find the next movie to watch by picking your favorite genres or find similar based on your favorites.

## Features

- Recommendations based on query
- Recommendations based on genres
- Recommendations based on similar movies or series
- Posters and description(desktop version)

## Tech

- Using [create T3 app](https://create.t3.gg/)
- [Opeanai API](https://github.com/openai/openai-node) as main main api for fetching movie or series title in json format
- Rate limit using radis db [upstash](https://upstash.com/)
- Image and info fetching using [omdb API](https://omdbapi.com/) or [tmdb API](https://developers.themoviedb.org/3/getting-started)
