import React, { Component } from "react";
import logo from "./flixie_logo.png";
import "./App.css";
import { Container } from "bloomer";
import "bulma/css/bulma.css";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import { Column } from "bloomer/lib/grid/Column";
import { Columns } from "bloomer/lib/grid/Columns";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
      page: 1
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchMovies(page) {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=" +
      page;
    console.log("Samn: " + url);

    const result = await fetch(url);
    const data = await result.json();
    return data.results;
  }

  async componentDidMount() {
    this.movies = await this.fetchMovies(this.state.page);
    this.setState({
      movies: this.movies,
      isLoading: false
    });
  }

  async onLoadMore() {
    const numpage = this.state.page + 1;
    const newMovies = await this.fetchMovies(numpage);
    this.movieResult = this.state.movies.concat(newMovies);
    this.setState({
      page: numpage,
      movies: this.movieResult
    });
  }

  chunk(array, size) {
    return array.reduce((chunks, item, i) => {
      if (i % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = <h1>LOADING </h1>;
    } else {
      content = (
        <MovieList
          onClickLoadMore={e => this.onLoadMore(e)}
          movies={this.state.movies}
        />
      );
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Flixie</h1>
          </header>

          <Container>
            {/* {content} */

            this.chunk(this.state.movies, 3).map((c, idx) => (
              <Columns isCentered>
                {c.map(m => (
                  <Column isSize="1/3">
                    <MovieCard movie={m} key={m.id} />
                  </Column>
                ))}
              </Columns>
            ))}
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
