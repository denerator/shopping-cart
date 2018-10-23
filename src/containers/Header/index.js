import React from 'react';
import { connect } from 'react-redux';
import Header from './../../components/Header';
import { deleteFromCart } from '../../actions';

const mapStateToProps = store => ({
    total: store.cart.total,
    cart : store.cart.cart
});

const mapDispatchToProps = dispatch => ({
    deleteFromCart: cartItem => dispatch(deleteFromCart(cartItem))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);