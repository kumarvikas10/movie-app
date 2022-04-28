import React from 'react';
import { connect } from 'react-redux';
import {addMovieToList, handleMovieSearch} from '../actions';
import styles from '../styles/navbar.module.css';
// import {storeContext} from '../index'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            searchText: '',
        };
    }
    handleAddToMovies = (movie) => {
        this.props.dispatch(addMovieToList(movie));
        this.setState({
            showSearchResults: false
        });
    }
    
    handleSearch = () => {
        const {searchText} = this.state;
        this.props.dispatch(handleMovieSearch(searchText));
    };

    handleChange= (e) => {
        this.setState({
            searchText: e.target.value
        });
    };

    render(){
        const {result:movie, showSearchResults} = this.props.search;
        return (
            <div className={styles.nav}>
                <img className={styles.img} src="https://upload.wikimedia.org/wikipedia/commons/4/49/GoMovies_Logo.png" alt="logo"/>
                <div className={styles.form}>
                    <div className={styles.search}>
                        <input class={styles.formcontrol} onChange={this.handleChange} type="search" placeholder="Search" />
                        <button class={styles.searchbtn} id="search-btn" onClick={this.handleSearch} type="submit">Search</button>
                    </div>
                    {showSearchResults && 
                      <div className={styles.searchresults}>
                          <div className={styles.searchresult}>
                              <div className={styles.movieimage}><img src={movie.Poster} alt= "search-pic"/></div>
                              <div className={styles.movieinfo}>
                                  <span className={styles.movietitle}>{movie.Title}</span>
                                  <button onClick={() => this.handleAddToMovies(movie)}>
                                      ADD to MOVIES
                                  </button>
                              </div>
                          </div>
                      </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps({search}){
    return{
        search,
    };
}

export default connect(mapStateToProps)(Navbar);

// class NavWrapper extends React.Component{
//     render(){
//       return (
//         <storeContext.Consumer>
//           {(store) => <Navbar dispatch={store.dispatch} search={this.props.search}/> }
//         </storeContext.Consumer>
//       );
//     }
//   }
  


// function Navbar() {
//     return(
//         <div className={styles.nav}>
//             <img className={styles.img} src="https://cdn.gomovies.fan/dist/css/img/logo.png" alt="logo"/>
//             <form className={styles.form}>
//                 <input class={styles.formcontrol} type="search" placeholder="Search" aria-label="Search"/>
//                 <button class={styles.searchbtn} type="submit">Search</button>
//             </form>
//         </div>
//     );
// }

// export default Navbar; 