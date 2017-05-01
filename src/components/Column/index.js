import React from 'react'

export default class Column extends React.Component {
	constructor(props){
		super(props)
		this.width 
		this.offset
		this.cssClasses
		this.tablet
		this.mobile

	}
	render() {
		this.props.width ? this.width = 'col-'+this.props.width : this.width = 'col-12'

		this.props.offset ? this.offset = 'col-offset-'+this.props.offset+' ' : this.offset = ''
		this.props.tablet ? this.tablet = 'col-tablet-'+this.props.tablet+' ' : this.tablet = ''
		this.props.mobile ? this.mobile = 'col-mobile-'+this.props.mobile+' ' : this.mobile = ''

		this.props.className ? this.cssClasses = this.width+' '+this.offset+this.tablet+this.mobile+this.props.className : this.cssClasses = this.offset+this.tablet+this.mobile+this.width


		return (
			<div className={this.cssClasses}  style={this.props.style}>
				{this.props.children}
			</div>
		)
	}
}