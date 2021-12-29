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
                    message:'Your password was changed Succefully'
            }
                res.send(response)

            }
            else{
                let response={
                    status:'fialed',
                    message:'Your Passwrod was not Updated'
            }
            res.send(response)
            }
        }

    })
      
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
        if(req.body.password===req.body.oldPassword){
            let response={
                status:'Error',
                success:false,
                message:'New Password and Old Passwords are the same'
        }
            res.send(response)

        }else{
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
                    success:true,
                    message:'your deffault password changed Succefully and email confirmed'
            }
                res.send(response)

            }
            else{
                let response={
                    status:'fialed',
                    success:false,
                    message:'Your Password was not changed'
            }
            res.send(response)
            }
        }

      
    })
}
    }
    else{
        let response={
            status:'fialed',
            success:false,
            message:'password missamatching'
    }
    res.send(response)
    }
        
}

function updateRetailer(res,req){
    
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
    let salt ='a1624ccea70b57f377372bac81bda372'
    data.password=crypto.pbkdf2Sync(password, salt,  1000, 64, `sha512`).toString(`hex`);
   let commandStatement=insertStatment(data,'Retailer');
   execute(commandStatement,res,data,password)
}

function execute(command,res,data,password){
    // console.log(command)
     con.query(command,(err,result)=>{
         if(err)
         if(err.code==='ER_DUP_ENTRY'){
            let response={
                Status:'Error',
                message:'Mobile or Email Already used'
             }
              res.send(response)
         }
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

        let response={
            Status:'success',
            message:'Your Account is created and the and you default password is sent to regstered email '
         }
          
          res.send(response)
      })
      .catch(error => {

        let response={
            Status:'Error',
            message:'Eamil Not Sent To users'+error.code
         }
          console.log(error);
          res.send(response)
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
                let resp={
                    Retailer_id:null,
                    first_name:null,
                    midle_name:null,
                    last_name:null,
                    email:null,
                    password:null,
                    loginStatus:false
                }

                res.send(resp)
               
            }
            if(response.is_verified===0){
                let resp={
                    Retailer_id:null,
                    first_name:null,
                    midle_name:null,
                    last_name:null,
                    email:null,
                    password:null,
                    message:'Account Not Verified',
                    loginStatus:false

                }
                res.send(resp)
            }
            else{
                let resp={
                    Retailer_id:response.Retailer_id,
                    first_name:response.first_name,
                    midle_name:response.midle_name,
                    last_name:response.last_name,
                    email:response.email,
                    password:req.body.passWord,
                    message:'Account Verified',
                    loginStatus:true
                }
                res.send(resp)

            }
        } catch (error) {
           
            let resp={
                Retailer_id:null,
                first_name:null,
                midle_name:null,
                last_name:null,
                email:null,
                password:null,
                message:'Invalid User Name and/Or Passwords Supplied',
                loginStatus:false

            }
                res.send(resp)
           
                
        }
           
        }    
    })

    
}


module.exports={changePassword,updateRetailer,insertStatment,signUp,login,changePasswordConf}