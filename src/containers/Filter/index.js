import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Label, Menu, Icon } from 'semantic-ui-react';
import { setFilter, setSearch } from '../../actions';


const mapStateToProps = store => ({
    filter: store.filter.category
});
const mapDispatchToProps = dispatch => ({
    setFilter: name => dispatch(setFilter(name)),
    setSearch: searchQuery => dispatch(setSearch(searchQuery))
});

class Filter extends Component {
    state = {
        inputValue: ''
    }
    onInputChange = e => {
        this.setState({
            inputValue: e.currentTarget.value
        })
        this.props.setSearch(e.currentTarget.value)
    }
    handleItemClick = (e, { name }) => {
        this.props.setFilter(name);
    }

    render() {
        const { filter } = this.props;
        return (
            <div>
                <Menu vertical>
                    <Menu.Item name='All' active={filter === 'All'} onClick={this.handleItemClick}>
                        All
                    </Menu.Item>

                    <Menu.Item name='TV' active={filter === 'TV'} onClick={this.handleItemClick}>
                        TV
                    </Menu.Item>

                    <Menu.Item name='Phones' active={filter === 'Phones'} onClick={this.handleItemClick}>
                        Phones
                    </Menu.Item>
                    <Menu.Item>
                        <div className="ui input">
                            <input placeholder="Search..." type="text" value={this.state.inputValue} onChange={this.onInputChange} />
                        </div>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);