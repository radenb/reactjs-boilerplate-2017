import React from 'react'

import Row from '../components/Row'
import Column from '../components/Column'

const divStyle = {

};

export default class Home extends React.Component {
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
					<h4>Full Site  - Coming Soon</h4>
				</Column>
			</Row>
		)
	}

}