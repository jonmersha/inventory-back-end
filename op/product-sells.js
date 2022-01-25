const con=require('./database.js')
// const nodemailer = require('nodemailer');
// const command = require('nodemon/lib/config/command');
// const { connect } = require('./database.js');


//======================================================

function registerSells(req,res){
    let data=req.body.data
    let tableName=req.body.tableName
    let  command = generateMultipleInsert(data,tableName)
  
 con.query(command,(error,result)=>{
     if(error){
let response={
    status:false,
    message:error
}
console.log(response)
res.send(response)
     }
     else{
        let response={
            status:true,
            message:result
        }
        //console.log(response)
       // closePurchesOrder(req.body.data[0].Retailer_Id)
     res.send(response)
     }
     
 })

}

function generateMultipleInsert(data,tableName){
    var keysString='';
     var valueStirng ='';
     var keys=Object.keys(data[0]);
    for(var i=0;i<keys.length-1;i++){
        keysString+=keys[i]+', '; 
    }
    keysString+=keys[keys.length-1]
let updateStatment=[]
    for(var j=0;j<data.length-1;j++){
        valueStirng+=`${gettingValues(data[j])} ,` 
       // updateStatment
        updateStatment=`UPDATE Product 
        SET remaining_amount = remaining_amount+${data[j].Purchased_qty}, 
        selling_price=${data[j].Selling_price} 
        WHERE product_id =${data[j].product_code};`
       // updateStatment.push(`UPDATE Product SET remaining_amount = remaining_amount-${data[j].Purchased_qty}, selling_price=${data[j].Selling_price} WHERE product_id =${data[j].product_code};`)
    }

    updateStatment=`UPDATE Product
                    SET preve_amount= remaining_amount, 
                    remaining_amount=remaining_amount+-{data[data.length-1].Purchased_qty}, selling_price=${data[data.length-1].Selling_price} WHERE product_id =${data[data.length-1].product_code};`
    valueStirng+=`${gettingValues(data[data.length-1])}`
   return `INSERT INTO ${tableName}(${keysString}) VALUES ${valueStirng}; ${updateStatment}`;

}
function gettingValues(data){
    var valueStirng ='';
    var keys=Object.keys(data);
    for(var i=0;i<keys.length-1;i++){
        valueStirng+=`'${data[keys[i]]}' ,` 
    }
    valueStirng+=`'${data[keys[keys.length-1]]}'`
    return `(${valueStirng})`
}

function getPurchaseOrderNumber(req,res){
    let query=`SELECT * FROM purchase_order_sequaence where order_number_status=0 and Retailer_id=${req.body.Retailer_id}`
   console.log(query)
    con.query(query,(error,result)=>{
        if(error) res.send(error)
        else{
            if(result.length==0){
            generatePurchaseOrderNumber(req,res)
            }
            else
            res.send(result)
            
        }
    })

}
function generatePurchaseOrderNumber(req,res){
    let query=`INSERT INTO purchase_order_sequaence(Retailer_id) values(${req.body.Retailer_id})`
    con.query(query,(error,result)=>{
        if(error)res.send(error)
        else {
            console.log(result.insertId)
            let insertId=result.insertId
            let query=`update purchase_order_sequaence 
                        set 
                        purchase_order_number='PON-${req.body.Retailer_id}-${insertId}'
                        where sequance_number=${insertId}
                        `
                        updatepurchaseOrderNumber(req,res,query)            
        }
    })
    function updatepurchaseOrderNumber(req,res,query){
        con.query(query,(error,result)=>{
            if(error)res.send(error)
            else{
                getPurchaseOrderNumber(req,res);
            }

        })
    }
}
function closeOrderNumber(req,res){
    let query=`update purchase_order_sequaence
    set order_number_status=1
    where Retailer_id=${req.body.Retailer_id}
    `
    con.query(query,(error,result)=>{
        if(error)res.send(error)
        else res.send(result)
    })

}


function closePurchesOrder(Retailer_id){
    let query=`update purchase_order_sequaence
    set order_number_status=1
    where Retailer_id=${Retailer_id}
    `
    con.query(query,(error,result)=>{
        //if(error)res.send(error)
        //else res.send(result)
    })

}


function getVendorDetail(req,res){
    let query=`SELECT * FROM Vendor WHERE vendor_id=${req.body.vendor_id}`
    con.query(query,(error,result)=>{
        if(error)res.send(error)
        else {
            console.log(result)
            res.send(result)
        }
    })

}


module.exports={registerSells,getPurchaseOrderNumber,closeOrderNumber,getVendorDetail}