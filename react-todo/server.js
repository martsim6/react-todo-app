const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

const knex = require('knex') ({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'martsim',
		password: 'heslo',
		database: 'todo_database',
		charset: 'utf8'
	}
})

const bookshelf = require('bookshelf')(knex)

const Tasks = bookshelf.model('Tasks', {
	tableName: 'tasks'
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser);

app.use(cors());

app.get('/lacko', function(req, res){
	res.json([
		{id:1, username: 'lacko'},
		{id:2, username: 'packo'}
	])	
});

app.post('/test', function(req, res){
	console.log(req.params);
	console.log(req.body);
})

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

// new Tasks({text: 'lacko'}).save().then(console.log)
// 	.catch(console.log)

console.log('lacko');