import { combineReducers } from 'redux';
import {
	GET_CATEGORY,
	GET_POSTS,
	ORDER_POSTS,
	GET_COMMENTS,
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

function posts(state = {order : "votes+"}, action){
	const { posts, order } = action;
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
		default:
			return state
	}
}

function comments(state = {}, action){
	const { comments } = action;
	switch(action.type){
		case GET_COMMENTS:
			return {
				...state,
				comments 
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
