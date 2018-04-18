import React from 'react';
import $ from 'jquery';
import BeerList from './BeerList.js';
import Search from './Search.js';
import Header from './Header.js';
import WishListList from './WishListList.js';
import TriedList from './TriedList.js';
import About from './About.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'Home',
      beers: [],
      tried: [],
      wishList: [],
      currentUser: ''
    }
    this.saveBeer = this.saveBeer.bind(this);
    this.searchedBeers = this.searchedBeers.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.removeBeer = this.removeBeer.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.ajaxCalls = this.ajaxCalls.bind(this);
  }

  componentDidMount() {
    this.setUserInfo();
  }

  ajaxCalls(type, url, data, caller, callback) {
    $.ajax({
      type: type,
      url: url,
      data: data,
      success: (data) => {
        callback(data);
      },
      error: (error) => {
        console.log('error on ajax call from ' + caller + ': ' , error);
      }
    });
  }

  setUserInfo() {
    let currentUser = sessionStorage.getItem('user');
    this.setState({
      currentUser: currentUser
    });
    if (currentUser) {
      let url = 'http://127.0.0.1:3001/getUserInfo';
      let data = {username: currentUser};
      this.ajaxCalls('GET', url, data, 'setUserInfo', (info) => {
        this.setState({tried: info.beers, wishList: info.wishList});
      });
    }
  }

  saveBeer(beer) {
    let list = beer.currentTarget.dataset.list;
    if (this.state.currentUser) {
      let data = {username: this.state.currentUser, beerId: beer.currentTarget.dataset.id};
      let url = 'http://127.0.0.1:3001/' + list;
      this.ajaxCalls('POST', url, data, 'saveBeer', (info) => {
        this.setUserInfo();
      })
    } else {
      console.log('no user logged in');
    }
  }

  removeBeer(beer) {
    let list = beer.currentTarget.dataset.list;
    if (this.state.currentUser) {
      let data = {username: this.state.currentUser, id: beer.currentTarget.dataset.id}
      let url = 'http://127.0.0.1:3001/' + list;
      this.ajaxCalls('DELETE', url, data, 'removeBeer', (info) => {
        this.setUserInfo();
      });
    } else {
      console.log('no user logged in');
    }
  }

  searchedBeers(beerInfo) {
    let sorted = beerInfo.sort((a, b) => {
      return b.relevance - a.relevance;
    });
    this.setState({
      beers: sorted
    });
  }

  handleClicks(click) {
    if (click === 'Home') {
      this.setState({ currentState: 'Home', beers: [] });
    } else if (click === 'Logout') {
        sessionStorage.removeItem('user');
        this.setState({ currentUser: '', beers: [], currentState: 'Home' });
    } else if (click === 'Wishlist') {
        this.setUserInfo();
        this.setState({currentState: 'wishList'});
    } else if (click === 'Tried') {
        this.setUserInfo();
        this.setState({currentState: 'Tried'});
    } else {
      this.setState({ currentState: click });
    }
  }

  render() {
    if (this.state.currentState === 'Home') {
      return (
        <div>
          <Header
            user={this.state.currentUser}
            setUserInfo={this.setUserInfo}
            headerStyle={'header'}
            hideHome={true}
            handleClicks={this.handleClicks}
          />
          <Search
            searchedBeers={this.searchedBeers}
            ajaxCalls={this.ajaxCalls}
          />
          <BeerList
            beers={this.state.beers}
            saveBeer={this.saveBeer}
            user={this.state.currentUser}
          />
        </div>
      )
    } else if (this.state.currentState === 'Tried') {
      return (
        <div>
          <Header
            user={this.state.currentUser}
            headerStyle={'header-tried'}
            handleClicks={this.handleClicks}
          />
          <TriedList
            user={this.state.currentUser}
            tried={this.state.tried}
            removeBeer={this.removeBeer}
            setUserInfo={this.setUserInfo}
            handleClicks={this.handleClicks}
          />
        </div>
      )
    } else if (this.state.currentState === 'wishList') {
      return (
        <div>
          <Header
            user={this.state.currentUser}
            headerStyle={'header-wishList'}
            handleClicks={this.handleClicks}
          />
          <WishListList
            user={this.state.currentUser}
            removeBeer={this.removeBeer}
            wishList={this.state.wishList}
            handleClicks={this.handleClicks}
          />
        </div>
      )
    } else if (this.state.currentState === 'About') {
      return (
        <div>
          <Header
            user={this.state.currentUser}
            headerStyle={'header'}
            about={true}
            handleClicks={this.handleClicks}
          />
          <About/>
        </div>
      )
    }
  }

}

export default App;