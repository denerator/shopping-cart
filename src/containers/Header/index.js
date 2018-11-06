import React from 'react';
import { connect } from 'react-redux';
//import Header from './../../components/Header';
import { deleteFromCart, setLang } from '../../actions';
import { uniqBy } from 'lodash';
import './style.css';
import { Menu, Icon, Popup, Button } from 'semantic-ui-react';
import fire from '../../Firebase';
import { Link } from "react-router-dom" ;
import { API_KEY } from '../../constans/API'


const mapStateToProps = store => ({
    total: store.cart.reduce((total, current) => total + current.price, 0),
    cart: uniqBy(store.cart, item => item.id),
    lang: store.language
});
const mapDispatchToProps = dispatch => ({
    deleteFromCart: id => dispatch(deleteFromCart(id)),
    setLang: lang => dispatch(setLang(lang))
});

const CartComponent = ({ text, price, id, deleteItem }) => {
    return (
        <li className="cart-item" >
            <span>{text} - {price}<Icon name='dollar' /></span>
            <Button onClick={() => deleteItem(id)} >Delete</Button>
        </li>
    );

};
const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
        console.log(user);
    })
}
class Header extends React.Component {
    componentDidMount() {
        fire.auth().onAuthStateChanged( user => {
            console.log( user );
        });
        fetch(`http://api.ipstack.com/check?access_key=${API_KEY}`)
            .then( responce => responce.json())
            .then( responce => this.props.setLang( responce.country_name === 'Ukraine' || 'Russia' ? 'RU' : 'EN' ))
    }
    setLang = (e, {name}) => {
        this.props.setLang(name);
    }
    render() {
        const { total, cart, deleteFromCart, lang } = this.props;
        return (
            <div>
                <Menu>
                    <Menu.Item>Online store</Menu.Item>
                    <Menu.Menu position="right" >
                        <Menu.Item>
                            <Menu>
                                <Menu.Item onClick={this.setLang} name="EN" active={ lang === 'EN' } >EN</Menu.Item>
                                <Menu.Item onClick={this.setLang} name="RU" active={ lang === 'RU' }>RU</Menu.Item>
                            </Menu>
                        </Menu.Item>
                        <Menu.Item className="authorization">
                            <Link to='/signin' >Sign In</Link>
                        </Menu.Item>
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);