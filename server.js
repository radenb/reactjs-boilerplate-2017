require('babel-register')({
	presets: ['react','es2015']
})

var express = require('express')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var nodemailer = require('nodemailer')

var router = express.Router()
var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/dist', express.static('dist'))

app.use(require('./src/routes/index.js'))

app.use('/contact/submit/', router)

var request = require('request')

router.post('/', sendContactForm)
	function sendContactForm(req, res) {
		var data= '';

		req.on('data', function(chunk) {
			data += chunk
		})
		req.on('end', function() {
			var newData = JSON.parse(data)

			// EXAMPLE USING WP-API TO GENERATE SPECIFIC INPUT / RESPONSE SETUP
			// request('DOMAIN/wp-json/wp/v2/pages?slug=contact', (GETerror, GETreq, GETres) => {
			// 	var GETres = JSON.parse(GETres)
			// 	var html = '<p>New WayLA Inquiry</p>';
			// 	var subject = 'WayLA Inquiry'
			//
			// 	GETres[0].acf.inputs.map( (input, key) => {
			// 		if (input.label == 'Name') {
			// 			subject += ' from ' + newData[input.label]
			// 		}
			// 		html += '<p>' + input.label + ': <b>'+ newData[input.label] + '</b></p>'
			// 	})
			// 	var transporter = nodemailer.createTransport({
			// 		host: 'smtp.office365.com', // hostname
			// 	    secureConnection: false, // TLS requires secureConnection to be false
			// 	    port: 587,  // port for secure SMTP,
			//         tls: {
			//             ciphers: 'SSLv3'
			//         },
			// 		auth: {
			// 			user: 'xxxx', // Your email id
			// 			pass: 'xxxx' // Your password
			// 		}
			// 	});
			// 	mailOptions = {
			// 		from: 'ldd.17.developer@gmail.com', // sender address
			// 		to: 'WHERE SHOULD MAIL SEND', // list of receivers
			// 		subject: subject, // Subject line
			// 		html: html // You can choose to send an HTML body instead
			// 	};
			// 	transporter.sendMail(mailOptions, function(error, info){
			// 	    if(error){
			// 	        // console.log(error);
			// 	        res.json({yo: 'error'});
			// 	    }else{
			// 	        // console.log('Message sent: ' + info.response);
			// 	        res.json({yo: info.response});
			// 	    };
			// 	});
			// })
		})
	}

var port = process.env.PORT || 8081

app.listen(port, function() {
	console.info('==>Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
