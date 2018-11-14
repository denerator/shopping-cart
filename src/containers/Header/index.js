import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, setLang, loadItems, fetchIP, setUser } from '../../actions';
import { uniqBy } from 'lodash';
import './style.css';
import { Menu, Icon, Popup, Button } from 'semantic-ui-react';
import fire from '../../Firebase';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { doSignOut } from '../../Firebase';

const mapStateToProps = store => ({
    total: store.cart.reduce((total, current) => total + current.price, 0),
    cart: uniqBy(store.cart, item => item.id),
    lang: store.language,
    user: store.user.user
});
const mapDispatchToProps = dispatch => ({
    deleteFromCart: id => dispatch(deleteFromCart(id)),
    setLang: lang => dispatch(setLang(lang)),
    loadItems: () => dispatch(loadItems()),
    fetchIP: () => dispatch(fetchIP()),
    setUser: user => dispatch(setUser(user)),
});

const CartComponent = ({ text, price, id, deleteItem }) => {
    return (
        <li className="cart-item" >
            <span>{text} - {price}<Icon name='dollar' /></span>
            <Button onClick={() => deleteItem(id)} >Delete</Button>
        </li>
    );

};
class Header extends React.Component {
    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            user
                ? fire.firestore().collection("users").doc(user.uid).get()
                    .then(qs => {                            
                        this.props.setUser({...user, role: (qs.data() ? qs.data().role : 'user' )}) 
                    })
                : this.props.setUser(user)

        });
        !this.props.lang && this.props.fetchIP();
    }
    setLang = (e, { name }) => {
        this.props.setLang(name);
    }
    render() {
        const { total, cart, deleteFromCart, lang, user } = this.props;
        return (
            <div>
                <Menu>
                    <Menu.Item><FormattedMessage id="site.name" defaultMessage="Online store" /></Menu.Item>
                    <Menu.Menu position="right" >
                        <Menu.Item>
                            <Menu>
                                <Menu.Item onClick={this.setLang} name="EN" active={lang === 'EN'} >EN</Menu.Item>
                                <Menu.Item onClick={this.setLang} name="RU" active={lang === 'RU'}>RU</Menu.Item>
                            </Menu>
                        </Menu.Item>
                        <Menu.Item className="authorization">
                            {
                                user
                                    ? <span>{user.email}<Button onClick={doSignOut} >Sign Out</Button></span>
                                    : <Link to='/signin' >Sign In</Link>
                            }
                        </Menu.Item>
                        <Menu.Item><FormattedMessage id="cart.total" defaultMessage="Total" /> : {total} <Icon name={(lang === 'RU' ? 'rub' : 'dollar')} /></Menu.Item>
                        <Popup
                            trigger={<Menu.Item><FormattedMessage id="cart.title" defaultMessage="Cart" /> {cart.length ? <span>({cart.length})</span> : ''}</Menu.Item>}
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