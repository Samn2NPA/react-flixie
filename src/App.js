import React, { Component } from "react";
import logo from "./flixie_logo.png";
import "./App.css";
import { Container, Title } from "bloomer";
import "bulma/css/bulma.css";
import "./loader.css";
import MovieList from "./MovieList";
import MovieCard from "./MovieCard";
import { Column } from "bloomer/lib/grid/Column";
import { Columns } from "bloomer/lib/grid/Columns";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Button } from "bloomer/lib/elements/Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originMovies: [],
      movies: [],
      isLoading: true,
      page: 1,
      filterValue: ""
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchMovies(page) {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed&page=" +
      page;

    const result = await fetch(url);
    const data = await result.json();
    return data.results;
  }

  async componentDidMount() {
    this.movies = await this.fetchMovies(this.state.page);
    this.sleep(2000);
    this.setState({
      originMovies: this.movies,
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
      originMovies: this.movieResult,
      movies: this.movieResult
    });
  }

  chunk(array, size) {
    //for displaying movieCard in n columns
    return array.reduce((chunks, item, i) => {
      if (i % size === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []);
  }

  filterList(filterValue) {
    let originList = this.state.originMovies;
    //return originList.filter(m => m.title === filterValue);
    return originList.filter((m) => m.title.toLowerCase().includes(filterValue.toLowerCase()))
  }

  handleOnChange(e) {
    let val = e.target.value;
    console.log("filter: " + val);
    let movieFilter = this.filterList(val);
    this.setState({
      filterValue: val,
      movies: movieFilter
    });
  }

  async refreshMovie() {
    this.setState({
      isLoading: true
    })
   
    const page = 1;
    this.movies = await this.fetchMovies(page);
    this.sleep(2000);
    this.setState({
      page,
      originMovies: this.movies,
      movies: this.movies,
      isLoading: false
    });
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = (<div class="loader"> </div>);
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
            <br />
            <Columns isCentered="false">
              <Column isSize="1/4">
              <Title isSize={4}> Search by name: </Title>
              </Column>
              <Column isSize="2/4">
                <Control>
                  <Input
                    type="text"
                    value={this.state.filterValue}
                    placeholder="Enter key words"
                    onChange={this.handleOnChange.bind(this)}
                  />
                </Control>
              </Column>
              <Column isSize="1/4">
                <Button isColor="dark" isOutlined 
                 onClick={() => this.refreshMovie().bind(this)}
                >
                  Refresh
                </Button>
              </Column>
            </Columns>
            <br />
          </Container>

          <Container>
            {/* {content} */

            this.chunk(this.state.movies, 3).map((c, idx) => (
              <Columns isCentered>
                {c.map(m => (
                  <Column isSize="1/3">
                    <MovieCard key={m.id} movie={m} />
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
