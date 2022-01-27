const con=require('./database.js')


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
   return `INSERT INTO Selles (${keysString}) VALUES ${valueStirng}; ${updateStatment}`;

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

function getSellsOrderNumber(req,res){
    let query=`SELECT * FROM sells_order_sequaence where order_number_status=0 and Retailer_id=${req.body.Retailer_id}`
   console.log(query)
    con.query(query,(error,result)=>{
        if(error) res.send(error)
        else{
            if(result.length==0){
            generateSellsOrderNumber(req,res)
            }
            else
            res.send(result)
            
        }
    })

}
function generateSellsOrderNumber(req,res){
    let query=`INSERT INTO sells_order_sequaence(Retailer_id) values(${req.body.Retailer_id})`
    console.log(query);
    con.query(query,(error,result)=>{
        if(error)res.send(error)
        else {
            console.log(result.insertId)
            let insertId=result.insertId
            let query=`update sells_order_sequaence set sells_order_number='SON-${req.body.Retailer_id}-${insertId}' where sequance_number=${insertId}
                        `
                        console.log(query)
                        updateSellsOrderNumber(req,res,query)            
        }
    })
    function updateSellsOrderNumber(req,res,query){
        con.query(query,(error,result)=>{
            if(error)res.send(error)
            else{
                getSellsOrderNumber(req,res);
            }

        })
    }
}


function closeSellsOrderNumber(req,res){
    let query=`update sells_order_sequaence set order_number_status=1 where Retailer_id=${req.body.Retailer_id}`
    con.query(query,(error,result)=>{
        if(error)res.send(error)
        else res.send(result)
    })

}


module.exports={registerSells,getSellsOrderNumber,closeSellsOrderNumber}