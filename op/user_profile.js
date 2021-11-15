const con=require('./database.js')
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

function execute(res,command){
   // console.log(command)
    con.query(command,(err,result)=>{
        if(err)
        if(err.code==='ER_DUP_ENTRY')
         res.send({"Status":"duplicate Entry for key values",Details:err.sqlMessage})
         else
         res.send(err)
        else
        res.send({"Status":"Success",details:result}) 
    })
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

module.exports={changePassword,updateRetailer}