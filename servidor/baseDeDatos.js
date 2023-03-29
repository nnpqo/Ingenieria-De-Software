const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'jdkcell_db'
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
  
