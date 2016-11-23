import React, {Component}  from 'react';
import Board from './Board';
import BoardForm from './BoardForm';
import $ from 'jquery';

class Boards extends Component {
	constructor(props) {
		super(props);
		this.getBoards = this.getBoards.bind(this);
		this.addBoard = this.addBoard.bind(this);
		this.state = { boards: []}; 
	}

	componentDidMount() {
		this.getBoards();
	}

	getBoards(){
		$.ajax({
			url: '/boards',
			type: 'GET',
			dataType: 'JSON'
		}).done( boards => {
			this.setState({ boards: boards});
		}).fail( msg => {
			console.log(msg)
		});
	}

	addBoard(board){
		this.setState({ boards: [...this.state.boards, board] });
	}

	render() {
		let boards = this.state.boards.map( board => {
			return(<Board refresh={this.getBoards} key={`board-${board._id}`}{...board} />);
		});
		return(
			<div>
				<BoardForm addBoard={this.addBoard}/>
				<div className='row'>
					{ boards }
				</div>
			</div>
		);
	}
}

export default Boards;