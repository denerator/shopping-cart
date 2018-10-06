import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
    cart: store.cart.items,
    summ: store.cart.summ
});
const mapDispatchToProps = dispatch => ({

});

class Cart extends React.Component{
    render(){
        return(
            <div>
                <h3>Cart - {this.props.summ} </h3>
                {
                    this.props.cart.map( item => <div key={item.id} >{item.text} - {item.price}</div>)
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cart);