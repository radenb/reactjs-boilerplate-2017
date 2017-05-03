import React from 'react'
import axios from 'axios'
import { removeSpecialChars, replaceQuotes } from '../../utils/StringFormatter'
import { TimelineMax } from 'gsap'

export default class Form extends React.Component {
	constructor() {
		super()
		this.state = {
			rendered: false,
		}
		this.formSubmit = this.formSubmit.bind(this);
	}
	componentWillMount() {
		this.state.rendered = true
		console.log
		this.setState({
			inputs: this.props.form.inputs
		})
	}
	componentDidMount() {
		this.timelineInit()
		this.refs.input0.focus()
	}

	formSubmit(event) {
		event.preventDefault()
		let payload = {}

		this.state.inputs.map( (input, key) => {
			let inputRef = this.refs[`input${key}`]
			let value = inputRef.value
			payload[input.label] = value
		})

		let form = this.refs.form

		form.style.pointerEvents = 'none'
		this.refs.error.classList.remove('error')
		this.formTl.play()
		this.spanTl.restart().play()

		axios.post('/contact/submit/', payload).then( (res) => {
			if (res.data.yo =='error') {
				this.formTl.reverse()
				form.style.pointerEvents = 'visible'
				this.refs.error.classList.add('error')
			}
			else {
				this.spanTl.stop()
				this.formSent.play()
			}
		})
		.catch( (err) => {
			console.log(err.message)
			this.formTl.reverse()
		})
	}
	timelineInit() {
		let sending = this.refs.sending
		this.formTl = new TimelineMax({paused: true, onComplete: function() {
			sending.classList.add('sending')
		}})
		this.formSent = new TimelineMax({paused: true})
		this.spanTl = new TimelineMax({paused: true})
		let spans = document.getElementsByClassName('L')
		spans = Array.prototype.slice.call(spans)

		spans.map((span, key) => {
			let height = window.innerHeight
			let width = window.innerWidth
			let Xfin = Math.round(Math.random() * (5 + 5) - 5 )
			let Yfin = Math.round(Math.random() * (5 + 5) - 5 )
			if( key+1 == spans.length ) {
				Xfin = 10
			}
			if( key == 0) {
				Xfin = -10
			}
			this.spanTl.to(span, 25, {y: Yfin, x: Xfin, ease: Expo.easeOut, repeat: -1, repeatDelay:.5, yoyo: true}, 1.2)
		})

		this.formTl.fromTo(this.refs.form, 0.7, {y: 0, autoAlpha: 1}, {y: 50, autoAlpha: 0})
					.fromTo(this.refs.sending, 0.45, {y: 45, autoAlpha: 0, x: '-50%'}, {y: '-50%', autoAlpha: 1}, 0.55)


		this.formSent.to(this.refs.sending, 0.45, {y: '-55%', autoAlpha: 0})
					.fromTo(this.refs.successMessage, .45, {y: 45, autoAlpha: 0, x: '-50%'}, {y: '-50%', autoAlpha: 1})
	}

	componentWillUnmount() {
		this.formTl.kill()
		this.formSent.kill()
	}

	render() {

		return (
			<div>
				<form id={ this.props.id } ref="form" onSubmit={ this.formSubmit }>
					{this.state.inputs.map( (input, key) => {
						if ( input.acf_fc_layout == 'text_input') {
							return(
								<div key={ key }>
									<label></label>
									<input type={ input.input_type } required={ input.required} ref={`input${key}`} placeholder={ input.label } />
									<div className="border-ani" />
								</div>
							)
						}
						else if ( input.acf_fc_layout == 'select_input' ) {
							return (
								<div key={ key }>
									<label></label>
									<select ref={`input${key}`}>
										<option value="" disabled="disabled" selected>{ input.label }</option>
										{
											input.option.map( (option, key) => {
												return(
													<option key={ key } value={ option.title }>{ option.title }</option>
												)
											})
										}
									</select>
									<div className="border-ani" />
								</div>
							)
						}
					})}
					<button type="submit" form={ this.props.id } value="Submit">Submit</button>
				</form>
				<div ref="error" id="errorMessage">
					<p>{ removeSpecialChars(this.props.form.error_message) }</p>
				</div>
				<div ref="sending" id="sendingMessage" className="message">
					<h1><span className="L">S</span><span className="L">e</span><span className="L">n</span><span className="L">d</span><span className="L">i</span><span className="L">n</span><span className="L">g</span> <span className="D">.</span><span className="D">.</span><span className="D">.</span></h1>
				</div>
				<div ref="successMessage" id="successMessage" className="message">
					<h1>{ removeSpecialChars(this.props.form.success_message) }</h1>
				</div>
			</div>
		)
	}
}
