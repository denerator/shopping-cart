import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

const ShopItem = ( { text, category, price, addToCart, item } ) => {

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
            <Button onClick={ () => addToCart(item) } >Add to cart</Button>
        </Card>
    );
};

export default ShopItem;