import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Input } from 'react-materialize';
import { createComments } from '../actions';
import uuidv4 from 'uuid/v4';

class CreateComment extends Component{
	state={
		author: "",
		body: ""
	}

	AddComment = () => {
	
		if(this.state.author && this.state.body){
			const uuid = uuidv4;
			const {author, body} = this.state;
			let comments = this.props.comments['comments'];
			let comment = {};
			
			comment.author = author;
			comment.body = body;
			comment.timestamp = Date.now();
			comment.id = uuid();
			comment.parentId = this.props.posts['posts'].parentId;

			this.props.addComments(comment, comments)
		}
		this.setState({author: ""});
		this.setState({body: ""})
	}

	render(){
		return(
			<div>
				<Row>
					<Col s={6} m={4} offset='s3 m4'>
						<Card>
							<Input type='text' value={this.state.author}  label='Author' onChange={(e) => this.setState({author: e.target.value})} />
							<Input type='textarea' value={this.state.body} label='Comment' onChange={(e) => this.setState({body: e.target.value})} />
							<button onClick={this.AddComment}>
								Post Comment
							</button>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps ({ comments, posts }) {
	return {
		comments,
		posts
	}
}

function mapDispatchToProps (dispatch){
	return{
		addComments: (comment, comments) => dispatch(createComments(comment, comments)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment)