import React, { Component } from 'react';
import fire from '../../Firebase';
import { Link } from 'react-router-dom';
import history from '../../history';


const byPropKey = (key, value) => ({
    [key]: value
})
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    onSubmit = e => {
        const { email, passwordOne } = this.state; 
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword( email, passwordOne ) 
            .then( user => {
                console.log( user );
                this.setState({...INITIAL_STATE});
                history.push('/');
            })
            .catch( error => this.setState({error})) 
    }
    render() {
        const { email, passwordOne, passwordTwo, error } = this.state;
        const isInvalid =
            passwordOne === '' ||
            passwordOne !== passwordTwo ||
            email === '' ;
        return (
            <div className="form-wrap">
                <h2 className="loging-header">Sign Up</h2>
                <form onSubmit={this.onSubmit} className="form loging-form">
                    <input
                        className="form-item"
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        className="form-item"
                        value={passwordOne}
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        className="form-item"
                        value={passwordTwo}
                        onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                        type="password"
                        placeholder="Repeat Password"
                    />
                    <button className="loging-submit" type="submit" disabled={isInvalid}>
                        Sign Up
                    </button>
                    <Link to="/signin">Sign In</Link>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default SignIn;