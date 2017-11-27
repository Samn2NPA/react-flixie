import React, { Component } from 'react'
import MovieCard from "./MovieCard"
import { Button } from 'bloomer/lib/elements/Button';
import { CardColumns } from 'reactstrap';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Column } from 'bloomer/lib/grid/Column';

export default class MovieList extends Component {
    render() {
        const {onClickLoadMore} = this.props; //another way to pass sth from parent

        return (
            <div>
            <Columns>
                {this.props.movies.map(m => <MovieCard key={m.id} movie={m} />)}
            
            </Columns>            

            <Button isLoading={this.props.isLoading} isColor="info" onClick={onClickLoadMore}>Load more</Button>

            </div>
        )
    }
}
