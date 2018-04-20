const React = require('react');
const ReactDOM = require('react-dom');
const Favicon = require('react-favicon');
const About = require('./components/About.jsx');
const BeerList = require('./components/BeerList.jsx');
const Search = require('./components/Search.jsx');
const Header = require('./components/Header.jsx');
const WishListList = require('./components/WishListList.jsx');
const TriedList = require('./components/TriedList.jsx');
const Helpers = require('./Helpers.js');

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
    this.searchedBeers = this.searchedBeers.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.addOrRemoveBeer = this.addOrRemoveBeer.bind(this);
  }

  componentDidMount() {
    this.setUserInfo();
  }

  //retrieves user's info (saved beers for tried list and wishlist from server if logged in
  setUserInfo() {
    let currentUser = sessionStorage.getItem('user');
    this.setState({ currentUser: currentUser });
    if (currentUser) {
      let url = 'http://localhost:3000/getUserInfo';
      let data = {username: currentUser};
      Helpers.ajaxCalls('GET', url, data, 'setUserInfo', (info) => {
        this.setState({tried: info.beers, wishList: info.wishList});
      });
    }
  }

  //Adds to, or removes beers from, list of tried beers or wishlist
  addOrRemoveBeer(request, id, endpoint) {
    let data = {username: this.state.currentUser, beerId: id};
    let url = 'http://localhost:3000/' + endpoint;
    Helpers.ajaxCalls(request, url, data, 'saveBeer', (info) => {
      this.setUserInfo();
    });
  }

  //called from Search component, sorts beers based on relevance
  searchedBeers(beerInfo) {
    console.log('beerInfo called: ', beerInfo);
    let sorted = beerInfo.sort((a, b) => {
      return b.relevance - a.relevance;
    });
    this.setState({ beers: sorted });
  }

  //Click handling for clicks for home page, wishlist, tried beer list, and logout on header bar
  handleClicks(click) {
    if (click === 'Home') {
      this.setState({ currentState: 'Home', beers: [] });
    } else if (click === 'Logout') {
        sessionStorage.removeItem('user');
        this.setState({ currentUser: '', beers: [], currentState: 'Home' });
    } else if (click === 'Wishlist') {
        this.setUserInfo();
        this.setState({currentState: 'WishList'});
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
          />
          <BeerList
            beers={this.state.beers}
            addOrRemoveBeer={this.addOrRemoveBeer}
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
            underline={this.state.currentState}
          />
          <TriedList
            user={this.state.currentUser}
            tried={this.state.tried}
            setUserInfo={this.setUserInfo}
            handleClicks={this.handleClicks}
            addOrRemoveBeer={this.addOrRemoveBeer}
          />
        </div>
      )
    } else if (this.state.currentState === 'WishList') {
      return (
        <div>
          <Header
            user={this.state.currentUser}
            headerStyle={'header-wishList'}
            handleClicks={this.handleClicks}
            underline={this.state.currentState}
          />
          <WishListList
            user={this.state.currentUser}
            addOrRemoveBeer={this.addOrRemoveBeer}
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

ReactDOM.render(
  <div>
    <App />
    <Favicon url='img/beer-favicon.png'/>
  </div>
  , document.getElementById('app')
);