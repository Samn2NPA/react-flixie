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

  constructor(props){
    super(props);
    this.state = {
      isCollapsed: false 
    }
  }

  getSrcPoster(poster_path) {
    const defaultPath = "https://image.tmdb.org/t/p/original";
    return defaultPath + poster_path;
  }

  clickMore(){
    this.collaped = this.state.isCollapsed;
    this.collaped == false ? true : false;
    this.setState({
      isCollapsed: this.collaped
    });
  }

  render() {
    const { movie } = this.props;

    return (
      // <Box className = "MovieCard-Box">
      //     {this.props.movie.title}
      // </Box>

        <Card >
          <CardImg
            top width="50%"
            alt="poster card"
            src={this.getSrcPoster(movie.poster_path)}
          />
          <CardBody>
          <CardTitle>{movie.title}</CardTitle>
            <Button color="primary" onClick= {this.clickMore}>More</Button>
            <Collapse isOpen={this.state.isCollapsed}>
            
            <CardText>{movie.overview}</CardText>
            </Collapse>            
          </CardBody>
        </Card>
    
    );
  }
}
