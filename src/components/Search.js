import React from 'react';
import $ from 'jquery';

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
    this.setState({
      term: searchedTerm
    });
  }

  //Show/hide 'spinner' loading gif
  handleSpinner(word) {
    this.setState({showSpinner: !this.state.showSpinner});
  }

  search(e) {
    e.preventDefault();
    if (this.state.term.length > 0) {
      this.handleSpinner();
      let searchObj = {
        searched: this.state.term
      };
      let beerList = [];
      $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3001/beers',
        data: searchObj,
        success: (data) => {
          let parsed = JSON.parse(data);
          if (parsed[0].noData) {
            this.props.searchedBeers(parsed);
          } else {
            parsed.forEach((beer) => {
              beerList.push({name: beer.name, id: beer.id, des: beer.description, icon: beer.icon, abv: beer.abv, brewer: beer.brewer, brewerIcon: beer.brewerIcon, relevance: beer.relevance});
            });
            this.props.searchedBeers(beerList);
          }
          this.handleSpinner();
          this.setState({term: ''});
          document.getElementById("searchInput").reset();
        },
        error: (err) => {
          console.log('ajax post failed');
        }
      });
    } else {
      alert('Search for a beer in the search bar!');
    }
  }


  render() {
    return (
      <div>
        <h1 id="title">Beer Me</h1>
        <div className="search">
          <form id="searchInput" onSubmit={(e) => {
            this.search(e);
          }}>
            <input type="text" placeholder={'Search beers...'}
              onChange={ event =>
              this.onSearchChange(event)}/>
            <button>
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
          </form>
        </div>
        {this.state.showSpinner
          ? <img id="loading" src="img/beerLoader.gif"/>
          : null
        }
      </div>
    )
  }
}

export default Search;