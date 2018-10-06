import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './../../components/TodoItem';
import './style.css';
import { addToCart } from '../../actions';

const mapStateToProps = store => ({
	items: store.items
});
const mapDispatchToProps = dispatch => ({
	addToCart: item =>  dispatch(addToCart(item))
});

class TodoList extends React.Component {
	componentDidUpdate() {
		localStorage.setItem('localItems', JSON.stringify(this.props.items));
	}
	addToCart = item => {
		this.props.addToCart(item)
	}
	render(){
		return (
			<div className="todo-list">
				<ul>
					{this.props.items.map(item =>
						<TodoItem key={item.id} id={item.id} text={item.text} price={item.price} onAddToCart={() => this.addToCart(item)} />)
					}

					
				</ul>
			</div>
		);
	}				
	
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);