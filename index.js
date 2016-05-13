var express = require('express');
var morgan = require('morgan');
var app = express();
var port = 3000;

app.use(morgan('dev'));
app.use('/',express.static('./build/site/'));

app.get('/', function(req, res)
{
	res.sendFile(__dirname+'/build/site/index.html');
});

app.listen(port, function()
{
	console.log("Server listening on "+port);
});