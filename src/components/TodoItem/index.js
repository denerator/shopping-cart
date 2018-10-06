import React from 'react';
import './style.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TodoItem extends React.Component {
	state = {
		isEditing: false
	}
	render() {
		const { id, text, price } = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="fade"
				transitionAppear={true}
				transitionAppearTimeout={500}
				transitionEnter={false}
				transitionLeave={true}
				transitionLeaveTimeout={300}
				component="li" >

				<div className={this.state.isEditing ? "todo-item-editing" : "todo-item"}>
					<div>
						{text} - {price}
					</div>
					<div>
						<button className="controll-btn" onClick={this.props.onAddToCart} ><i className="fas fa-plus" ></i> </button>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}




export default TodoItem;