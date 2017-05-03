import React from 'react'

export default class Button extends React.Component {
	constructor() {
		super()
		this.state = {
			hovered:false
		}
	}

	handleHover() {
		this.setState({
			hovered:true
		})
	}
	hoverOut() {
		this.setState({
			hovered:false
		})
	}
	handleClick() {
		this.props.zoom()
	}
	
	render() {
		let { color } = this.props
		return(
			<div className="button" onMouseOver={ () => { this.handleHover() }}
				 onMouseOut={ () => { this.hoverOut() }}
				 onClick={ this.handleClick.bind(this) }>
				<div>
					<p style={{ 'color' : this.state.hovered ? color : 'white' }}>{ this.props.children }</p>
				</div>
				<div className="mask"></div>
			</div>
		)
	}
}
