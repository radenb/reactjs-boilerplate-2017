'use strict'

import React from 'react'


export default class Footer extends React.Component {
	constructor() {
		super()
		this.state = {
			rendered: false
		}
	}
	componentWillMount() {
		this.state.rendered = true
	}
	render() {


		return (
			<div className="footer">
				
			</div>
		)
	}
}
