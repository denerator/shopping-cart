import React, { Component } from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';

class App extends Component {

	render() {
		return (
			<Container>
				<Header />
				<ShopList />
			</Container>
		);
	}
}

export default App;