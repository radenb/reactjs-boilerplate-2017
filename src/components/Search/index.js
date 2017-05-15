import React from 'react'
import Rx from 'RxJs/Rx'
import axios from 'axios'

export default class Search extends React.Component {
	componentDidMount() {
		this.offset = 0
		this.value = ""
		this.results = []
		this.lastST = 0
		this.token = '240944f890bac6eab9cf0dc11687a8746f73aa6d'

		Rx.Observable.fromEvent(this.refs.inputter, 'keyup')
			.map( e => e.target.value )
			.debounceTime(250)
			.distinctUntilChanged()
			.concatMap( value => {
				this.value = value
				// reset on every search
				this.offset = 0
				this.results = []
				return Rx.Observable.fromPromise( this.searchify( value, 0 ))
			})
			.subscribe( data => this.renderNewHtmlFromData( data ))


		if (this.props.infinite) {
			let scrolls$ = Rx.Observable.fromEvent(window, 'scroll')
				.debounceTime(250)
				.map( this.getScrollDirection )
				.filter( this.getScrollPos.bind(this) )
				.exhaustMap( () => Rx.Observable.fromPromise( this.searchify(this.value, this.offset)) )
				.subscribe( data =>	this.renderNewHtmlFromData(data))
		}
	}

	renderNewHtmlFromData( res ) {
		let giphies = res.data.data
		if (giphies.length > 0) {
			this.newResults = giphies.map( (giphy, index) => {
			return (
						<div className="img-container col-4 col-mobile-12" key={ giphy.images.downsized.url } style={{ display:'inline-block', margin:'20px' }}>
								<img style={{ objectFit:'cover' }} src={ giphy.images.downsized.url } />
						</div>
				)
			})

			this.results = this.results.concat(this.newResults)
		}
		else {
			this.results = 'No results'
		}
		this.setState({
			data : res.data
		})
	}

	searchify( str, offset ) {
		if (str.length == 0) str = ' '
		return axios.get(`http://api.giphy.com/v1/gifs/search?q=${str}&limit=12&offset=${offset}&rating=r&api_key=dc6zaTOxFJmzC`)
	}

	getScrollDirection() {
		let st = window.pageYOffset
		let dir
		st > this.lastST ? dir = 'down' : dir = 'up'
		this.lastST = st
		return dir
	}

	getScrollPos() {
		if (window.pageYOffset + window.innerHeight > .7 * document.body.scrollHeight ) {
			this.offset += 12
			return true
		}
		else return false
	}

	render() {
		return (
			<div className="search-container">
				<h1 style={{ color:'rgba(0,0,0,.6)', fontSize:'5vw', textAlign:'center' }}>Giphy Searchificator</h1>
				<input ref="inputter" type="text" placeholder="Search giphy..." />
				<div ref="results" >
					{ this.results && <p>Search results for: { this.value }</p> }
					{ this.results }
				</div>
			</div>
		)
	}
}
