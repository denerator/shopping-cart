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
    password: '',
    error: null,
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    onSubmit = e => {
        const { email, password } = this.state; 
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword( email, password ) 
            .then( u => console.log( u ))
            .catch( err => console.log(err))
        this.setState({...INITIAL_STATE});
        history.push('/');
    }
    render() {
        const { email, password, error } = this.state;
        const isInvalid =
            password === '' ||
            email === '' ;
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                    <button type="submit" disabled={isInvalid}>
                        Sign In
                    </button>
                    <Link to="/signup">Sign Up</Link>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}

export default SignIn;