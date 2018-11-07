import React, { Component } from 'react';
import fire from '../../Firebase';
import { Link } from 'react-router-dom';
import history from '../../history';
import {connect} from 'react-redux';
import { setUser } from '../../actions';

const mapStateToProps = store => ({
    user: store.user,
});
const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch( setUser(user) ),
});

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
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                this.props.setUser(user.user);
                console.log(user);
                this.setState({ ...INITIAL_STATE });
                history.push('/');
            })
            .catch(error => this.setState({error}))

    }
    render() {
        const { email, password, error } = this.state;
        const isInvalid =
            password === '' ||
            email === '';
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

export default connect( mapStateToProps, mapDispatchToProps ) (SignIn);