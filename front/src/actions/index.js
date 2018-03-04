import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_POSTS = 'GET_POSTS';
export const ORDER_POSTS = 'ORDER_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_ERROR = 'GET_ERROR';


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
		.catch((err) => dispatch(getError(err)))
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
		.catch((err) => dispatch(getError(err)))
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
		.catch((err) => dispatch(getError(err)))
)

export const editComments = ({id, body, comments, index}) => dispatch => (
	ReadableAPI
		.editComment(id, body)
		.then(() => comments[index].body = body)
		.then(() => dispatch(getComments(comments)))
		.catch((err) => dispatch(getError(err)))
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
		.catch((err) => dispatch(getError(err)))
)

//error action

export const getError = error => ({
	type: GET_ERROR,
	error
})