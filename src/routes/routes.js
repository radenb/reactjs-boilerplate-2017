var React = require('react')

import App from '../views/App'
import Home from '../views/Home'
import Archive from '../views/Archive'
import About from '../views/About'
import Contact from '../views/Contact'
import NotFound from '../views/NotFound'

import { useScroll } from 'react-router-scroll'


import { applyRouterMiddleware, browserHistory, IndexRoute, Route, Router, ReactRouter } from 'react-router'

module.exports = (
	<Router history={ browserHistory } render={applyRouterMiddleware(useScroll())} >
		<Route path='/' component={ App } >
			<IndexRoute component={ Home } />
			<Route path='/work/' component={ Archive } />
			<Route path='/about/' component={ About } />
			<Route path='/contact/' component={ Contact } />
            <Route path='/*' component={ NotFound } />
		</Route>
	</Router>
)
