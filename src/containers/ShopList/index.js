import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Dimmer, Loader, Image, Segment, Container } from 'semantic-ui-react';
import './style.css';
import { loadItems, addToCart } from '../../actions';
import ShopItem from '../../components/ShopItem';

const itemsProvider = store => {
    return (
    store.items          //Check for elements and then filter them
        ? store.filter.category === 'All'
            ? store.items
                .filter(item => item.text.toLowerCase().includes(store.filter.search.toLowerCase()))
            : store.items.filter(item => item.category === store.filter.category)
                .filter(item => item.text.toLowerCase().includes(store.filter.search.toLowerCase()))
        : null
    )
}

const mapStateToProps = store => ({
    items: itemsProvider(store) ,
    cart: store.cart,
    lang: store.language
});
const mapDispatchToProps = dispatch => ({
    loadItems:() => dispatch(loadItems()) ,
    addToCart: item => dispatch(addToCart(item))
})

class ShopList extends Component {
    addToCart = (item) => {
        this.props.addToCart(item);
    }
    componentDidMount() {
        !this.props.items && this.props.loadItems();
    }
    render() {
        const { items, cart, lang } = this.props;
        return (
            <div>
                {
                    !items
                        ? (<Segment className="preloader">
                            <Dimmer active inverted >
                                <Loader>Loading</Loader>
                            </Dimmer>
                        </Segment>)
                        : items.length
                            ? <Card.Group itemsPerRow={4}>
                                {
                                    items.map(item =>
                                        <ShopItem
                                            {...item}
                                            addToCart={this.addToCart}
                                            item={item}
                                            cart={cart}
                                            key={item.id}
                                            lang={lang}
                                        />
                                    )
                                }
                            </Card.Group>
                            : <Container textAlign='center'><h2>Nothing Found :(</h2></Container>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);