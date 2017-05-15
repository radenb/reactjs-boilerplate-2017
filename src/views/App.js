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

	render() {
		return (
			<div id="page">
				<Helmet title="Observables" />
					<div id="content-wrapper">
						 { this.props.children }
					</div>
			</div>
		)
	}
}

module.exports = App
