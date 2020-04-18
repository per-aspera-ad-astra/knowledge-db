# Knowledge DB
For code snippets you need to use mixin `code` with :verbatim filter inside it:

```sh
+code
    :verbatim
      removeFilm = (movie) => {
      const updateMovies = this.state.movies.filter((item) => {
          return item.id !== movie.id;
        })
        this.setState({
          movies: updateMovies
        })
      }
```