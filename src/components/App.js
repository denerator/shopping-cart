import React, { Component } from 'react';
import Header from './../containers/Header';
import { Container, Grid, Responsive } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';
import Filter from '../containers/Filter';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl'
import messages from '../messages';
import AdminPanel from '../containers/AdminPanel';
import { setLang, setSearch, setFilter } from '../actions';
import Sidebar from './../containers/Sidebar';
import Footer from './Footer';


const mapStateToProps = store => ({
	filter: store.filter.category,
	lang: store.language.lang,
	user: store.user.user,
	role: store.user.user
		? store.user.user.role
		: ''
});

const mapDispatchToProps = dispatch => ({
	setFilter: name => dispatch(setFilter(name)),
	setLang: lang => dispatch(setLang(lang)),
	setSearch: searchQuery => dispatch(setSearch(searchQuery)),
});

class App extends Component {
	render() {
		const { lang, role } = this.props;
		return (
			<IntlProvider locale={lang} messages={messages[lang]}>
				<div>
					<Sidebar>
						<Container>
							<Header />
							<Grid className="wrapper">
								<Grid.Row>
									<Grid.Column computer={12} mobile={16} >
										<ShopList />
									</Grid.Column>
									<Grid.Column computer={4} >
										<Responsive minWidth={984} >
											<Filter />
										</Responsive>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Container>
						<Container>
							<Footer />
						</Container>
					</Sidebar>
					{
						(role === 'admin' || role === 'user')
							? <AdminPanel />
							: ''
					}
				</div>
			</IntlProvider >
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);