//set variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
//set DB connection, connect
const knex = require('knex') ({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSW,
		database: process.env.DB_NAME,
		charset: 'utf8'
	}
})
const bookshelf = require('bookshelf')(knex)
//create model Task which connect to table name tasks
const Task = bookshelf.model('Task', {
	tableName: 'tasks'
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cors());
// post task endpoint - sending and setting values to DB
app.post('/task', async (req, res) => {
	const newText = req.body;
	// console.log(newText['todoText']);
	const task = new Task({text: newText['todoText'], done: 'false'})
	await task.save();
	res.json(task)
})
// get task endpoint - get all TODO tasks (not done yet) from DB
app.get('/task', (req, res) => {
	Task.where({done: 'false'}).fetchAll().then(function (resData) {
		// console.log(resData.toJSON())
		return res.json({data: resData})
	})
})
// delete task endpoint - delete task from DB
app.delete('/task/:id', async (req, res) => {
	var task = await Task.where('id', req.params.id).destroy();
	res.json(task);

});
// put task endpoint - modify/change DB row values
app.put('/task/:id', async (req, res) => {
	var taskUpdate = await Task.where('id', req.params.id)
		.save(
			{done: 'true'},
			{method: 'update', patch: true}
		)
	res.json(taskUpdate)
})
// get done task endpoint - get all DONE tasks from DB 
app.get('/task/done', (req, res) => {
	Task.where({done: 'true'}).fetchAll().then(function (resData) {
		return res.json({data: resData})
	})
})
// set port to run on 8080
app.listen(8080);
console.log('start');