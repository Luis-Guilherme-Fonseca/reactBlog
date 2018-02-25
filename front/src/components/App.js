import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar, fetchCategories, fetchPosts } from '../actions'
import Home from './Home';
import Posts from './Post';
import '../App.css';

class App extends Component {
	
	componentWillMount(){
		this.props.getCategories()
		this.props.getPosts()
	}

	render() {
		const categories = this.props.categories['categories']
		return (
			<div className="App">
				<div>
					<Navbar left>
						<NavItem href='/'><Icon>home</Icon></NavItem>
						{categories != null &&
							categories.map((category, index) =>
								<NavItem href={"/" + category.path}>{category.name}</NavItem>
							) 
						}
					</Navbar>
				</div>
				<Route exact path='/' render={() =>
					<Home/>
				}/>
				<Route exact path='/posts' render={() =>
					<Posts/>
				}/>
			</div>
		);
	}
}

function mapStateToProps ({ food, calendar, categories }) {
	return {
		categories
    }
}

function mapDispatchToProps (dispatch) {
	return {
    	selectRecipe: (data) => dispatch(addRecipe(data)),
    	remove: (data) => dispatch(removeFromCalendar(data)),
    	getCategories: () => dispatch(fetchCategories()),
    	getPosts: () => dispatch(fetchPosts()),
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)