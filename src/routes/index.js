var router = require('express').Router()
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var ReactRouter = require('react-router')
import { RouterContext, browserHistory, IndexRoute, Router, Route } from 'react-router'
import Helmet from 'react-helmet'

import App from '../views/App'
import Home from '../views/Home'
import Archive from '../views/Archive'
import About from '../views/About'
import Contact from '../views/Contact'

import NotFound from '../views/404'


router.get('*', function(request, response) {
    ReactRouter.match({
    	routes: (
        <Router history={ browserHistory } >
          <Route path='/' component={ App } >
            <IndexRoute component={ Home } />
            <Route path='/work/' component={ Archive } />
            <Route path='/about/' component={ About } />
            <Route path='/contact/' component={ Contact } />
            <Route path='/*' component={ NotFound } />
          </Route>
        </Router>
      ),
    	location:request.url
   		 }, function(error, redirectLocation, renderProps) {
	 		if (renderProps) {
                var request = require('request')
                request('http://admin.livelikeawinner.com/wp-json/wp/v2/pages', (error, req, body) => {
                    var props = { data: JSON.parse(body)}
                    var content = ReactDOMServer.renderToString(
                        <RouterContext { ...renderProps } createElement={
                            function(Component, renderProps) {
                                return <Component { ...renderProps } { ...props } />
                            }
                    } />)

                    var head = Helmet.rewind();
                    // console.log(head);
var tempHead = `${head.title}
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon.png" />
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.2/css/swiper.min.css" />
<link rel="stylesheet" type="text/css" href="/dist/style.css" />`;
var scripts = `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineMax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js" ></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js"></script>
<script src="/dist/bundle.js" ></script>`;

var html = `<!doctype html><html><head>${tempHead}</head><body><div id="app">${content}</div>${scripts}</body></html>`;

                    response.send(html);
                    response.end();
                })
            }
	 		else {
	 			response.status(404).send('Sorry, something went wrong. Please try a different page')
	 		}
    	}
    )

})

module.exports = router
