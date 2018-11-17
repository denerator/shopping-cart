import React from 'react';
import { connect } from 'react-redux';
import { deleteFromCart, setLang, loadItems, fetchIP, setUser } from '../../actions';
import { uniqBy } from 'lodash';
import './style.css';
import { Menu, Icon, Popup, Button, Responsive } from 'semantic-ui-react';
import fire from '../../Firebase';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import { doSignOut } from '../../Firebase';

const mapStateToProps = store => ({
    total: store.cart.reduce((total, current) => total + current.price, 0),
    cart: store.cart,  //uniqBy(store.cart, item => item.id),
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

const CartComponent = ({ text, price, id, deleteItem, cart }) => {
    const amount = cart.reduce((cnt, current) => cnt + (current.id === id ? 1 : 0), 0);
    return (
        <li className="cart-item" >
            <span>{text} - {price}<Icon name='dollar' /> x{amount}</span>
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
                        this.props.setUser({ ...user, role: (qs.data() ? qs.data().role : 'user') })
                    })
                : this.props.setUser(user)

        });
        !this.props.lang && this.props.fetchIP();
    }
    setLang = (lang) => {
        this.props.setLang(lang);
    }
    render() {
        const { total, cart, deleteFromCart, lang, user, sidebarState, show, hide } = this.props;
        return (
            <div className="header">
                <Responsive maxWidth={585}>
                    {
                        sidebarState
                            ? <Button onClick={hide}>
                                <Icon name="close" />
                            </Button>
                            : <Button onClick={show}>
                                <Icon name="bars" />
                            </Button>
                    }
                </Responsive>
                <div className="logo">
                    <FormattedMessage id="site.name" defaultMessage="Online store" />
                </div>
                <div className="right">
                    <Responsive minWidth={585} >
                        <div className="lang">
                            <button className={(lang === 'EN' ? 'active' : '')} onClick={() => this.setLang('EN')} name="EN" active={lang === 'EN'} >EN</button>|
                            <button className={(lang === 'RU' ? 'active' : '')} onClick={() => this.setLang('RU')} name="RU" active={lang === 'RU'}>RU</button>
                        </div>
                        <div className="auth">
                            {
                                user
                                    ? <span><Responsive minWidth={768}>{user.email}</Responsive><button onClick={doSignOut} ><Icon name='log out' /></button></span>
                                    : <Link to='/signin' >Sign In</Link>
                            }
                        </div>
                    </Responsive>
                    <div className="cart">
                        <div className="total">
                            {total} <Icon name={(lang === 'RU' ? 'rub' : 'dollar')} />
                        </div>
                        <Popup
                            trigger={<div><Icon name='cart' /> {cart.length ? <span>({cart.length})</span> : ''}</div>}
                            on='click'
                            content={
                                cart.length
                                    ? <ul>{uniqBy(cart, item => item.id).map(item =>
                                        <CartComponent
                                            key={item.id}
                                            deleteItem={deleteFromCart}
                                            cart={cart}
                                            {...item} />
                                    )}</ul>
                                    : <h4>Nothing is here yet</h4>
                            }
                            className="cart_popup"
                            position='bottom right'
                        />
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);