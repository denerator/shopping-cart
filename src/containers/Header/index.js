import React from 'react';
import { connect } from 'react-redux';
import Header from './../../components/Header';
import { deleteFromCart } from '../../actions';
import { uniqBy } from 'lodash';

const mapStateToProps = store => ({
    total: store.cart.reduce( (total, current) => total + current.price , 0) ,
    cart : uniqBy(store.cart, item => item.id)
});

const mapDispatchToProps = dispatch => ({
    deleteFromCart: id => dispatch(deleteFromCart(id))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);