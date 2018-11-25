import React, { Component } from 'react';
import Header from './../containers/Header';
import { Container, Grid, Button, Sidebar, Icon, Menu, Responsive, Accordion } from 'semantic-ui-react';
import ShopList from './../containers/ShopList';
import './style.css';
import Filter, { CategoryFilter, InputFilter } from '../containers/Filter';
import fire, { doSignOut } from '../Firebase';
import SignIn from './SignIn';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl'
import messages from '../messages';
import AdminPanel from '../containers/AdminPanel';
import { Link } from 'react-router-dom';
import { setLang, setSearch, setFilter } from '../actions';

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
	state = {
		visible: false,
		accordeonState: false
	}
	handleItemClick = (e, { name }) => {
		this.props.setFilter(name);
	}
	handleAccordeonClick = () => {
		this.setState({
			accordeonState: !this.state.accordeonState
		})
	}
	onInputChange = e => {
		this.props.setSearch(e.currentTarget.value)
	}
	setLang = (lang) => {
		this.props.setLang(lang);
	}
	handleHideClick = () => this.setState({ visible: false })
	handleShowClick = () => this.setState({ visible: true })
	handleSidebarHide = () => this.setState({ visible: false })
	render() {
		const { visible, accordeonState } = this.state;
		const { lang, role, user, filter } = this.props;
		return (
			<IntlProvider locale={lang} messages={messages[lang]}>
				<div>
					<Sidebar.Pushable >
						<Sidebar
							className="sidebar"
							as={Menu}
							animation='push'
							icon='labeled'
							onHide={this.handleSidebarHide}
							vertical
							visible={visible}
							width='thin'
						>
							<Menu.Item className="sidebar-header"><FormattedMessage id="site.name" defaultMessage="Online store" /></Menu.Item>
							<Menu.Item className="input-container" >
								<InputFilter setSearch={this.props.setSearch} />
							</Menu.Item>
							<Menu.Item>
								<Accordion>
									<Accordion.Title onClick={this.handleAccordeonClick}>
										<Icon name='dropdown' />Category: {filter}
									</Accordion.Title>
									<Accordion.Content active={accordeonState}>
										<CategoryFilter filter={filter} setFilter={this.props.setFilter} />
									</Accordion.Content>
								</Accordion>
							</Menu.Item>
							<Menu.Item>
								<button className={(lang === 'EN' ? 'active' : '')} onClick={() => this.setLang('EN')} name="EN" active={lang === 'EN'} >EN</button>|
                            	<button className={(lang === 'RU' ? 'active' : '')} onClick={() => this.setLang('RU')} name="RU" active={lang === 'RU'}>RU</button>
							</Menu.Item>
							<Menu.Item className="authorization">
								{
									user
										? <span>{user.displayName ? `Hi, ${user.displayName}` : user.email}<button onClick={doSignOut} ><Icon name='log out' /></button></span>
										: <Link to='/signin' >Sign In</Link>
								}
							</Menu.Item>
						</Sidebar>
						<Sidebar.Pusher className="main-content" dimmed={visible}>
							<Container>
								<Header sidebarState={visible} hide={this.handleHideClick} show={this.handleShowClick} />
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
						</Sidebar.Pusher>
					</Sidebar.Pushable>
					{
						role === 'admin'
							? <AdminPanel />
							: ''
					}
				</div>
			</IntlProvider >
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);