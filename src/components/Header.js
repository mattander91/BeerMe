import React from 'react';
import $ from 'jquery';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSignup: false,
      clickedLogin: false,
      loginUsername: '',
      loginPassword: '',
      newUserName: '',
      newPassword: ''
    }

    this.loginUser = this.loginUser.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
  }

  loginUser(e) {
    e.preventDefault();
    let user = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    }
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3001/login',
      data: user,
      success: () => {
        sessionStorage.setItem('user', this.state.loginUsername);
        this.props.handleClicks('Home');
        this.props.setUserInfo();
      },
      error: (err) => {
        alert('Username or password not valid');
        console.log('loginUser failed: ', err);
      }
    });
  }

  signupNewUser(e) {
    e.preventDefault();
    let newUser = {
      username: this.state.newUserName,
      password: this.state.newPassword
    }
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3001/signUp',
      data: newUser,
      success: (data) => {
        sessionStorage.setItem('user', this.state.newUserName);
        this.props.handleHome();
        this.props.setUserInfo();
      },
      error: (err) => {
        alert('Username already exists. Please try another');
        console.log('Signup failed: ', err);
      }
    });
  }

  handleInput(e, input) {
    let inputValue = e.target.value;
    if (input === 'loginUsername') {
      this.setState({loginUsername: inputValue});
    } else if (input === 'loginPassword') {
      this.setState({'loginPassword': inputValue});
    } else if (input === 'newUserName') {
      this.setState({'newUserName': inputValue});
    } else if (input === 'newPassword') {
      this.setState({'newPassword': inputValue});
    }
  }

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
            ?
              <div className={this.props.headerStyle}>
                <span className="user">Welcome, {this.props.user}</span>
                <span onClick={(e) => {this.props.handleClicks('Wishlist')}}>My Wishlist</span>
                <span className="divider">|</span>
                <span onClick={(e) => {this.props.handleClicks('Tried')}}>Beers I've Tried</span>

                {!this.props.about

                  ? <div><span className="divider">|</span>
                    <span onClick={(e) => {this.props.handleClicks('About')}}>About</span></div>
                  : null

                }
                {!this.props.hideHome
                  ? <div>
                      <span className="divider">|</span>
                      <span onClick={(e) => {this.props.handleClicks('Home')}}>Home</span>
                    </div>
                  : null
                }
                <span style={{"float": "right"}} onClick={(e) => {this.handleClicks('Logout')}}>Log out</span>
              </div>
            :
              <div className={this.props.headerStyle}>
                {this.props.about
                  ? <span onClick={(e) => {this.props.handleClicks('Home')}}>Home</span>
                  : <span onClick={(e) => {this.props.handleClicks('About')}}>About</span>
                }
                <span className="divider">|</span>
                <span onClick={(e) => {this.handleClicks('Login')}}>Login</span>
                <span className="divider">|</span>
                {this.state.clickedLogin
                  ? <div className="auth">
                      <img onClick={(e) => {this.handleClicks('Login')}} id="x-out" src="img/X-out.jpg"/>
                      <p>Login</p>
                      <form onSubmit={this.loginUser}>
                        <input placeholder={'Enter Username...'} onChange={(e) => {
                          this.handleInput(e, 'loginUsername')}
                        }/>
                        <input placeholder={'Enter Password...'} onChange={(e) => {
                          this.handleInput(e, 'loginPassword')}
                        }/>
                      <button>Login</button>
                     </form>
                    </div>
                  : null
                }
                <span onClick={(e) => {this.handleClicks('Signup')}}>Sign Up</span>
                  {this.state.clickedSignup
                    ? <div className="auth">
                        <img onClick={(e) => {this.handleClicks('Signup')}} id="x-out" src="img/X-out.jpg"/>
                        <p>Sign Up</p>
                        <form onSubmit={this.signupNewUser}>
                          <input placeholder={'Enter Username...'} onChange={(e) => {
                            this.handleInput(e, 'newUserName')}
                          }/>
                          <input placeholder={'Enter Password...'} onChange={(e) => {
                            this.handleInput(e, 'newPassword')}
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


export default Header;