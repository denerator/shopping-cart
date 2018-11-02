import React from 'react';
import { connect } from 'react-redux';
//import Header from './../../components/Header';
import { deleteFromCart } from '../../actions';
import { uniqBy } from 'lodash';
import './style.css';
import { Menu, Icon, Popup, Button } from 'semantic-ui-react';

const mapStateToProps = store => ({
    total: store.cart.reduce((total, current) => total + current.price, 0),
    cart: uniqBy(store.cart, item => item.id)
});

const mapDispatchToProps = dispatch => ({
    deleteFromCart: id => dispatch(deleteFromCart(id))
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
    state = {
        profile: null
    }
    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            this.setState({ profile: {} });
            const { userProfile, getProfile } = this.props.auth;
            if (!userProfile) {
                getProfile((err, profile) => {
                    this.setState({ profile });
                });
            } else {
                this.setState({ profile: userProfile });
            }
        }
    }
    logout = () => {
        this.props.logout();
        this.setState({
            profile: null
        })
    }
    render() {
        const { total, cart, deleteFromCart, auth, login, logout } = this.props;
        const { profile } = this.state;
        return (
            <div>
                <Menu>
                    <Menu.Item>Online store</Menu.Item>
                    <Menu.Menu position="right" >
                        <Menu.Item className="authorization">
                            {
                                profile
                                    ? (
                                        <React.Fragment>
                                            <img src={profile.picture} alt='profile' />
                                            <span>{profile.nickname}</span>
                                        </React.Fragment>
                                    )
                                    : (
                                        <span>Hi, Guest</span>
                                    )
                            }
                            {
                                !auth.isAuthenticated() && (
                                    <Button
                                        className="btn-margin"
                                        onClick={login}
                                    >
                                        Log In
                      </Button>
                                )
                            }
                            {
                                auth.isAuthenticated() && (
                                    <Button
                                        className="btn-margin"
                                        onClick={this.logout}
                                    >
                                        Log Out
                      </Button>
                                )
                            }
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