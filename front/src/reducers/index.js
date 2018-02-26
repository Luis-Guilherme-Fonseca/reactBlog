import { combineReducers } from 'redux';
import {
	ADD_RECIPE,
	REMOVE_FROM_CALENDAR,
	GET_CATEGORY,
	GET_POSTS,
	ORDER_POSTS,
} from '../actions';

function food(state ={}, action){
	switch(action.type){
		case ADD_RECIPE:
			const { recipe } = action
			return {
				...state,
				[recipe.label]: recipe
			}
		default:
			return state
	}
}

const initialCalendarState = {
	sunday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	monday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	tuesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	wednesday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	thursday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	friday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
	saturday: {
		breakfast: null,
		lunch: null,
		dinner: null,
	},
}

function calendar(state = initialCalendarState, action){
	const { day, recipe, meal } = action;
	switch(action.type){
		case ADD_RECIPE:
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: recipe.label,
				}
			}
		case REMOVE_FROM_CALENDAR:
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: null,
				}
			}
		default:
			return state
	}
}

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

function posts(state = {order : "oi"}, action){
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
	calendar,
	food,
	categories,
	posts,
})