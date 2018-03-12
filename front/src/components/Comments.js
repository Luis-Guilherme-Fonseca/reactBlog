import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardPanel, Col, Row, Modal, Input, Button } from 'react-materialize';
import CreateComment from './CreateComment';
import { fetchComments, editComments, deleteComments, voteComment } from '../actions';

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

	deleteComment = (id) => {
		let comments = this.props.comments['comments'];
		comments.splice(this.state.index, 1);

		let data = {}
		data.comments = comments;
		data.id = id;
		this.props.disableComment(data)

		this.closeModal()
	}

	vote = (res) => {
		let comments = this.props.comments['comments'];
		if(res.option === 'upVote'){
			comments[res.index].voteScore += 1;
		}else if(res.option === 'downVote'){
			comments[res.index].voteScore -= 1;
		}
		this.props.commentVote(res.comment.id, res.option, comments);
	}

	commentsLenght = () => {
		const {comments} = this.props.comments;
		if(comments.lenght > 0){
			return(
				<span>there are {comments.lenght} comments for this post</span>
			)
		}else{
			return(
				<span>there are 0 comments for this post</span>
			)
		}
	}

	componentWillMount(){
		this.props.getComments(this.props.ID)
	}

	render(){
		const {comments} = this.props.comments;
		const {index} = this.state;
		const display = {display: 'block'};
		const hide = {display: 'none'};
		return (
			<div>
				{comments != null &&
					<div>
						<CreateComment/>
						{this.commentsLenght()}
						{comments.map((comment, index) =>
							<Row key={index}>
								{comment.parentDeleted !== true &&
									<Col key={index + comment.id} s={6} m={4} offset='s3 m4'>
										<CardPanel key={comment.id} className="small">
											<h5 key={comment.author}>{comment.author}</h5>
											<p key={comment.author + index}>{comment.body}</p>
											<button value={index} onClick={(event) => 
												this.openModal(event.target.value)}>
												edit
											</button>
											<span className='clear'>Score: {comment.voteScore}  
												<Button floating icon='thumb_up' onClick={() => this.vote({option: 'upVote', comment, index})} className='clear'/>
												<Button floating icon='thumb_down' onClick={() => this.vote({option: 'downVote', comment, index})} className='clear'/>
											</span>
										</CardPanel>
									</Col>
								}
							</Row>
						)}
					</div>
				}
				{this.state.isOpen &&
					<Modal fixedFooter
						header='Edit comment'
						actions={
							<div>
								<button className="btn waves-effect waves-light btn-flat modal-action modal-close" onClick={this.closeModal}>Close</button>
								<button className="btn waves-effect waves-light btn-flat modal-action modal-confirm" value={comments[index].id} onClick={(event) => this.deleteComment(event.target.value)}>Delete</button>
								<button className="btn waves-effect waves-light btn-flat modal-action modal-confirm" onClick={this.editComment}>Save</button>
							</div>
						}
						style={this.state.isOpen ? display : hide}>
					<div>
						<Input
							type="textarea"
							label="Comment"
							defaultValue={comments[index].body}
							onChange={(event) => this.setState({commentChange: event.target.value})}
							/>
						</div>
					</Modal>
				}
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
		putComment: (data) => dispatch(editComments(data)),
		disableComment: (data) => dispatch(deleteComments(data)),
		commentVote: (id, option, comments) => dispatch(voteComment(id, option, comments)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Comments)