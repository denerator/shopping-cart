import React from 'react';
import { Menu, Icon, Popup, Button } from 'semantic-ui-react';
import './style.css';

const CartComponent = ({ text, price, id, deleteItem }) => {
    return (
        <li className="cart-item" >
            <span>{text} - {price}<Icon name='dollar' /></span>
            <Button onClick={() => deleteItem(id)} >Delete</Button>
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
                            ? <ul>{cart.map(item => <CartComponent key={item.id} deleteItem={deleteFromCart} cart={cart} {...item} />)}</ul>
                            : <h4>Nothing is here yet</h4>
                    }
                    className="cart_popup"
                    position='bottom right'
                />
            </Menu.Menu>
        </Menu>
    </div>
);


export default Header;