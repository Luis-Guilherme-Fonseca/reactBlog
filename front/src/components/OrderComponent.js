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
		const types = ['votes', 'date']
		return(
			<div className="btn-group">
				{ types.map((type) =>{
					if(order === (type + "+")){  
						return <button key={type} className="selectedSort" onClick={this.order.bind(this, posts, "-", type)}>{type}</button>
					}else if(order === (type + "-")){
						return <button key={type} className="selectedSort" onClick={this.order.bind(this, posts, "+", type)}>{type}</button>
					}else{
						return <button key={type} onClick={this.order.bind(this, posts, "+", type)}>{type}</button>
					}
				})}
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