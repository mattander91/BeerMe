import React from 'react';
import $ from 'jquery';
import BeerList from './BeerList.js';
import Search from './Search.js';
import Header from './Header.js';
import WishListList from './WishListList.js';
import TriedList from './TriedList.js';

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
    this.handleHome = this.handleHome.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.saveBeer = this.saveBeer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.searchedBeers = this.searchedBeers.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.handleTried = this.handleTried.bind(this);
    this.removeBeer = this.removeBeer.bind(this);
    this.handleWishList = this.handleWishList.bind(this);
  }

  componentDidMount() {
    this.setUserInfo();
  }

  setUserInfo() {
    let currentUser = sessionStorage.getItem('user');
    this.setState({
      currentUser: currentUser
    });
    if (currentUser) {
      $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3001/getUserInfo',
        data: {username: currentUser},
        success: (userInfo) => {
          this.setState({
            tried: userInfo.beers,
            wishList: userInfo.wishList
          });
        },
        error: (data) => {
          console.log('ajax get request failed; ', data);
        }
      });
    }
  }

  saveBeer(beer) {
    let user = this.state.currentUser;
    let list = beer.currentTarget.dataset.list;
    if (user) {
      let addBeer = {username: user, beerId: beer.currentTarget.dataset.id};
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:3001/' + list,
        data: addBeer,
        success: () => {
          this.setUserInfo();
        },
        error: (err) => {
          console.log('ajax post failed')
        }
      });
    } else {
      console.log('no user logged in');
    }
  }

  removeBeer(beer) {
    let user = this.state.currentUser;
    let list = beer.currentTarget.dataset.list;
    if (user) {
      let removeBeer = {username: user, id: beer.currentTarget.dataset.id}
      $.ajax({
        type: 'DELETE',
        url: 'http://127.0.0.1:3001/' + list,
        data: removeBeer,
        success: () => {
          this.setUserInfo();
        },
        failure: (err) => {
          console.log(err);
        }
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

///////////////////////////////////////////////////

  handleHome() {
    this.setState({
      currentState: 'Home',
      beers: []
    });
  }

  handleLoginClick() {
    this.setState({
      currentState: 'Login'
    });
  }

  handleSignupClick() {
    this.setState({
      currentState: 'Signup'
    });
  }

  handleLogout() {
    sessionStorage.removeItem('user');
    this.setState({
      currentUser: '',
      beers: [],
      currentState: 'Home'
    });
  }

  handleTried() {
    this.setUserInfo();
    this.setState({
      currentState: 'Tried'
    });
  }

  handleWishList() {
    this.setUserInfo();
    this.setState({
      currentState: 'wishList'
    });
  }

///////////////////////////////////////////////////

  render() {
    if (this.state.currentState === 'Home') {
      return (
        <div className="master">
          <Header
            handleLoginClick={this.handleLoginClick}
            handleSignupClick={this.handleSignupClick}
            handleLogout={this.handleLogout}
            handleTried={this.handleTried}
            user={this.state.currentUser}
            setUserInfo={this.setUserInfo}
            handleWishList={this.handleWishList}
            headerStyle={'header'}
            handleHome={this.handleHome}
            hideHome={true}
          />
          <Search
            searchedBeers={this.searchedBeers}
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
            handleLogout={this.handleLogout}
            handleTried={this.handleTried}
            handleWishList={this.handleWishList}
            user={this.state.currentUser}
            handleHome={this.handleHome}
            headerStyle={'header-tried'}
          />
          <TriedList
            user={this.state.currentUser}
            tried={this.state.tried}
            removeBeer={this.removeBeer}
            handleHome={this.handleHome}
            setUserInfo={this.setUserInfo}
          />
        </div>
      )
    } else if (this.state.currentState === 'wishList') {
      return (
        <div>
          <Header
            handleLogout={this.handleLogout}
            handleTried={this.handleTried}
            user={this.state.currentUser}
            handleHome={this.handleHome}
            handleWishList={this.handleWishList}
            headerStyle={'header-wishList'}
          />
          <WishListList
            user={this.state.currentUser}
            removeBeer={this.removeBeer}
            wishList={this.state.wishList}
            handleHome={this.handleHome}
          />
        </div>
      )
    }
  }

}

export default App;