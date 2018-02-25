import * as ReadableAPI from '../utils/ReadableAPI';

export const ADD_RECIPE = 'ADD_RECIPE';
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_POSTS = 'GET_POSTS';
export const ORDER_POSTS = 'ORDER_POSTS';

export function addRecipe({day, recipe, meal}){
	return{
		type: ADD_RECIPE,
		recipe,
		day,
		meal,
	}
}

export function removeFromCalendar ({day, meal}){
	return{
		type: REMOVE_FROM_CALENDAR,
		day,
		meal,
	}
}

export const getPosts = posts => ({
	type: GET_POSTS,
	posts
})

export const fetchPosts = () => dispatch => (
	ReadableAPI
		.getPosts()
		.then(posts => dispatch(getPosts(posts)))
)

export function orderPosts({posts, order}){
	return{
		type: ORDER_POSTS,
		posts,
		order
	}
}

export const getCategory = categories => ({
	type: GET_CATEGORY,
	categories
})

export const fetchCategories = () => dispatch => (
	ReadableAPI
		.getCategories()
		.then(category => dispatch(getCategory(category)))
)