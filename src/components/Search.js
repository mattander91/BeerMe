import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onSearchChange = this.onSearchChange.bind(this);
    this.search = this.search.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onSearchChange (event) {
    let searchedTerm = event.target.value;
    this.setState({
      term: searchedTerm
    });
  }

  search(e) {
    e.preventDefault();
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
      },
      error: (err) => {
        console.log('ajax post failed')
      }
    });
  }

  resetForm() {
    document.getElementById("searchInput").reset();
  }

  render() {
    return (
      <div>
        <h1 id="title">Beer Me</h1>
        <div className="search">
          <form id="searchInput" onSubmit={(e) => {
            this.search(e);
            this.resetForm(e)}}>
            <input type="text" placeholder={'Search beers...'} onChange={ event =>
              this.onSearchChange(event)}/>
            <button>
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Search;