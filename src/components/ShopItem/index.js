import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom" ;
import { FormattedMessage } from 'react-intl';

const ShopItem = ( { text, id, category, price, addToCart, item, cart, lang } ) => {
    const count = cart.reduce( (count,current) => count + ( id === current.id ? 1 : 0 ), 0)
    return (
        <Card>
            <Card.Content>
                <Card.Header>{text}</Card.Header>
                <Card.Meta>
                    <span className='date'>{category}</span>
                </Card.Meta>
                <Card.Description>{ (lang === 'RU' ? price*66 : price) } <Icon name={ (lang === 'RU' ? 'rub' : 'dollar')} /></Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/item/${id}`} ><FormattedMessage id="item.moreInfo" defaultMessage="More info..." />...</Link>
            </Card.Content>
            <Button onClick={ () => addToCart(item) } ><FormattedMessage id="item.addBtn" defaultMessage="Add to cart" /> { count ? <span>({ count })</span> : '' }</Button>
        </Card>
    );
};

export default ShopItem;