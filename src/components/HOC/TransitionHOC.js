import React from 'react'

const TransitionHOC = ( Component ) => {
	return class TransitionHOC extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				killController:false
			}
		}

		componentWillEnter(callback) {
			document.body.style.overflow = 'hidden'
			document.body.style.pointerEvents = 'none'
			document.getElementById('footer').style.opacity = '0'
			this.refs.container.style.position = 'fixed'

			this.enterTL = new TimelineMax({onComplete: callback, paused: true})
			this.enterTL.fromTo(this.refs.container, .7, { autoAlpha: 0 }, {autoAlpha: 1, ease:Power2.easeOut}, .55)
			this.enterTL.play()
		}

		componentDidEnter() {
			document.body.style.overflow = 'visible'
			document.body.style.pointerEvents = 'auto'
			this.refs.container.style.position = 'relative'
			document.getElementById('footer').style.opacity = '1'
			this.enterTL.kill()
		}

		componentWillLeave(callback) {
			this.setState({
                killController:true
            })

            this.exitTL = new TimelineMax({onComplete: callback, paused: true})
            let top = document.body.scrollTop ? document.body.scrollTop  : '0px'

            this.refs.container.style.top = '0px'
            this.refs.container.style.position = 'fixed'
			document.body.classList.add('leaving')

            this.exitTL.fromTo(this.refs.container, .5, {autoAlpha: 1, y: (top * -1)}, {autoAlpha: 0})
            this.exitTL.play()
		}

		componentDidLeave() {
			// console.log('AND HOC TRANSITION IS GONE')
			this.exitTL.kill()
			document.body.classList.remove('leaving')
		}

		render() {
			return (
				<div ref="container">
					<Component killController={ this.state.killController } { ...this.props } ></Component>
				</div>
			)
		}
	}
}

export default TransitionHOC
