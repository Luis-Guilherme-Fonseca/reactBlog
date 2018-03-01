import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardPanel, CardTitle, Col, Row } from 'react-materialize';
import { fetchComments } from '../actions';

class Comments extends Component {

	componentWillMount(){
		this.props.getComments(this.props.ID)
	}

	render(){
		const {comments} = this.props.comments;
		return (
			<div>
				{comments != null &&
					comments.map((comment, index) =>
						<Row key={index}>
							<Col key={index + comment.id} s={6} m={4} offset='s3 m4'>
								<CardPanel key={comment.id} className="small">
									<h5 key={comment.author}>{comment.author}</h5>
									<p key={comment.author + index}>{comment.body}</p>
								</CardPanel>
							</Col>
						</Row>
					)
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
		getComments: (data) => dispatch(fetchComments(data))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)