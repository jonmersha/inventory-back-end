const con=require('./database.js')
const nodemailer = require('nodemailer');
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
    execute(res,command,tableName);
}


function execute(res,command,tableName){
   // console.log(command)
    con.query(command,(err,result)=>{
        if(err)
        if(err.code==='ER_DUP_ENTRY')
         res.send({"Status":"duplicate Entry for key values",Details:err.sqlMessage})
         else
         res.send(err)
        else
        {
            if(tableName==='Retailer'){
                res.send({"Status":"Success",details:result}); 
            }
            else
            res.send({"Status":"Success",details:result});

        }
    })
}

function selectAll(res,tableName){
    execute(res,`SELECT * FROM ${tableName}`);
}

function retailerActvity(res,tableName,key){
    con.query(`SELECT * FROM ${tableName} where Retailer_id='${key}'` ,(err,result)=>{
        if(err)
        res.send(err)
        else
        res.send(result)
    })

}


module.exports={generateInsertSql,selectAll,retailerActvity}