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

app.post('/task/add', (req, res) => {
	const newText = req.body;
	console.log(newText['todoText']);
	// new Tasks({text: newText['todoText']}).save();
})

app.get('/tasks', (req, res) => {
	Tasks.fetchAll().then(function (resData) {
		console.log(resData.toJSON())
		return res.json({data: resData});
	})
})

// app.delete('/task/delete', function(req, res, next) => {
// 	Tasks.forge()
// })
app.listen(8080);
console.log('start');