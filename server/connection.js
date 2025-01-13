const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root", // Corrected property name
    password: "Hulktnt5",
    database: "todos"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    
});

module.exports = con;