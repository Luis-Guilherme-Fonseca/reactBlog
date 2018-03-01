import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_POSTS = 'GET_POSTS';
export const ORDER_POSTS = 'ORDER_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';


//posts actions

export const getPosts = posts => ({
	type: GET_POSTS,
	posts
})

export const fetchPosts = () => dispatch => (
	ReadableAPI
		.getPosts()
		.then(posts => dispatch(getPosts(posts)))
)

export const fetchPost = (ID) => dispatch => (
	ReadableAPI
		.getPost(ID)
		.then(posts => dispatch(getPosts(posts)))
)

export function orderPosts({posts, order}){
	return{
		type: ORDER_POSTS,
		posts,
		order
	}
}

export const fetchCategoryPosts = (category) => dispatch => (
	ReadableAPI
		.getPostsByCategory(category)
		.then(posts => dispatch(getPosts(posts)))
)

//comments actions

export const getComments = comments => ({
	type: GET_COMMENTS,
	comments
})

export const fetchComments = (postID) => dispatch => (
	ReadableAPI
		.getComments(postID)
		.then(comments => dispatch(getComments(comments)))
)

//categories actions

export const getCategory = categories => ({
	type: GET_CATEGORY,
	categories
})

export const fetchCategories = () => dispatch => (
	ReadableAPI
		.getCategories()
		.then(category => dispatch(getCategory(category)))
)