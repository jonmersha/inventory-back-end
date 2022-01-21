const con=require('./database.js')
const nodemailer = require('nodemailer');


//======================================================


function registerPurchase(req,res){
    let data=req.body.data
    let tableName=req.body.tableName
 let  command =generateMultipleInsert(data,tableName)
 console.log(command)

 //hetting the list of values to be updated


 //perform excequition
 con.query(command,(error,result)=>{
     if(error){
let response={
    status:false,
    message:error
}
res.send(response)

     }
     else{
         //perform Update Operations
`UPDATE Product SET remaining_amount = remaining_amount+1
	WHERE product_id =4;`

     }
     
 })
}

function getUpdateValues(data){
    var keys=Object.keys(data[0]);
    var commandArray
    for (let index = 0; index < data.length; index++) {
        //const element = array[index];

        
    }



}

function updateProductPrice(byPrice){}
function updateProductQuantity(byAmount){}
function getBunchOfProducts(){}


function generateMultipleInsert(data,tableName){
    var keysString='';
     var valueStirng ='';
     var keys=Object.keys(data[0]);

    for(var i=0;i<keys.length-1;i++){
        keysString+=keys[i]+', '; 
    }

    keysString+=keys[keys.length-1]

let updateStatmen=''
    for(var j=0;j<data.length-1;j++){
        valueStirng+=`${gettingValues(data[j])} ,` 
        updateStatmen+=`UPDATE Product
        SET
        remaining_amount = remaining_amount+${data[j].Purchased_qty},
        selling_price=${data[j].Selling_price}
            WHERE product_id =${data[j].product_code};`
    }

    updateStatmen+=`UPDATE Product
        SET
        remaining_amount = remaining_amount+${data[data.length-1].Purchased_qty},
        selling_price=${data[data.length-1].Selling_price}

            WHERE product_id =${data[data.length-1].product_code};`

    valueStirng+=`${gettingValues(data[data.length-1])}`
    return command= `
    INSERT INTO ${tableName}(${keysString}) VALUES ${valueStirng};
    ${updateStatmen}
    `;
    console.log(command)

    //execute(res,command,tableName);
    //updating the related imventory tables 

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


module.exports={registerPurchase}