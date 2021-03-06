import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const ORDER_POSTS = 'ORDER_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_ERROR = 'GET_ERROR';
export const DISABLE_POST = 'DISABLE_POST';

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

export const addPost = (post, posts) => ({
	type: ADD_POST,
	post,
	posts
})

export const createPost = (post, posts) => dispatch => (
	ReadableAPI
		.addPost(post)
		.then((post) => dispatch(addPost(post, posts)))
		.catch((err) => dispatch(getError(err)))		
)

export const editPost = (post) => dispatch => (
	ReadableAPI
		.editPost(post.id, post.title, post.body)
		.then(post => dispatch(getPosts(post)))
		.catch((err) => dispatch(getError(err)))
)

export const editPosts = (post, posts) => dispatch => (
	ReadableAPI
		.editPost(post.id, post.title, post.body)
		.then(() => dispatch(getPosts(posts)))
		.catch((err) => dispatch(getError(err)))
)

export const fetchCategoryPosts = (category) => dispatch => (
	ReadableAPI
		.getPostsByCategory(category)
		.then(posts => dispatch(getPosts(posts)))
		.catch((err) => dispatch(getError(err)))
)

export const votePost = (id, option) => dispatch => (
	ReadableAPI
		.postVote(id, option)
		.then(post => dispatch(getPosts(post)))
		.catch((err) => dispatch(getError(err)))
)

export const votePosts = (id, option, posts) => dispatch => (
	ReadableAPI
		.postVote(id, option)
		.then(() => dispatch(getPosts(posts)))
		.catch((err) => dispatch(getError(err)))
)

export const disablePost = (posts, post) => {
	return{
		type: DISABLE_POST,
		posts,
		post
	}
} 
 
export const deletePost = (id, posts) => dispatch => (
	ReadableAPI
		.deletePost(id)
		.then((res) => dispatch(disablePost(posts, res)))
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

export const deleteComments = ({id, comments}) => dispatch => (
	ReadableAPI
		.deleteComment(id)
		.then(() => getComments(comments))
		.catch((err) => dispatch(getError(err)))
)

export const addComment = (comment, comments) => ({
	type: ADD_COMMENT,
	comment,
	comments
})

export const createComments = (comment, comments) => dispatch => (
	ReadableAPI
		.addComment(comment)
		.then(res => dispatch(addComment(res, comments)))
		.catch((err) => dispatch(getError(err)))
)

export const voteComment = (id, option, comments) => dispatch => (
	ReadableAPI
		.commentVote(id, option)
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