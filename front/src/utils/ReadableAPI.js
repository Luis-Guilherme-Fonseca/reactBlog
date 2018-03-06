
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Authorization': token
}

//funções de categoria

export const getCategories = () => 
	fetch(`${api}/categories`, { headers })
		.then(res => res.json())
		.then(data => data.categories)

//funções de Posts

export const getPosts = () => 
	fetch(`${api}/posts`, { headers })
		.then(res => res.json())
		.then(data => data)

export const getPost = (postID) =>
	fetch(`${api}/posts/${postID}`, { headers })
		.then(res => res.json())
		.then(data => data)

export const getPostsByCategory = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
		.then(res => res.json())
		.then(data => data)

export const addPost = (post) =>
	fetch(`${api}/posts`, {
	    method: 'POST',
	    headers: {
    		...headers,
    		'Content-Type': 'application/json'
    	},
    	body: JSON.stringify({ post })
	}).then(res => res.json())
    	.then(data => data)

export const postVote = (postID, option) => 
	fetch(`${api}/posts/${postID}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	}).then(res => res.json())
		.then(data => data)

export const deletePost = (postID) =>
	fetch(`${api}/posts/${postID}`, {
		method: 'DELETE',
		headers
	}).then(res => res.json())
		.then(data => data)

export const editPost = (postID, post) =>
	fetch(`${api}/posts/${postID}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ post })
	}).then(res => res.json())
		.then(data => data)

//funções de comentarios

export const getComments = (postID) =>
	fetch(`${api}/posts/${postID}/comments`, { headers })
		.then(res => res.json())
		.then(data => data)

export const addComment = ({id, timestamp, body, author, parentId}) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, timestamp, body, author, parentId })
	}).then(res => res.json())
		.then(data => data)

export const getComment = (commentID) =>
	fetch(`${api}/comments/${commentID}`, { headers })
		.then(res => res.json())
		.then(data => data)

export const commentVote = (commentID, option) =>
	fetch(`${api}/comments/${commentID}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ option })
	}).then(res => res.json())
		.then(data => data)

export const editComment = (commentID, body) =>
	fetch(`${api}/comments/${commentID}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ body })
	}).then(res => console.log(res.json()))
		.then(data => data)

export const deleteComment = (commentID) =>
	fetch(`${api}/comments/${commentID}`, {
		method: 'DELETE',
		headers
	}).then(res => res.json())
		.then(data => data)