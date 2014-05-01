
/**
 * Module dependencies.
 */

var express = require('express');
var nodemailer = require("nodemailer");
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/election', routes.election);
app.get('/leaflet', routes.leaflet);
app.get('/purchase', routes.purchase);
app.get('/ureport', routes.ureport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "james.robinson@epii.co.uk",
        pass: "L0rdD3nning"
    }
});

var mail = function(req, res) {
  var mailOptions = {
    from: req.body.name + " <" + req.body.email + ">",
    to: "james.robinson@epii.co.uk",
    subject: "[" + req.body.party + "] Sales Enquiry",
    text: req.body.content
  };    
  smtpTransport.sendMail(mailOptions), function(error, response) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("Message sent: " + response.message);
    }
  }
  res.render('mail', { title: 'mail' });
};

app.post('/mail', mail);
