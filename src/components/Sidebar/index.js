import React, { Component } from 'react';
import { Menu, Accordion, Icon, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { doSignOut } from '../../Firebase';
import { setLang, setSearch, setFilter, setSidebarState } from '../../actions';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CategoryFilter, InputFilter } from '../../containers/Filter';


const mapStateToProps = store => ({
	filter: store.filter.category,
	lang: store.language.lang,
    user: store.user.user,
    sidebarState: store.sidebar.sideBarState,
	role: store.user.user
		? store.user.user.role
		: ''
});

const mapDispatchToProps = dispatch => ({
	setFilter: name => dispatch(setFilter(name)),
	setLang: lang => dispatch(setLang(lang)),
    setSearch: searchQuery => dispatch(setSearch(searchQuery)),
    setSideBarState: () => dispatch(setSidebarState()),
});


class MainSidebar extends Component {
    state = {
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
    render() {
        const { accordeonState } = this.state;
		const { lang, user, filter, sidebarState, handleSidebarHide, setSideBarState} = this.props;
        return (
            <div>
                <Sidebar.Pushable >
                    <Sidebar
                        className="sidebar"
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        onHide={setSideBarState}
                        vertical
                        visible={sidebarState}
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
                    <Sidebar.Pusher className="main-content" dimmed={sidebarState}>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) (MainSidebar);