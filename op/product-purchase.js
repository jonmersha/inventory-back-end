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
        if(err.code==='ER_DUP_ENTRY'){
            let rsp={
                status:false,
                message:" Registereduplicate Entry",
                affectedRows:0,
                id:0
            }
         res.send(rsp)

        }

         else{
            let rsp={
                status:false,
                message:err,
                affectedRows:0,
                id:0
            }

         res.send(rsp)
         }
        else
        {
                let rsp={
                    status:true,
                    message:tableName+" Registered",
                    affectedRows:result.affectedRows,
                    id:result.insertId
                }
                res.send(rsp);  
        }
    })
}
function queryExec(res,command){
    con.query(command,(err,result)=>{

        if(err){
            let rsp={
                success:false,
                message:err.code,
                response:err
            }
            res.send(rsp)

        }
        else{
            let rsp={
                success:true,
                message:"excecusion succefully completed",
                response:result
            }
            res.send(rsp)
            
        }
        
    })

}

function selectAll(res,tableName){
    queryExec(res,`SELECT * FROM ${tableName}`);
}

function retailerActvity(res,tableName,key){
    con.query(`SELECT * FROM ${tableName} where Retailer_id='${key}'` ,(err,result)=>{
        if(err)
        res.send(err)
        else
        res.send(result)
    })

}
function getComboData(req,res){
    let quaryString
if(req.tableName==='Inventory') 
quaryString =`SELECT product_id as 'id',product_name as 'name',remaining_amount as opening_amount FROM ${req.tableName} where Retailer_id=${req.id}`
else if(req.tableName==='Vendor')
quaryString =`SELECT vendor_id as 'id',vendor_name as 'name', FROM ${req.tableName} where Retailer_id=${req.id}`
else if(req.tableName==='Category')
quaryString =`SELECT category_id as 'id',Description as 'name',Description FROM ${req.tableName} where Retailer_id=${req.id}`

else if(req.tableName==='Store')
quaryString =`SELECT store_id as 'id',Store_name as 'name' FROM ${req.tableName} where Retailer_id=${req.id}`
//console.log(quaryString)
   
    con.query(quaryString,(err,result)=>{
        if(err){
            let rsp={
                id:null,
                name:null
            }
            res.send(rsp)

        }
        else{
           // console.log(result)
            res.send(result)
            
        }
        
    })
}

//======================================================
function registaerPurchase(req,res){
    //get data
    let data=req.body
    //generate insert command for each registration
    //run the command
    //run 
    generateMultipleInsert(data,res)

}
function updateProductPrice(byPrice){}
function updateProductQuantity(byAmount){}
function getBunchOfProducts(){}


function generateMultipleInsert(data){
    var keysString='';
     var valueStirng ='';
     var keys=Object.keys(data[0]);

    for(var i=0;i<keys.length-1;i++){
        keysString+=keys[i]+', ';
       // valueStirng+=`'${req[keys[i]]}' ,` 
    }
    keysString+=keys[keys.length-1]


    for(var j=0;j<data.length-1;j++){
        valueStirng+=`${gettingValues(data[j])} ,` 
    }
    valueStirng+=`${gettingValues(data[data.length-1])}`
    var command= `INSERT INTO Purchases (${keysString}) VALUES ${valueStirng};`;
    console.log(command)
    //execute(res,command,tableName);
}


function gettingValues(data){
    var valueStirng ='';
    var keys=Object.keys(data);
    console.log(keys)
    for(var i=0;i<keys.length-1;i++){
        valueStirng+=`'${data[keys[i]]}' ,` 
    }
    valueStirng+=`'${data[keys[keys.length-1]]}'`
    return `(${valueStirng})`
}


module.exports={registaerPurchase}