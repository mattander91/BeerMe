import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      showSpinner: false
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
  }

  onSearchChange (event) {
    let searchedTerm = event.target.value;
    this.setState({ term: searchedTerm });
  }

  handleSpinner(word) {
    this.setState({showSpinner: !this.state.showSpinner});
  }

  search(e) {
    e.preventDefault();
    if (this.state.term.length > 0) {
      this.handleSpinner();
      let data = { searched: this.state.term };
      let url = 'http://127.0.0.1:3001/beers';
      let beerList = [];
      this.props.ajaxCalls('GET', url, data, 'search', (data) => {
        let parsed = JSON.parse(data);
        if (parsed[0].noData) {
          this.props.searchedBeers(parsed);
        } else {
          parsed.forEach((beer) => {
            beerList.push({
              name: beer.name,
              id: beer.id,
              des: beer.description,
              icon: beer.icon,
              abv: beer.abv,
              brewer: beer.brewer,
              brewerIcon: beer.brewerIcon,
              relevance: beer.relevance
            });
          });
          this.props.searchedBeers(beerList);
        }
        this.handleSpinner();
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
        {this.state.showSpinner
          ? <img alt='' id='loading' src='img/beerLoader.gif'/>
          : null
        }
      </div>
    )
  }
}

export default Search;