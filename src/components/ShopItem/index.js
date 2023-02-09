import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './style.css';

const ShopItem = ({
  text,
  id,
  category,
  price,
  addToCart,
  item,
  cart,
  lang,
  deleteItem,
  role,
}) => {
  const count = cart.reduce(
    (count, current) => count + (id === current.id ? 1 : 0),
    0
  );
  return (
    <Card className="item">
      <Card.Content>
        <Card.Header>{text}</Card.Header>
        <Card.Meta>
          <span className="date">{category}</span>
        </Card.Meta>
        <Card.Description>
          {lang === 'UA' ? price * 36 : price}
          <Icon name={lang === 'UA' ? 'uah' : 'dollar'} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/item/${id}`}>
          <FormattedMessage id="item.moreInfo" defaultMessage="More info..." />
          ...
        </Link>
      </Card.Content>
      {role === 'admin' ? (
        <button onClick={() => deleteItem(id)}>Delete Item</button>
      ) : (
        ''
      )}
      <Button onClick={() => addToCart(item)}>
        <FormattedMessage id="item.addBtn" defaultMessage="Add to cart" />
        {count ? <span>({count})</span> : ''}
      </Button>
    </Card>
  );
};

export default ShopItem;
