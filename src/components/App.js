import React from 'react';
import TodoList from './../containers/TodoList';
import Cart from './../containers/Cart';

class App extends React.Component {

	render() {
		return (
			<div className="wrapper">
				<TodoList />
				<Cart />
			</div>
		);
	}
}

export default App;