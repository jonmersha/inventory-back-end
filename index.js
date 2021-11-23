const express=require('express');
const app=express();
const converter = require('json-2-csv');
const commands=require('./op/commonSQL.js');
const profile=require('./op/user_profile.js');
const nodemailer = require('nodemailer');


const https = require('https')


var host = 'https://hiramailer.herokuapp.com/em';

const cores =require('cors')

const path = require('path')

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(cores())
  app.options('*',cores())
  
  app.use(express.json())
  app.use('/', express.static(path.join(__dirname, 'public')))


//   app.get('/index', (request, response) => {
//     response.render('index', {
//       subject: 'EJS template engine',
//       name: 'our template',
//       link: 'https://google.com'
//     });
//   });
  
  app.get('/test',(req,res)=>{
      res.send("the page is working")
  })

//   app.get('/',(req,res)=>{
//       res.sendFile('index.html')
//   })


//information 
app.get('/retailer',(req,res)=>{
    commands.selectAll(res,'Retailer');  
    
})
app.get('/customer',(req,res)=>{ 
    commands.selectAll(res,'Customer');  
})

app.get('/category',(req,res)=>{
    commands.selectAll(res,'Category');  
})
app.get('/inventory',(req,res)=>{

    commands.selectAll(res,'Inventory');   
})
app.get('/purchase',(req,res)=>{
    commands.selectAll(res,'Purchases');    
})
app.get('/sells',(req,res)=>{
    commands.selectAll(res,'Selles');    
})
app.get('/store',(req,res)=>{
    commands.selectAll(res,'Store');  
    
})
app.get('/vendor',(req,res)=>{
    commands.selectAll(res,'Vendor');  
})

//Registration units

app.post('/chp',(req,res)=>{
    profile.changePassword(res,req);
})
app.post('/signup',(req,res)=>{
  let command=profile.signUp(req.body,res);
 
})
app.post('/update_retailer',(req,res)=>{
   // profile.changePassword(res,req.body.userName,req.body.password);
    profile.updateRetailer(res,req);
})

app.post('/reg',(req,res)=>{
    commands.generateInsertSql(req.body.data,req.body.tableName,res) 
})


app.listen(3000)