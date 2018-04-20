const React = require('react');
const Helpers = require('../Helpers.js');

//Header bar with Home, About, Tried, Wishlist, and Logout buttons
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSignup: false,
      clickedLogin: false,
      username: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  //Handles form submission for logging in or signing up a new user
  submitForm(e, caller, endpoint) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    let url = 'https://beerme.herokuapp.com/' + endpoint;
    if (this.checkInput(data.username) && this.checkInput(data.password)) {
      Helpers.ajaxCalls('POST', url, data, caller, (data) => {
        sessionStorage.setItem('user', this.state.username);
        this.props.handleClicks('Home');
        this.props.setUserInfo();
      });
    } else {
      alert('Username and password must not contain special characters');
    }
  }

  //Prevents HTML injection to form inputs
  checkInput(input) {
    const forbidden = ['>', '<', '}', '{', '.', ',', '|'];
    for (let i = 0; i < forbidden.length; i++) {
      if (input.includes(forbidden[i])) {
        return false;
      }
    }
    return true;
  }

  //Handles input for login and signup forms
  handleInput(e, input) {
    let inputValue = e.target.value;
    if (input === 'password') {
      this.setState({password: inputValue});
    } else if (input === 'username') {
      this.setState({username: inputValue});
    }
  }

  //Handles clicks for clicking on login and signup titles in header
  //Shows/hides form based on what user clicks on
  handleClicks(click) {
    if (click === 'Login') {
      this.setState({clickedSignup: false});
      this.setState({clickedLogin: !this.state.clickedLogin});
    } else if (click === 'Signup') {
      this.setState({clickedLogin: false});
      this.setState({clickedSignup: !this.state.clickedSignup});
    } else if (click === 'Logout') {
      this.setState({ clickedLogin: false, clickedSignup: false });
      this.props.handleClicks('Logout');
    }
  }

  render() {
    return (
        <div>
          {this.props.user
            ? <div className={this.props.headerStyle}>
                <span className='user'>Welcome, {this.props.user}</span>
                {this.props.underline === 'Home'
                  ? <div style={{'width':'50px'}} className='header-selected'>Home</div>
                  : <div style={{'width':'50px'}} onClick={(e) => {this.props.handleClicks('Home')}}>Home</div>
                }
                <span className='divider'>|</span>
                {this.props.underline === 'About'
                  ? <div style={{'width':'50px'}} className='header-selected'>About</div>
                  : <div style={{'width':'50px'}} onClick={(e) => {this.props.handleClicks('About')}}>About</div>
                }
                <span className='divider'>|</span>
                {this.props.underline === 'Tried'
                  ? <div style={{'width':'133px'}} className='header-selected'>Beers I've Tried</div>
                  : <div style={{'width':'133px'}} onClick={(e) => {this.props.handleClicks('Tried')}}>Beers I've Tried</div>
                }
                <span className='divider'>|</span>
                {this.props.underline === 'WishList'
                  ? <div style={{'width':'100px'}} className='header-selected'>My Wishlist</div>
                  : <div style={{'width':'100px'}} onClick={(e) => {this.props.handleClicks('Wishlist')}}>My Wishlist</div>
                }
                <span style={{'float': 'right'}} onClick={(e) => {this.handleClicks('Logout')}}>Log out</span>
              </div>
            : <div className={this.props.headerStyle}>
                {this.props.underline === 'Home'
                  ? <div style={{'width':'50px'}} className='header-selected'>Home</div>
                  : <div style={{'width':'50px'}} onClick={(e) => {this.props.handleClicks('Home')}}>Home</div>
                }
                <span className='divider'>|</span>
                {this.props.underline === 'About'
                  ? <div style={{'width':'50px'}} className='header-selected'>About</div>
                  : <div style={{'width':'50px'}} onClick={(e) => {this.props.handleClicks('About')}}>About</div>
                }
                <span className='divider'>|</span>
                <div onClick={(e) => {this.handleClicks('Login')}}>Login</div>
                <span className='divider'>|</span>
                {this.state.clickedLogin
                  ? <div className='auth'>
                      <img onClick={(e) => {this.handleClicks('Login')}} id='x-out' alt='' src='img/X-out.jpg'/>
                      <p>Login</p>
                      <form onSubmit={(e) => {this.submitForm(e, 'login form', 'login')}}>
                        <input placeholder={'Enter Username...'} onChange={(e) => {
                          this.handleInput(e, 'username')}
                        }/>
                        <input placeholder={'Enter Password...'} onChange={(e) => {
                          this.handleInput(e, 'password')}
                        }/>
                      <button>Login</button>
                     </form>
                    </div>
                  : null
                }
                <div onClick={(e) => {this.handleClicks('Signup')}}>Sign Up</div>
                  {this.state.clickedSignup
                    ? <div className='auth'>
                        <img onClick={(e) => {this.handleClicks('Signup')}} id='x-out' alt='' src='img/X-out.jpg'/>
                        <p>Sign Up</p>
                        <form onSubmit={(e) => {this.submitForm(e, 'signup user', 'signup')}}>
                          <input placeholder={'Enter Username...'} onChange={(e) => {
                            this.handleInput(e, 'username')}
                          }/>
                          <input placeholder={'Enter Password...'} onChange={(e) => {
                            this.handleInput(e, 'password')}
                          }/>
                        <button>Sign Up</button>
                       </form>
                      </div>
                    : null
                  }
              </div>
          }
        </div>
    );
  }
}

module.exports = Header;