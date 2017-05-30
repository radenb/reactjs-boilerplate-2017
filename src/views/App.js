import React from 'react'
import render from 'react-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Helmet from 'react-helmet'

if (typeof window === 'object') {
	var device = navigator.userAgent.toLowerCase()
	var mobileos = device.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)
}


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rendered: false
		}
	}
	componentWillMount() {
		this.state.rendered = true;
	}

	filterData() {
		// console.log('filter data, app.props = ',this.props)

		// remove slashes in pathname
		let currentLoc = this.props.location.pathname.replace(/\//g, '');
		// if we are at root aka '/', call it home
		if (currentLoc === '') {currentLoc = 'home'}

		this.state.pages.map( (page) => {
			if (page.slug === currentLoc ) {
				// console.log('we have match ' + page.slug + ' = ' + currentLoc)
				this.currentPage = page
				this.slug = page.slug
			}
		})
	}
	render() {
		if (this.state.dataLoaded) {
			this.filterData()
		}
	    let path = this.props.location.pathname;
		let segment = path.split('/')[1] || 'root';
		const { data } = this.props
		return (
			<div id="page">
				<Helmet title="Observables" />
					<div id="content-wrapper">
						<Nav />
					 { this.state.dataLoaded &&
						 React.cloneElement( this.props.children, {
							page: this.currentPage,
							key: segment
						}) }
					</div>
			</div>
		)
	}
}

module.exports = App
