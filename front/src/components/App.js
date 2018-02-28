import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../actions'
import PostsComponent from './PostsComponent';
import Category from './Category';
import Posts from './Post';
import '../App.css';

class App extends Component {
	
	componentWillMount(){
		this.props.getCategories()
		this.props.getPosts()
	}

	render() {
		const categories = this.props.categories['categories'];
		return (
			<div className="App">
				{categories !== undefined &&
					<div>
						<Navbar left>
							<NavItem href='/'><Icon>home</Icon></NavItem>
							{categories != null &&
								categories.map((category, index) =>
									<NavItem key={index} href={"/posts/" + category.path}>{category.name}</NavItem>
								) 
							}
						</Navbar>
						<Route exact path='/' render={() =>
							<PostsComponent/>
						}/>

						<Route path='/posts/:category' render={routeProps =>
							<Category {...routeProps}/>
						}/>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps ({ categories }) {
	return {
		categories
    }
}

function mapDispatchToProps (dispatch) {
	return {
    	getCategories: () => dispatch(fetchCategories()),
    	getPosts: () => dispatch(fetchPosts()),
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)