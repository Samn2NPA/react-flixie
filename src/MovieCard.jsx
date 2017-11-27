import React, { Component } from "react";
import voteIcon from "./vote_icon.png";
import calenderIcon from "./calendar_icon.png";
import "./MovieCard.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Collapse
} from "reactstrap";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column } from "bloomer/lib/grid/Column";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.clickMore = this.clickMore.bind(this);
    this.state = {
      isCollapsed: false,
      isMore: "Show more"
    };
  }

  clickMore(collapsed) {
    this.setState({
      isCollapsed: !collapsed,
      isMore: this.state.isMore === "Show more" ? "Show less" : "Show more"
    });
  }

  getSrcPoster(poster_path) {
    const defaultPath = "https://image.tmdb.org/t/p/original";
    return defaultPath + poster_path;
  }

  render() {
    const { movie } = this.props;

    return (
      <Card>
        <CardImg
          top
          width="100%"
          alt="poster card"
          src={this.getSrcPoster(movie.poster_path)}
        />
        <CardBody>
          <CardTitle className="title">{movie.title}</CardTitle>
          <div>
            <Collapse isOpen={this.state.isCollapsed}>
              {" "}
              <Columns>
                <Column isSize="1/2">
                  <img className="icon" src={calenderIcon} alt="calender" />{" "}
                  {movie.release_date}
                </Column>
                <Column isSize="1/2">
                <div className="subtitle">
                {movie.vote_average}
                  <img className="icon" src={voteIcon} alt="votes" />
                  </div>
                </Column>
                <br />
              </Columns>
              <CardText className="content">{movie.overview}</CardText>
            </Collapse>
            <Button
              color="info"
              onClick={() => this.clickMore(this.state.isCollapsed)}
              style={{ marginBottom: "1rem" }}
            >
              {this.state.isMore}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }
}
