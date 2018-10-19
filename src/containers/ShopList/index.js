import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Dimmer, Loader, Image, Segment, Container } from 'semantic-ui-react';
import './style.css';
import { loadArticle } from '../../actions';

const mapStateToProps = store => ({
    items: store.items          //Check for elements and then filter them
        ? store.filter.category == 'All'
            ? store.items
                .filter( item => item.text.toLowerCase().includes( store.filter.search.toLowerCase()) ) 
            : store.items.filter( item => item.category == store.filter.category)
                .filter( item => item.text.toLowerCase().includes( store.filter.search.toLowerCase()) )
        : null         
});
const mapDispatchToProps = dispatch => ({
    loadArticle: dispatch(loadArticle())
})

class ShopList extends Component {

    componentDidMount() {
        !this.props.items && this.props.loadArticle;
    }
    render() {
        const { items } = this.props;
        return (
            <div>
                {
                    !items
                        ? <div>
                            <Segment className="preloader">
                                <Dimmer active inverted >
                                    <Loader>Loading</Loader>
                                </Dimmer>
                            </Segment>

                        </div>
                        : items.length 
                            ?   <Card.Group itemsPerRow={4}>
                                    {
                                        items.map(item =>
                                            <Card key={item.id} >
                                                <Card.Content>
                                                    <Card.Header>{item.text}</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>{item.category}</span>
                                                    </Card.Meta>
                                                    <Card.Description><Icon name='dollar' />{item.price}</Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <a>
                                                        <Icon name='user' />
                                                        You have no Friends
                                            </a>
                                                </Card.Content>
                                            </Card>)
                                    }
                                </Card.Group>
                            : <Container textAlign='center'><h2>Nothing Found :(</h2></Container>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);