import React, { Component } from 'react';
import { Card, CardTitle, Col, Row } from 'react-materialize';
import { connect } from 'react-redux';
import { orderPosts } from '../actions';

class Order extends Component{

	order(posts, signal, type, e){
		let ordened = {};
		if(type === 'votes'){
			if(signal === '+'){
				ordened.posts = posts.sort(function(a, b){
					return b.voteScore - a.voteScore
				});
			}else if(signal === '-'){
				ordened.posts = posts.sort(function(a, b){
					return a.voteScore - b.voteScore
				});
			}
		}else if(type === 'date'){
			if(signal === '+'){
				ordened.posts = posts.sort(function(a, b){
					return b.timestamp - a.timestamp
				});
			}else if(signal === '-'){
				ordened.posts = posts.sort(function(a, b){
					return a.timestamp - b.timestamp
				});
			}
		}
		ordened.order = type + signal;
		this.props.orderPosts(ordened)
	}

	render(){
		const {posts, order} = this.props.posts
		const types = ['votes']
		console.log(order, posts)
		return(
			<div>
				{ types.map((type) =>
					<div>
						{order === (type + "+") &&
							<button onClick={this.order.bind(this, posts, "-", type)}>order</button>
						}
						{order !== (type + "+") &&
							<button onClick={this.order.bind(this, posts, "+", type)}>order</button>
						}
					</div>
				)}
			</div>
		)
	}
}

function mapStateToProps ({ categories, posts }) {
	return {
		posts
    }
}

function mapDispatchToProps (dispatch) {
	return {
		orderPosts: (data) => dispatch(orderPosts(data))
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)