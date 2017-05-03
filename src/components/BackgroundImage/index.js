import React from 'react'
import ImageSizerHOC from '../HOC/ImageSizerHOC'
import classnames from 'classnames'


class BackgroundImage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			imageLoaded:false,
			defaultHeight: null,
			currentSrc:null
		}
		this.handleResize = this.handleResize.bind(this)
		this.resizeTimer
	}

	sizeImage() {
		let changedSrc
		let { imageUrl } = this.props
		if ( window.innerWidth >= 1600) {
			changedSrc = imageUrl.full_large
		}
		else if ( window.innerWidth >= 800){
			changedSrc = imageUrl.large
		}
		else {
			changedSrc = imageUrl.medium
		}
		

		this.setState({
			currentSrc: changedSrc
		})
	}

	handleImageLoad() {
		this.setState({
			imageLoaded:true
		})
		if (this.props.callback) {
			this.props.callback()
		}

		if (this.props.responsive) this.sizeImage()
	}


	handleImageLoadError() {
		console.log('There was an error loading this image.')
	}

	componentDidMount() {
		const thisImage = this.refs.image
		
		if (this.props.defaultHeight) {
			this.setState({
				defaultHeight : window.innerHeight
			})
		}

		else if (this.props.defaultHeight == '100%') {
			this.setState({
				defaultHeight: '100%'
			})
		}

		if (this.props.responsive) window.addEventListener('resize', this.handleResize)

		// this is for server rendering in case image loads too fast so onload won't fire on client
		if (thisImage.complete) this.handleImageLoad()

		if (this.props.fullscreen) {
			this.setState({
				defaultHeight:window.innerHeight
			})
			//this.sizeFullscreen()
		}
	}

	handleResize() {
		clearTimeout(this.resizeTimer)
		this.resizeTimer = setTimeout( () => {
			this.sizeImage()
		
			if (this.props.defaultHeight) {
				 this.setState({ 
				 	defaultHeight:window.innerHeight
				 })
			}
			else {
				const bgContainer = this.refs.bgcontainer
				bgContainer.style.width = window.innerWidth
				bgContainer.style.height = window.innerHeight
			}
		}, 1000)
	}

	componentWillUnmount() {
		if (this.props.responsive) window.removeEventListener('resize', this.handleResize)
	}

	render() {

		let bgClasses = classnames({
			'show' : this.state.imageLoaded,
			'bg-container' : true			
		})
	
		return (
			<div ref="bgcontainer" className={ bgClasses } style={{ 
					'width' : this.refs.image ? this.refs.image.style.width : 'auto',
					'height' : this.state.defaultHeight ? this.stateDefaultHeight : this.refs.image ? this.refs.image.style.height : null,
					'backgroundPosition': this.props.backgroundPosition ? this.props.backgroundPosition : 'center', 
					'backgroundSize': 'cover', 
					'backgroundRepeat':'no-repeat',
					'backgroundImage': this.props.responsive ? 'url(' + this.state.currentSrc + ')' : 'url(' + this.props.imageUrl + ')' }}>
				{ this.props.responsive && <img ref="image" src={ this.state.currentSrc ? this.state.currentSrc : this.props.imageUrl.large } onLoad={ this.handleImageLoad.bind(this) } onError={ this.handleImageLoadError.bind(this) } style={{ 'visibility':'hidden','zIndex':-1 }} />
				}
				{ !this.props.responsive && <img ref="image" src={ this.props.imageUrl } onLoad={ this.handleImageLoad.bind(this) } onError={ this.handleImageLoadError.bind(this) } style={{ 'visibility':'hidden','zIndex':-1 }} />
				}

				<div className="spinner" style ={{ 'display' : this.state.imageLoaded ? 'none' : 'block', 'zIndex': 100 }}>
					<img src="../../dist/assets/img/loader.gif" />
				</div>
			
				{ this.props.children }
			</div>
				
	
		)
	}
}

export default BackgroundImage