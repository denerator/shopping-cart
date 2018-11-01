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
import { Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import ItemInfo from './containers/ItemInfo';
import history from './history';
import Callback  from './components/Callback';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));



ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/item/:itemId' component={ItemInfo} />
				<Route path="/callback" component={Callback}/>
				{/* <Route path='/*' component={NotFound} /> */}
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('root')
);
