var router = require('express').Router()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var ReactRouter = require('react-router')
import { RouterContext, browserHistory, IndexRoute, Router, Route } from 'react-router'
import Helmet from 'react-helmet'

import App from '../views/App'
import Home from '../views/Home'


router.get('*', function(request, response) {
    ReactRouter.match({
    	routes: (
        <Router history={ browserHistory } >
          <Route path='/' component={ App } >
            <IndexRoute component={ Home } />
          </Route>
        </Router>
      ),
    	location:request.url
   		 }, function(error, redirectLocation, renderProps) {
	 		if (renderProps) {
                var request = require('request')

                    var content = ReactDOMServer.renderToString(
                        <RouterContext { ...renderProps } createElement={
                            function(Component, renderProps) {
                                return <Component { ...renderProps } />
                            }
                    } />)

                    var head = Helmet.rewind();
                    // console.log(head);
var tempHead = `${head.title}
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon.png" />
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" href="/dist/style.css" />`;
var scripts = `<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js"></script>
<script src="/dist/bundle.js" ></script>`;

var html = `<!doctype html><html><head>${tempHead}</head><body><div id="app">${content}</div>${scripts}</body></html>`;

                    response.send(html);
                    response.end();

      }
	 		else {
	 			response.status(404).send('Sorry, something went wrong. Please try a different page')
	 		}
  	}
  )
})

module.exports = router
