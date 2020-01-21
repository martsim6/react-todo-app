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
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.post('/test', function(req, res){
	console.log(req.body['todoText']);
	// new Tasks({text: req.body['todoText']}).save()
})
// app.get('/text' function (req, res) {
	
// })
// app.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.listen(process.env.PORT || 8080);

console.log('start');