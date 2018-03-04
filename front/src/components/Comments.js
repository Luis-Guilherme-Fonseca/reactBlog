import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardPanel, Col, Row, Modal } from 'react-materialize';
import { fetchComments, editComments } from '../actions';

class Comments extends Component {
	state={
		isOpen: false,
		index: null,
		commentChange: null
	}

	openModal = (index) => {
		this.setState({isOpen: true});
		this.setState({index: index});
	}
	
	closeModal = () => {
		this.setState({isOpen: false});
		this.setState({index: null});
		this.setState({commentChange: null})
	}

	editComment = () => {
		//pega o valor de commentChange e checa se ele e null ou nao, se for null nao faz nada,
		//caso seja diferente de null envia uma requisição para a api.
		if(this.state.commentChange !== null){
			let data = {};
			data.id = this.props.comments['comments'][this.state.index].id;
			data.body = this.state.commentChange;
			data.comments = this.props.comments['comments'];
			data.index = this.state.index;
			this.props.putComment(data)
		}
		this.closeModal()
	}

	componentWillMount(){
		this.props.getComments(this.props.ID)
	}

	render(){
		const {comments} = this.props.comments;
		const {index} = this.state;
		const display = {
			display: 'block'
		};
		const hide = {
			display: 'none'
		};
		return (
			<div>
				{comments != null &&
					comments.map((comment, index) =>
						<Row key={index}>
							{comment != null &&
							<Col key={index + comment.id} s={6} m={4} offset='s3 m4'>
								<CardPanel key={comment.id} className="small">
									<h5 key={comment.author}>{comment.author}</h5>
									<p key={comment.author + index}>{comment.body}</p>
									<button value={index} onClick={(event) => 
										this.openModal(event.target.value)}>
										edit
									</button>
								</CardPanel>
							</Col>
							}
						</Row>
					)
				}
				<Modal fixedFooter
					header='Edit comment'
					actions={
						<div>
							<button className="btn waves-effect waves-light btn-flat modal-action modal-close" onClick={this.closeModal}>Close</button>
							<button className="btn waves-effect waves-light btn-flat modal-action modal-confirm" onClick={this.editComment}>Delete</button>
							<button className="btn waves-effect waves-light btn-flat modal-action modal-confirm" onClick={this.editComment}>Save</button>
						</div>
					}
					style={this.state.isOpen ? display : hide}>
		        	{this.state.isOpen && 
		        		<div>
		        			{console.log(this.state.commentChange)}
		        			<input
		        				type="text"
		        				defaultValue={comments[index].body}
		        				onChange={(event) => this.setState({commentChange: event.target.value})}
		        			/>
		        		</div>
		        	}
				</Modal>
			</div>
		)
	}
}

function mapStateToProps ({ comments }) {
	return {
		comments
    }
}

function mapDispatchToProps (dispatch){
	return{
		getComments: (data) => dispatch(fetchComments(data)),
		putComment: (data) => dispatch(editComments(data))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)