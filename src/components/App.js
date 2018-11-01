import React, { Component } from 'react';
import Header from './../containers/Header';
import { Container, Grid, Button } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';
import Filter from '../containers/Filter';
import Auth from './../Auth/Auth.js';


class App extends Component {
	goTo(route) {
		this.props.history.replace(`/${route}`)
	}

	login() {
		this.props.auth.login();
	}

	logout() {
		this.props.auth.logout();
	}
	render() {
		const { isAuthenticated } = this.props.auth;
		return (
			<Container>
				<Header logout={this.logout.bind(this)} login={this.login.bind(this)} auth={ this.props.auth } />
				<Grid className="wrapper">
					<Grid.Row>
						<Grid.Column width={12}>
							<ShopList />
						</Grid.Column>
						<Grid.Column width={4}>
							<Filter />
						</Grid.Column>
					</Grid.Row>
				</Grid>

			</Container>
		)
	}
}
export default App;