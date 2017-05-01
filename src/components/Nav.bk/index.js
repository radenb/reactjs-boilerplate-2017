import React from 'react'
import { Link } from 'react-router'

export default class Nav extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			rendered: false
		}
	}
	componentWillMount() {
		this.state.rendered = true
	}
	render() {
		return (
			<div id="nav">
				<Link to="/"><div id="logo"></div></Link>
				<div>
					<ul>
						<li><Link to="/work/">Work</Link></li>
						<li><Link to="/about/">About</Link></li>
						<li><Link to="/contact/">Contact</Link></li>
					</ul>
				</div>
			</div>
		)
	}
}