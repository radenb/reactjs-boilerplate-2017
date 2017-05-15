import React from 'react'

import Row from '../components/Row'
import Column from '../components/Column'
import Search from '../components/Search'

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
				<Column width="6" tablet="12">
					<Search infinite />
				</Column>

			</Row>
		)
	}

}
