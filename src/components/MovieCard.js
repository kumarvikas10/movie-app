import React from 'react';
import styles from '../styles/moviecard.module.css';
import { addFavourites, removeFromFavourites} from '../actions';

class MovieCard extends React.Component{
    handleFavouriteClick = () => {
        const {movie} = this.props;
        this.props.dispatch(addFavourites(movie))
    }
    handleUnFavouriteClick = () => {
      const {movie} = this.props;
      this.props.dispatch(removeFromFavourites(movie));

    }

    render() {
        const {movie, isFavourite} = this.props;
        return (
          <div className={styles.movieCard}>
            <div className={styles.left}>
              <img alt="movie-poster" src={movie.Poster} />
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{movie.Title}</div>
              <div className={styles.plot}>{movie.Plot}</div>
              <div className={styles.footer}>
                <div className="rating">IMDB Rating: {movie.imdbRating}</div>
                <div>
                {
                  isFavourite ? 
                  <button className={styles.unfavouritebtn} onClick={this.handleUnFavouriteClick}>UnFavourite</button>
                  :
                  <button className={styles.favouritebtn} onClick={this.handleFavouriteClick}>Favourite</button>
                }
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default MovieCard;
