const { createPool } = require('mysql');

const pool = createPool({
	host:"localhost",
	user:"root",
	password: 'indyawich123',
	database: "mydb"
});

pool.connect(function (err) {
	if (err) throw err;
})

module.exports = pool;