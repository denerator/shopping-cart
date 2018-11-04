import React, { Component } from 'react';
import Header from './../containers/Header';
import { Container, Grid, Button } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';
import Filter from '../containers/Filter';


class App extends Component {
	
	render() {
		return (
			<Container>
				<Header/>
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