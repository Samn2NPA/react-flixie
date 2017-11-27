import React, { Component } from "react";
import { Box } from "bloomer";
import "./MovieCard.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardGroup,
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
      // <Box className = "MovieCard-Box">
      //     {this.props.movie.title}
      // </Box>

      <Card>
        <CardImg
          top
          width="100%"
          alt="poster card"
          src={this.getSrcPoster(movie.poster_path)}
        />
        <CardBody>
          <CardTitle>{movie.title}</CardTitle>
          <div>

            
          <Collapse isOpen={this.state.isCollapsed}>            
            <CardText>{movie.overview}</CardText>
          </Collapse>
          <Button
              color="primary"
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
