const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/lacko', function(req, res){
	return res.send('skurvenec');	
});
app.get('/users', function(req, res){
	// res.sendFile(path.join(__dirname, 'public', 'index.html'));
	res.json([
		{id:1, username: 'lacko'},
		{id:2, username: 'packo'}
	])
});
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

console.log('lacko');