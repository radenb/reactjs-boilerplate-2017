import React from 'react'

export default class Column extends React.Component {
	constructor() {
		super()
		this.state = {
			windowWidth:null
		}
		this.handleResize = this.handleResize.bind(this)
		this.resizeTimer
	}

	componentDidMount() {
		this.setState({
			windowWidth: window.innerWidth
		})
		this.marginAdjustment()

		window.addEventListener('resize', this.handleResize)
	}
	componentDidUpdate() {
		this.marginAdjustment()
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
	}
	handleResize() {
		clearTimeout(this.resizeTimer)

		this.resizeTimer = setTimeout( () => {
			this.setState({
				windowWidth:window.innerWidth
			})
			this.marginAdjustment()
		},250)
	}
	marginAdjustment() {
    	let windowWidth = this.state.windowWidth

    	if ( windowWidth > 1001 ) {
	    	this.offsetL = this.props.offsetL ? this.props.offsetL : 0
	    	this.offsetR = this.props.offsetR ? this.props.offsetR : 0
    	}
        if ( windowWidth > 650 && windowWidth <= 1001) {
        	this.offsetL = this.props.offsetLTab ? this.props.offsetLTab : 0
        	this.offsetR = this.props.offsetRTab ? this.props.offsetRTab : 0
        }
        else if (windowWidth <= 650 ) {
        	this.offsetL = this.props.offsetLMob ? this.props.offsetLMob : 0
        	this.offsetR = this.props.offsetRMob ? this.props.offsetRMob : 0
        }
	}

	render() {
		this.marginAdjustment()

        let divStyle = Object.assign({
			'marginLeft': this.props.offsetL ? ( (this.offsetL / 12 * 100) + '%' ) : 0,
			'marginRight': this.props.offsetR ? ( (this.offsetR / 12 * 100) + '%' ) : 0
		}, this.props.style)

        this.width = this.props.width ? `col-${this.props.width}` : 'col-12'
        this.tablet = this.props.tablet ? `col-tablet-${this.props.tablet}` : ''
        this.mobile =  this.props.mobile ? `col-mobile-${this.props.mobile}` : ''
        let cssClasses = this.props.className ?
        	this.width + ' ' + this.tablet + ' ' + this.mobile + ' ' + this.props.className : this.tablet + ' ' + this.mobile + ' ' + this.width

        return (
            <div className={ cssClasses } style={ divStyle } id={ this.props.id }>
                { this.props.children }
            </div>
        )
    }
}
