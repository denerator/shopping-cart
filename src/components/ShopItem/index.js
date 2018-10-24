import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

const ShopItem = ( { text, id, category, price, addToCart, item, cart } ) => {
    const count = cart.reduce( (count,current) => count + ( id == current.id ? 1 : 0 ), 0)
    return (
        <Card>
            <Card.Content>
                <Card.Header>{text}</Card.Header>
                <Card.Meta>
                    <span className='date'>{category}</span>
                </Card.Meta>
                <Card.Description><Icon name='dollar' />{price}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    You have no Friends
                </a>
            </Card.Content>
            <Button onClick={ () => addToCart(item) } >Add to cart { count ? <span>({ count })</span> : '' }</Button>
        </Card>
    );
};

export default ShopItem;