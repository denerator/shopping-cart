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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './containers/Header';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/header' component={Header} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);
