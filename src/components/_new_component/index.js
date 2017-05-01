import React from 'react'


export default class Component extends React.Component {
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
			<div>
				<p>New Component</p>
			</div>
		)
	}
}
