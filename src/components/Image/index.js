import React from 'react'
import classnames from 'classnames'
import axios from 'axios'


class Image extends React.Component {
	constructor() {
		super()
		this.state = {
			imageLoaded:false,
			windowWidth: null,
			currentSrc:null
		}
		this.resizeTimer
		this.sizeImage = this.sizeImage.bind(this)
	}

	handleImageLoad() {
		this.setState({
			imageLoaded:true,
			currentSrc: this.refs.image.src
		})
		if (this.props.callback) {
			this.props.callback()
		}

		if (this.props.responsive) this.sizeImage()
	}

	handleImageLoadError() {
		console.log('there was an error loading this image')
	}

	sizeImage() {
		clearTimeout(this.resizeTimer)

		this.resizeTimer = setTimeout( ()=> {
			let changedSrc
			let { imageUrl } = this.props
			if ( window.innerWidth >= 1600) {
				changedSrc = imageUrl.full_large
			}
			else if (window.innerWidth >= 800) {
				changedSrc = imageUrl.large
			}
			else {
				changedSrc = imageUrl.medium
			}
			
			this.setState({
				currentSrc: changedSrc
			})
		}, 1000)
		
	}

	componentDidMount() {
		this.setState({
			windowWidth: window.innerWidth
		})
		var thisImage = this.refs.image
		// if image rendered to fast from server, onload won't fire on client
		if (thisImage.complete) this.handleImageLoad()

		if (this.props.responsive) window.addEventListener('resize', this.sizeImage )
	}

	componentWillUnmount() {
		if (this.props.responsive) window.removeEventListener('resize', this.sizeImage )
	}

	render() {
		let imgStyle = {
			'visibility' : this.state.imageLoaded ? 'visible' : 'hidden',
			'width' : '100%',
			'height' : 'auto',
			'margin' : '0 auto',
			'display' : 'block',
			'position' : 'relative',
			'opacity' : 0
		}

		let imgClasses = classnames({
			'image' : true,
			'fadeIn' : this.state.imageLoaded ? 'true' : 'false'
		})

		return(
			<div style={{ width:'100%' }}>
				{ this.props.responsive && <img ref="image" className={ imgClasses } src={ this.state.currentSrc ? this.state.currentSrc : this.props.imageUrl.large } onLoad={ this.handleImageLoad.bind(this) } onError={ this.handleImageLoadError.bind(this) } style={ imgStyle } alt={ this.props.alt } />
				}
				{ !this.props.responsive && 
					<img ref="image" className={ imgClasses } src={ this.props.imageUrl } onLoad={ this.handleImageLoad.bind(this) } onError={ this.handleImageLoadError.bind(this) } style={ imgStyle } alt={ this.props.alt } />
				}
				<div className="spinner" style ={{ 'display' : this.state.imageLoaded ? 'none' : 'block', 'zIndex': 100 }}>
					<img src="../../dist/assets/img/loader.gif" />
				</div>
			</div>
		)
	}
}

export default Image
