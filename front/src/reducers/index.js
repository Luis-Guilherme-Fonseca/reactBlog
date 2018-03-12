import { combineReducers } from 'redux';
import {
	GET_CATEGORY,
	GET_POSTS,
	ORDER_POSTS,
	ADD_POST,
	DISABLE_POST,
	GET_COMMENTS,
	ADD_COMMENT,
	GET_ERROR,
} from '../actions';


function categories(state = {}, action){
	const { categories } = action;
	
	switch(action.type){
		case GET_CATEGORY:
			return {
				...state,
				categories: categories
			}
		default:
			return state
	}
}

function posts(state = {order: "votes+"}, action){
	const { posts, post, order } = action;
	switch(action.type){
		case GET_POSTS:
			return {
				...state,
				posts: posts,
			}
		case ORDER_POSTS:
			return {
				...state,
				posts: posts,
				order: order
			}
		case ADD_POST:
			return {
				...state,
				[posts]: posts.push(post)
			}
		case DISABLE_POST:
			return {
				...state,
				posts: posts,
				post
			}
		default:
			return state
	}
}

function comments(state = {}, action){
	const { comments, comment } = action;
	switch(action.type){
		case GET_COMMENTS:
			return {
				...state,
				comments 
			}
		case ADD_COMMENT:
			return {
				...state,
				[comments]: comments.push(comment)
			}
		default:
			return state
	}
}


function error(state = {}, action){
	const { error } = action;
	switch(action.type){
		case GET_ERROR:
			return {
				...state,
				error
			}
		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments,
	error
})
