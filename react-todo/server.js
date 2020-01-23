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
	res.send('lacko');
})

// Tasks.count().then((count) => {
// 	console.log(`mas tam ${count} taskov`);
// }).catch((err) =>{
// 	console.log(err);
// }).finally(() => {
// 	knex.destroy();
// });

// async function fetch_all() {
// 	try {
// 		let vals = await Tasks.fetchAll();
// 		console.log(vals.toJSON());
// 	} catch(e) {
// 		console.log(`Failed to fetch data: ${e}`);
// 	} finally {
// 		knex.destroy();
// 	}
// }
// fetch_all();
app.listen(process.env.PORT || 8080);

console.log('start');