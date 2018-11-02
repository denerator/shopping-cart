import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import 'semantic-ui-css/semantic.min.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound';
import ItemInfo from './containers/ItemInfo';
import history from './history';
import Callback from './components/Callback/';
import Auth from './Auth/Auth';
import Profile from './components/Profile';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication();
	}
}

const renderCallback = props => {
	handleAuthentication(props);
	return <Callback {...props} />
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path='/' render={ props => <App auth={auth} { ...props } />} />
				<Route path='/item/:itemId' component={ItemInfo} />
				<Route path="/callback" render={ renderCallback} />
				<Route path='/profile' render={ props => ( !auth.isAuthenticated() ? ( <Redirect to='/' /> ) : ( <Profile auth={auth} {...props} /> ) )} />
					{/* <Route path='/*' component={NotFound} /> */ }
			</Switch>
		</Router>
	</Provider>,
		document.getElementById('root')
	);
