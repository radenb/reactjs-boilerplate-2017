import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

export default class Nav extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			fontColor:null,
			menuVisible:true,
			mobileOverlay:false,
			winWidth:0
		}
	}

	handleScroll() {
		let currentST = window.pageYOffset
		if (currentST > 80) {
			if (currentST < this.st) {
				this.setState({
					hideMenu:false
				})
			}
			else {
				this.setState({
					hideMenu:true
				})
			}
			this.st = currentST
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.showNav) {
			this.setState({ hideMenu:false})
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', () => { this.handleScroll() })
		this.st = 0
		this.setState({
			winWidth : window.innerWidth
		})
		window.addEventListener('resize', () => { this.handleResize() })
	}

	handleResize() {
		this.setState({
			winWidth:window.innerWidth
		})
	}

	handleMobileClick() {
		this.setState({
			menuVisible: !this.state.menuVisible,
			mobileOverlay:!this.state.mobileOverlay
		})
	}

	showMenu() {
		this.setState({
			hideMenu:false
		})
	}
	render() {
		let { color } = this.props
		let mainNavClasses = classnames({
			'slideUp' : this.state.hideMenu
		})

		let menuClasses = classnames({
			'menu-nav' : true,
			'show' : this.state.mobileOverlay
		})

		return (
			<div id="nav" className={ mainNavClasses }>
				<Link to="/" className="no-line">
					<div id="logo">
					</div>
				</Link>
				<div className={ menuClasses } ref="menuNav" >
					<ul>
						<li onClick={ () => { this.handleMobileClick() }} >
							<Link to="/">Home</Link>
						</li>
						<li onClick={ () => { this.handleMobileClick() }}><Link to="/work/">Work<div className="underline" style={{ 'backgroundColor' : color }}/></Link></li>
						<li onClick={ () => { this.handleMobileClick() }}><Link to="/about/">About<div className="underline" style={{ 'backgroundColor' : color }}/></Link></li>
						<li onClick={ () => { this.handleMobileClick() }}><Link to="/contact/">Contact<div className="underline" style={{ 'backgroundColor' : color }}/></Link></li>
					</ul>
				</div>
				<div className="mobile-nav-icon" onClick={ () => { this.handleMobileClick() }}  >
					<span style={{ 'borderBottomColor' : color }}></span>
					<span style={{ 'borderBottomColor' : color }}></span>
					<span style={{ 'borderBottomColor' : color }}></span>
				</div>
			</div>
		)
	}
}
