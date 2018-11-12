import React, { Component } from 'react';
import Header from './../containers/Header';
import { Container, Grid, Button } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';
import Filter from '../containers/Filter';
import fire from '../Firebase';
import SignIn from './SignIn';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl'
import messages from '../messages';
import AdminPanel from '../containers/AdminPanel';

const mapStateToProps = store => ({
	lang: store.language,
	role: store.user.user 
				? store.user.user.role
				: ''
})

class App extends Component {
	render() {
		const { lang, role } = this.props;
		return (
			<IntlProvider locale={lang} messages={messages[lang]}>
				<Container>
					<Header />
					<Grid className="wrapper">
						<Grid.Row>
							<Grid.Column width={12}>
								<ShopList />
							</Grid.Column>
							<Grid.Column width={4}>
								<Filter />
								{
									role === 'admin'
										? <AdminPanel />
										: ''
								}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</IntlProvider>
		)
	}
}

export default connect(mapStateToProps)(App);