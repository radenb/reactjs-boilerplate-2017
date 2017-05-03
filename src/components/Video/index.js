import React from 'react'
import mobileos from '../../utils/Browser'

export default class Video extends React.Component {
	constructor() {
		super()
	}

	componentDidMount() {
		if (mobileos) {
			this.refs.vid.pause()
			this.refs.vid.controls = true
		}
	}
	componentWillUnmount() {
		this.refs.vid.pause()
		delete this.refs.vid
		this.refs.vid = null
	}

	render() {
		const { source } = this.props
		return (
			<div class="main-video">
				<video poster="./dist/assets/img/wayla-poster-two.jpg" ref="vid" id="intro-vid" width="100%" autoPlay loop>
					<source src={ source } />
				</video>
			</div>
		)
	}
}
