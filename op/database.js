const mysql=require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "beshegercom_inventory",
    database:"beshegercom_inventory",
    password: "Yohannes@hira123321"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });  
  module.exports=con;