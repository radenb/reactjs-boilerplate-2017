import React from 'react'


export default class Component extends React.Component {
	constructor() {
		super()
		this.state = {
			rendered: true
		}
	}
	
	componentWillMount() {}
	componentDidmount() {}
	componentWillReceiveProps() {}
	componentWillUpdate() {}
	compnentDidUpdate() {}
	componentWillUnmount() {}

	render() {
		return (
			<div>
				<p>New Component</p>
			</div>
		)
	}
}
