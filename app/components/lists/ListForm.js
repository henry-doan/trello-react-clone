import React from 'react';
import $ from 'jquery';

class ListForm extends React.Component {
	constructor(props) {
		super(props);
	}

	addList(e){
		e.preventDefault();
		$.ajax({
			url: '/lists',
			type: 'POST',
			dataType: 'JSON',
			data: { name: this.refs.name.value, boardId: this.props.boardId }
		}).done( list => {
			this.props.addList(list);
			this.refs.name.value = null;
		}).fail( msg => {
			console.log(msg);
		});
	}

	render() {
		return (
			<div className='center'>
				<form>
				</form>
			</div>
		)
	}
}
export default ListForm;
