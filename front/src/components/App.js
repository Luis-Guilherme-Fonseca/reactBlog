import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions'
import PostsComponent from './PostsComponent';
import Category from './Category';
import Post from './Post';
import '../App.css';

class App extends Component {
	
	componentWillMount(){
		this.props.getCategories()
	}

	render() {
		const { categories } = this.props.categories;
		const { error } = this.props.error;
		return (
			<div className="App">

				{categories !== undefined && error === undefined &&
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

						<Route path='/post/:ID' render={routeProps =>
							<Post {...routeProps}/>
						}/>
					</div>
				}
				{error !== undefined &&
					<div>
						<h2>{error.title}</h2>
						<p>{error.message}</p>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps ({ categories, error }) {
	return {
		categories,
		error
    }
}

function mapDispatchToProps (dispatch) {
	return {
		getCategories: () => dispatch(fetchCategories()),
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)