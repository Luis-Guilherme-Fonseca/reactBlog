import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategoryPosts } from '../actions';
import Posts from './PostsComponent';

class Category extends Component{

	componentWillMount(){
		this.props.getPosts(this.props.match.params.category);
	}

	render(){
		const categories = this.props.categories['categories'].filter((category) => category.name == this.props.match.params.category);
		const {posts} = this.props.posts;
		
		return(
			<div>
				{categories[0] != undefined &&
					<div>
						<h4>{categories[0].name}</h4>
						<hr/>
						<Posts />
					</div>
				}
				{categories == undefined &&
					<h4>We coulden´t find this category: <i>{this.props.match.params.category}</i></h4>
				}
			</div>
		)
	}
}

function mapStateToProps ({ categories, posts }) {
	return {
		categories,
		posts
    }
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: (data) => dispatch(fetchCategoryPosts(data))
	}
}

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(Category)