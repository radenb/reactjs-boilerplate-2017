var React = require('react')

import App from '../views/App'
import Home from '../views/Home'
import About from '../views/About'
import Archive from '../views/Archive'
import Contact from '../views/Contact'
// import ReactGA from 'react-ga'

function createElement(Component, props) {
	return <Component { ...props } data={ window.DATA } />
}

import { useScroll } from 'react-router-scroll'

// google analytics stuff
// ReactGA.initialize('UA-98753551-1');
//
// function logPageView() {
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname);
// }

import { applyRouterMiddleware, browserHistory, IndexRoute, Route, Router, ReactRouter } from 'react-router'

// set onUpdate={ typeof window === 'object' ? logPageView : null } on Router Component

module.exports = (
	<Router history={ browserHistory } render={ applyRouterMiddleware(useScroll()) }  createElement={ createElement }>
		<Route path='/' component={ App } >
			<IndexRoute component={ Home } />
            <Route path="/about/" component={ About } />
            <Route path="/archive/" component={ Archive} />
            <Route path="/contact/" component={ Contact} />
		</Route>
	</Router>
)
