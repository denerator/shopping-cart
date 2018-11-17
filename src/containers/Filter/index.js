import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { setFilter, setSearch } from '../../actions';
import { FormattedMessage } from 'react-intl';

const mapStateToProps = store => ({
    filter: store.filter.category
});
const mapDispatchToProps = dispatch => ({
    setFilter: name => dispatch(setFilter(name)),
    setSearch: searchQuery => dispatch(setSearch(searchQuery))
});

export class CategoryFilter extends Component {
    handleItemClick = (e, { name }) => {
        this.props.setFilter(name);
    }
    render() {
        const { filter } = this.props;
        return (
            <React.Fragment>
                <Menu.Item name='All' active={filter === 'All'} onClick={this.handleItemClick}>
                    <FormattedMessage id="filter.all" defaultMessage="All" />
                </Menu.Item>

                <Menu.Item name='TV' active={filter === 'TV'} onClick={this.handleItemClick}>
                    TV
                    </Menu.Item>

                <Menu.Item name='Phones' active={filter === 'Phones'} onClick={this.handleItemClick}>
                    <FormattedMessage id="filter.phones" defaultMessage="Phones" />
                </Menu.Item>
            </React.Fragment>
        );
    }
}
export class InputFilter extends Component {
    state = {
        inputValue: ''
    }
    onInputChange = e => {
        this.setState({
            inputValue: e.currentTarget.value
        })
        this.props.setSearch(e.currentTarget.value)
    }
    render() {
        return (
            <Menu.Item>
                <div className="ui icon input">
                    <input placeholder="Search..." type="text" value={this.state.inputValue} onChange={this.onInputChange} />
                    <Icon name="search" />
                </div>
            </Menu.Item>
        );
    }
}

class Filter extends Component {

    render() {
        return (
            <Menu vertical>
                <CategoryFilter filter={this.props.filter} setFilter={this.props.setFilter} />
                <InputFilter setSearch={this.props.setSearch} />
            </Menu>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);