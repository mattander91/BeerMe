import React from 'react';
import Helpers from '../Helpers.js';

//Handles search for beers
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      showLoader: false
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
  }

  //Handle search input change
  onSearchChange (e) {
    let searchedTerm = e.target.value;
    this.setState({ term: searchedTerm });
  }

  //Turn loading gif off or on
  handleLoader() {
    this.setState({showLoader: !this.state.showLoader});
  }

  search(e) {
    e.preventDefault();
    if (this.state.term.length > 0) { //only send call if user searched for something
      this.handleLoader();  //Turn loading gif on
      let data = { searched: Helpers.preventInjection(this.state.term) }; //Prevents html injection
      let url = 'https://beerme.herokuapp.com/beers';
      Helpers.ajaxCalls('GET', url, data, 'search', (data) => {
        if (data[0].noData) {
          this.props.searchedBeers(data);
        } else {
          console.log('data: ', data);
          this.props.searchedBeers(data); //Sets beer array state on App component
        }
        this.handleLoader();  //Turn loading gif off
        this.setState({term: ''});
        document.getElementById('searchInput').reset();
      });
    } else {
      alert('Search for a beer in the search bar!');
    }
  }

  render() {
    return (
      <div>
        <h1 id='title'>Beer Me</h1>
        <div className='search'>
          <form id='searchInput' onSubmit={(e) => {this.search(e)}}>
            <input type='text' placeholder={'Search beers...'}
              onChange={(e) => {this.onSearchChange(e)}}/>
            <button>Search</button>
          </form>
        </div>
        {this.state.showLoader
            /* Show/hide loading gif */
          ? <img alt='' id='loading' src='img/beerLoader.gif'/>
          : null
        }
      </div>
    )
  }
}

export default Search;