import React from 'react'

import Row from '../components/Row'
import Column from '../components/Column'

const divStyle = {

};

export default class Contact extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rendered: false
		}
	}
	componentWillMount() {
		this.state.rendered = true
	}
	render() {
		return (
			<Row>
				<Column width="6" tablet="12" style={divStyle} className="">
					<h1>404 Page - PAGE NOT FOUND</h1>
				</Column>
			</Row>
		)
	}

}
