const express=require('express');
const app=express();
const converter = require('json-2-csv');
const commands=require('./op/commonSQL.js');
const profile=require('./op/user_profile.js');
const nodemailer = require('nodemailer');

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
app.post('/update_retailer',(req,res)=>{
   // profile.changePassword(res,req.body.userName,req.body.password);
    profile.updateRetailer(res,req);
})


app.post('/reg',(req,res)=>{
    commands.generateInsertSql(req.body.data,req.body.tableName,res) 
})

app.get('/email',async(req,res)=>{

    let fromMail = 'no_replay@besheger.com';
    let toMail = 'jonmersha@gmail.com';
    
    // let toMail = 'gnbaviskar2@gmail.com,gnbaviskar3@gmail.com';
    
    let subject  = 'An email using nodejs app';
    let text = "is this workingemail from from node js" 
    
    // auth
    let transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure:false,
        auth: {
            user: "jonmersha@gmail.com",
            pass: "Yohannes@hira123321"
        }
})
    
message = {
    from: "noreplay@email.com",
    to: "jonmersha@email.com",
    subject: "Subject",
    text: "Hello SMTP Email"
}
    
    // send email
    transporter.sendMail(message, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response)
    });
  

});
async function sendEamil(){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'jonmersha@gmail.com', // generated ethereal user
          pass: 'Yohannes@hira123321', // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"From Yohannes 👻"', // sender address
        to: "jonmersha@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


}

app.get('/em',(req,res)=>{
    email2();

});

function email2(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jonmersha@gmail.com',
          pass: 'Yohannes@hira123321'
        }
      });
      
      var mailOptions = {
        from: 'jonmersha@gmail.com',
        to: 'yohannes@besheger.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.listen(3000)