const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/kokot', function(req, res){
	return res.send('skurvenec');	
});
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080);