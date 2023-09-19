import mysql from 'mysql';

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.SQL_USER,
  password:process.env.SQL_PASSWORD,
  database:process.env.SQL_DATABASE,
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw  console.log("err",err);
  console.log("Connected!");
});

module.exports= con;