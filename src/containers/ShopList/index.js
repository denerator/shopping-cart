import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';
import './style.css';
import { loadArticle } from '../../actions';

const mapStateToProps = store => ({
    items: store.items
});
const mapDispatchToProps = dispatch => ({
    loadArticle: () => dispatch(loadArticle())
})

class ShopList extends Component {

    componentDidMount() {
        console.log(this.props.loadArticle)
    }
    render() {
        const { items } = this.props;
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                    {
                        items.map(item =>
                            <Card key={item.id} >
                                <Card.Content>
                                    <Card.Header>{item.text}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in 2015</span>
                                    </Card.Meta>
                                    <Card.Description>{item.price}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='user' />
                                        22 Friends
                                </a>
                                </Card.Content>
                            </Card>)
                    }

                </Card.Group>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);