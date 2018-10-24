import React from 'react';
import { Menu, Icon, Popup, List, Button } from 'semantic-ui-react';
import './style.css';

const CartComponent = ({ text, price, id, deleteItem, cart }) => {
    const count = cart.reduce( (counter, current ) => counter + ( id == current.id ? 1 : 0), 0);
    return (
        <li className="cart-item" >
            <span>{text} - {price} - </span>
            <Icon name='dollar' />
            <span>{count}</span>
            <Button onClick={() => deleteItem({ id, price })} >Delete</Button>
        </li>
    );

};

const Header = ({ total, cart, deleteFromCart }) => (
    <div>
        <Menu>
            <Menu.Item>Online store</Menu.Item>
            <Menu.Menu position="right" >
                <Menu.Item>Total: {total} <Icon name="dollar" /> </Menu.Item>
                <Popup
                    trigger={<Menu.Item>Cart {cart.length ? <span>({cart.length})</span> : ''}</Menu.Item>}
                    on='click'
                    content={
                        cart.length
                            ? cart.map(item => <CartComponent deleteItem={deleteFromCart} cart = {cart} {...item} />)
                            : <h4>Nothing is here yet</h4>
                    }
                    position='bottom right'
                />
            </Menu.Menu>
        </Menu>
    </div>
);


export default Header;