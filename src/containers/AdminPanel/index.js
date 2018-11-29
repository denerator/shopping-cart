import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../actions';
import { Modal } from 'semantic-ui-react';
import './style.css';

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
            <Modal
                className="new-item-modal"
                trigger={
                    this.state.isOpened
                        ? <button className="floatBtn" onClick={this.visibilityToggle}>-</button>
                        : <button className="fixed floatBtn" onClick={this.visibilityToggle}>+</button>
                }
                open={this.state.isOpened}
                onClose={this.visibilityToggle}
            >
                <Modal.Header>Add new item :</Modal.Header>
                <Modal.Content>
                    <form className="new-item-form">
                        <div className="form-item">
                            <label>Title :<br/><input value={this.state.inputTitle} onChange={(e) => this.handleInput(e, 'inputTitle')} type="text" /></label>
                        </div>
                        <div className="form-item">
                            <label>Category: <br/><input value={this.state.inputCategory} onChange={(e) => this.handleInput(e, 'inputCategory')} type="text" /></label>
                        </div>
                        <div className="form-item">
                            <label>price: <br/><input value={this.state.inputPrice} onChange={(e) => this.handleInput(e, 'inputPrice')} type="number" /></label>
                        </div>
                        <button disabled={this.validator()} type="submit" onClick={this.onSubmit}>Add</button>
                    </form>
                </Modal.Content>
            </Modal>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminPanel);