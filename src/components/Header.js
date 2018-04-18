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
    this.clickLogin = this.clickLogin.bind(this);
    this.clickSignup = this.clickSignup.bind(this);
    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleLoginUsername(e) {
    let username = e.target.value;
    this.setState({
      loginUsername: username
    });
  }

  handleLoginPassword(e) {
    var password = e.target.value;
    this.setState({
      loginPassword: password
    });
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
        this.props.handleHome();
        this.props.setUserInfo();
      },
      error: (err) => {
        alert('Username or password not valid');
        console.log('loginUser failed: ', err);
      }
    });
  }

  handleNewUsername(e) {
    var newUserName = e.target.value;
    this.setState({
      newUserName: newUserName
    });
  }

  handleNewPassword(e) {
    var newPassword = e.target.value;
    this.setState({
      newPassword: newPassword
    });
  }

  signupNewUser(e) {
    e.preventDefault();
    var newUser = {
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

  clickLogin() {
    this.setState({clickedLogin: !this.state.clickedLogin});
  }

  clickSignup() {
    this.setState({clickedSignup: !this.state.clickedSignup});
  }

  logout() {
    this.setState({
      clickedLogin: false,
      clickedSignup: false
    });
    this.props.handleLogout();
  }

  render() {
    return (
        <div className="header">
          <span onClick={this.props.handleHome}>Home</span> &nbsp;
          {this.props.user
            ?
              <div style={{"display":"inline-block"}}>
                <span onClick={this.logout}>Log out</span> &nbsp;
                <span onClick={this.props.handleTried}>Beers I've Tried</span> &nbsp;
                <span onClick={this.props.handleWishList}>Wishlist</span>
              </div>
            :
              <div style={{"display":"inline-block"}}>
                <span onClick={this.clickLogin}>Login</span> &nbsp;
                  {this.state.clickedLogin
                    ?
                      <div className="auth">
                        <p>Login</p>
                        <form onSubmit={this.loginUser}>
                          <input placeholder={'Enter Username'} onChange={(event) => {
                            this.handleLoginUsername(event)}
                          }/>
                          <input placeholder={'Enter Password'} onChange={(event) => {
                            this.handleLoginPassword(event)}
                          }/>
                        <button>Login</button>
                        <button onClick={this.clickLogin}>Close</button>
                       </form>
                      </div>
                    : null
                  }
                <span onClick={this.clickSignup}>Sign Up</span>
                  {this.state.clickedSignup
                    ?
                      <div className="auth">
                        <p>Sign Up</p>
                        <form onSubmit={this.signupNewUser}>
                          <input placeholder={'Enter Username'} onChange={(event) => {
                            this.handleNewUsername(event)}
                          }/>
                          <input placeholder={'Enter Password'} onChange={(event) => {
                            this.handleNewPassword(event)}
                          }/>
                        <button>Sign Up</button>
                        <button onClick={this.clickSignup}>Close</button>
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