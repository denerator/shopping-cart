import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Label, Menu } from 'semantic-ui-react';


const mapStateToProps = store => ({

});
const mapDispatchToProps = dispatch => ({

});

class Filter extends Component {
    state = { activeItem: 'inbox' };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
        const { activeItem } = this.state
        return (
            <div>
                <Menu vertical>
                    <Menu.Item name='inbox' active={activeItem === 'inbox'} onClick={this.handleItemClick}>
                        Inbox
                    </Menu.Item>

                    <Menu.Item name='spam' active={activeItem === 'spam'} onClick={this.handleItemClick}>
                        Spam
                    </Menu.Item>

                    <Menu.Item name='updates' active={activeItem === 'updates'} onClick={this.handleItemClick}>
                        Updates
                    </Menu.Item>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search mail...' />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);