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

function changePassword(req,res){
    if(req.body.password===req.body.re_password){
     let salt ='a1624ccea70b57f377372bac81bda372'
    let newPassword=crypto.pbkdf2Sync(req.body.password, salt,  1000, 64, `sha512`).toString(`hex`);
    let password=crypto.pbkdf2Sync(req.body.oldPassword, salt,  1000, 64, `sha512`).toString(`hex`);

    //update the password
    let query=`update  beshegercom_inventory.Retailer
    set Retailer.password='${newPassword}'
     where (Retailer.mobile='${req.body.userName}' or Retailer.email='${req.body.userName}') and Retailer.password='${password}'`;


     con.query(query ,(err,result)=>{
        if(err)
        res.send(err)
        else{
            if(result.affectedRows=== 1){
                let response={
                    status:'success',
                    message:'password changed Succefully'
            }
                res.send(response)

            }
            else{
                let response={
                    status:'fialed',
                    message:'Passwrod was not changed'
            }
            res.send(response)
            }
        }

        //res.send(result)
    })
       // res.send(query)
    }
    else{
        let response={
            status:'fialed',
            message:'password missamatching'
    }
    res.send(response)
    }
        
}
function changePasswordConf(req,res){
    if(req.body.password===req.body.re_password){
     let salt ='a1624ccea70b57f377372bac81bda372'
    let newPassword=crypto.pbkdf2Sync(req.body.password, salt,  1000, 64, `sha512`).toString(`hex`);
    let password=crypto.pbkdf2Sync(req.body.oldPassword, salt,  1000, 64, `sha512`).toString(`hex`);

    //update the password
    let query=`update  beshegercom_inventory.Retailer
    set Retailer.password='${newPassword}',
     Retailer.is_verified='1'
     where (Retailer.mobile='${req.body.userName}' or Retailer.email='${req.body.userName}') and Retailer.password='${password}'`;


     con.query(query ,(err,result)=>{
        if(err)
        res.send(err)
        else{
            if(result.affectedRows=== 1){
                let response={
                    status:'success',
                    message:'password changed Succefully'
            }
                res.send(response)

            }
            else{
                let response={
                    status:'fialed',
                    message:'Passwrod was not changed'
            }
            res.send(response)
            }
        }

        //res.send(result)
    })
       // res.send(query)
    }
    else{
        let response={
            status:'fialed',
            message:'password missamatching'
    }
    res.send(response)
    }
        
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
         if(result.affectedRows=== 1){
            let response={
                status:'success',
                message:'Profile Updated SuccessFully'
        }
            res.send(response)
        }
        else{
            let response={
                status:'fialed',
                message:'User Not Updated'
        }
        res.send(response)
        }

       // res.send(result)
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
    //let salt = crypto.randomBytes(16).toString('hex');
    let salt ='a1624ccea70b57f377372bac81bda372'
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

function login(req,res){
    let salt ='a1624ccea70b57f377372bac81bda372' //crypto.randomBytes(16).toString('hex');
    console.log(salt)
    let passwordCrypted=crypto.pbkdf2Sync(req.body.passWord, salt,  1000, 64, `sha512`).toString(`hex`);
    console.log(req.body.passWord,passwordCrypted)
    let query=`SELECT * FROM beshegercom_inventory.Retailer
    where (Retailer.mobile='${req.body.userName}' or Retailer.email='${req.body.userName}') and Retailer.password='${passwordCrypted}'`;
    con.query(query ,(err,result)=>{
        if(err)
        res.send(err)
        else{
           console.log(result)
            try {
            let response=result[0]
            if(response===null){
                res.send("Failed To Login")
               
            }
            if(response.is_verified===0){
                let resp={
                    status:'account_not_verfied',
                    userName:response.email,
                    retailerId:response.retailerId
                }
                res.send(resp)
            }
            else{
                let resp={
                    status:'success',
                    userName:response.email,
                    retailerId:response.retailerId
                }
                res.send(resp)

            }
        } catch (error) {
            let responses={status:"Invalid User name Passwords Supplied"}
                res.send(responses)
           
                
        }
            //console.log(response.is_verfiied)
            //res.send(response)
        }    
    })

    //res.send(passwordCrypted)
}


module.exports={changePassword,updateRetailer,insertStatment,signUp,login,changePasswordConf}