import { combineReducers } from 'redux';
import {
	GET_CATEGORY,
	GET_POSTS,
	ORDER_POSTS,
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

export default combineReducers({
	categories,
	posts,
})