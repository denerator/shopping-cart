import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../actions';

const mapStateToProps = store => ({
    items: store.items
});
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
});

class AdminPanel extends Component {
    state = {
        isOpened: false,
        inputTitle: '',
        inputCategory: '',
        inputPrice: '',
    }
    visibilityToggle = () => {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }
    handleInput = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    validator = () => {
        const { inputCategory, inputTitle, inputPrice } = this.state;
        if (inputCategory === '' || inputTitle === '' || inputPrice === '') {
            return true
        } else {
            return false
        }
    }
    onSubmit = (e) => {
        const { inputCategory, inputTitle, inputPrice } = this.state;
        e.preventDefault();
        const item = {
            id: +Date.now(),
            text: inputTitle,
            category: inputCategory,
            price: inputPrice
        };
        console.log(item);
        this.props.addItem(item);
        this.setState({
            inputTitle: '',
            inputCategory: '',
            inputPrice: '',
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.isOpened
                        ? <button className="floatBtn" onClick={this.visibilityToggle}>-</button>
                        : <button className="fixed floatBtn" onClick={this.visibilityToggle}>+</button>
                }
                {
                    this.state.isOpened
                        ? <form>
                            <label>Title :<input value={this.state.inputTitle} onChange={(e) => this.handleInput(e, 'inputTitle')} type="text" /></label>
                            <label>Category: <input value={this.state.inputCategory} onChange={(e) => this.handleInput(e, 'inputCategory')} type="text" /></label>
                            <label>price: <input value={this.state.inputPrice} onChange={(e) => this.handleInput(e, 'inputPrice')} type="number" /></label>

                            <button disabled={this.validator()} type="submit" onClick={this.onSubmit}>Add</button>
                        </form>
                        : ''
                }
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanel);