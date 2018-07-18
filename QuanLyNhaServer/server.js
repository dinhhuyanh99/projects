var express = require('express'),
	app = express(),
	port = process.env.PORT || 8000,
	mongoose = require('mongoose'),
	Rooms = require('./api/models/Rooms'),
	Tenants = require('./api/models/Tenants'),
	ElectricBills = require('./api/models/ElectricBills'),
	WaterBills = require('./api/models/WaterBills'),
	bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kevinhecox1999:Huyanh99@ds131531.mlab.com:31531/home_management');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var routes = require('./api/routes/routes');
routes(app);
app.listen(port);

console.log('Currently listening on port: ' + port);


app.use(function(req, res){
	res.status(404).send({url: req.originalUrl + ' not found'});
});

//5b4700992b3749215042c9c9