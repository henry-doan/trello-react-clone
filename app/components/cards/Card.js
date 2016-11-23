import React from 'react';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.deleteCard = this.deleteCard.bind(this);
	}

	deleteCard(){
		$.ajax({
		url: `/cards/${this.props._id}`,
		type: 'DELETE',
		dataType: 'JSON'
		}).done( result => {
		 this.props.refresh();
		}).fail( msg => {
		 console.log(msg);
		});
	}

	render(){
		return(
			<div className="col s12">
				<div className="card blue-grey darken-1">
					<div className="card-content white-text">
					  <span className="card-title">{this.props.name}</span>
					  <p>{this.props.description}</p>
					</div>
					<div className="card-action">
					  <a onClick={this.deleteCard}>Delete</a>
					</div>
				 </div>
			</div>
		);
	}
}

export default Card;