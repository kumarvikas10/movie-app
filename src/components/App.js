import React from "react";
import {connect} from 'react-redux'
import {data} from '../data';
import {addMovies, setShowFavourites} from '../actions'
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import './App.css';
// import {connect} from '../index'

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;
    // store.subscribe(() => {
    //   console.log("UPDATE");
    //   this.forceUpdate();
    // })
    //make api call
    this.props.dispatch(addMovies(data));
    // store.dispatch({
    //   type: 'ADD_MOVIES',
    //   movies: data
    // });
    console.log('STATE', this.props)
  }

  isMovieFavourite = (movie) => {
    const {movies} = this.props; //(movies: {}, result: {})
    const {favourites} = movies;
    const index = favourites.indexOf(movie);
    if (index!==-1){  
      //fount hte movie
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }

  render(){
    const {movies, search} = this.props; //(movies: {}, result: {})
    const {list, favourites, showFavourites} = movies 
    console.log('Render');
    console.log(this.props);
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        {/* <Navbar dispatch={this.props.store.dispatch} search={search} /> */}
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="No Movies">No Movies To Display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    movies: state.movies,
    search: state.movies,
  }
}

const connectAppComponent = connect(mapStateToProps)(App);
export default connectAppComponent;

// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <storeContext.Consumer>
//         {(store) => <App store={store} />}
//       </storeContext.Consumer>
//     );
//   }
// }

// export default AppWrapper;
// export default App;
