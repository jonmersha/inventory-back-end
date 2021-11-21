const con=require('./database.js')
var randomstring = require("randomstring");
const axios = require('axios')
var crypto = require('crypto');
var host = 'https://hiramailer.herokuapp.com/em';

function generateInsertSql(req,tableName,res){
    var keysString='';
     var valueStirng ='';
     var keys=Object.keys(req);
    for(var i=0;i<keys.length-1;i++){
        keysString+=keys[i]+', ';
        valueStirng+=`'${req[keys[i]]}' ,` 
    }
    keysString+=keys[keys.length-1]
    valueStirng+=`'${req[keys[keys.length-1]]}'`
    var command= `INSERT INTO ${tableName}(${keysString}) VALUES(${valueStirng})`;
    execute(res,command)
}




function selectAll(res,tableName){
    execute(res,`SELECT * FROM ${tableName}`);
}

function changePassword(res,userName,password){
    let query=`SELECT * FROM beshegercom_inventory.Retailer 
    where (Retailer.mobile='${userName}' or Retailer.email='${userName}') and Retailer.password='${password}'`;
    con.query(query ,(err,result)=>{
        if(err)
        res.send(err)
        else
        res.send(result)
    })

}

function updateRetailer(res,req){
    //let query=`SELECT * FROM beshegercom_inventory.Retailer 
    //where (Retailer.mobile='${userName}' or Retailer.email='${userName}') and Retailer.password='${password}'`;
    
let query=`UPDATE beshegercom_inventory.Retailer
SET
first_name = '${req.body.first_name}',
midle_name = '${req.body.midle_name}',
last_name = '${req.body.last_name}',
org_name = '${req.body.org_name}',
country = '${req.body.country}',
city = '${req.body.city}',
sex = '${req.body.sex}',
dob = '${req.body.dob}'
WHERE Retailer_id = ${req.body.Retailer_id}`;

//res.send(query);
     con.query(query ,(err,result)=>{
         if(err)
         res.send(err)
         else
        res.send(result)
     })

}


function insertStatment(data,tableName){
    
    var keysString='';
     var valueStirng ='';
     var keys=Object.keys(data);
    for(var i=0;i<keys.length-1;i++){
        keysString+=keys[i]+', ';
        valueStirng+=`'${data[keys[i]]}' ,` 
    }
    keysString+=keys[keys.length-1]
    valueStirng+=`'${data[keys[keys.length-1]]}'`
    var command= `INSERT INTO ${tableName}(${keysString}) VALUES(${valueStirng})`;
    return command;
}


function signUp(data,res){

    let password=randomstring.generate(8);
    let salt = crypto.randomBytes(16).toString('hex');
    data.password=crypto.pbkdf2Sync(password, salt,  1000, 64, `sha512`).toString(`hex`);
   //res.send(data);
    //data.password=pp;
   let commandStatement=insertStatment(data,'Retailer');

   //res.send(commandStatement);
   execute(commandStatement,res,data,password)
}

function execute(command,res,data,password){
    // console.log(command)
     con.query(command,(err,result)=>{
         if(err)
         if(err.code==='ER_DUP_ENTRY')
          res.send({"Status":"Mobile or Email Already used",Details:`Dear Customer email Id or mobile number is already used please change it or login using Your username and password`})
          else
          res.send(err)
         else
         {
        
            makeRequest(data,res,password);

         }
     })
 }

 function makeRequest(data,res,password){
    axios.post(host, {
        title: "Retalier ID ",
        message: "Dear Customer Your Account is created Succefully and your Deffault password is "+password,
        sender: "noreplay@besheger.com",
        receiver:data.email,
        apiKey: "kzdjhlxasguiBWYXE24679HJKSYXFE9283787D213221"
      })
      .then(ress => {
          console.log(ress)
          res.send(`Your Account is created and default Password is sent to your registered email`)
      })
      .catch(error => {
          console.log(error);
          res.send('Eamil Not Sent To users'+error.code)
      })

}


module.exports={changePassword,updateRetailer,insertStatment,signUp}