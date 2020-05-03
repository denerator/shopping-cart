import React, { Component } from 'react';
import fire, { provider } from '../../Firebase';
import { Link } from 'react-router-dom';
import history from '../../history';
import { Icon } from 'semantic-ui-react';
import './style.css';

const byPropKey = (key, value) => ({
  [key]: value,
});
const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  googleAuth = () => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        console.log(user);
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        history.push('/');
      })
      .catch((error) => this.setState({ error }));
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div className="form-wrap">
        <h2 className="loging-header">Sign In</h2>
        <button className="google-btn" onClick={this.googleAuth}>
          <Icon name="google" />
          Log In with Google
        </button>
        <form onSubmit={this.onSubmit} className="form loging-form">
          <input
            className="form-item"
            value={email}
            onChange={(event) =>
              this.setState(byPropKey('email', event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
          <input
            className="form-item"
            value={password}
            onChange={(event) =>
              this.setState(byPropKey('password', event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <button className="loging-submit" type="submit" disabled={isInvalid}>
            Sign In
          </button>
          <Link to="/signup"> or Sign Up</Link>
          {error && <p className="error">{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default SignIn;
