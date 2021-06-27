const mongoose = require('mongoose');

//mongodb+srv://mosquito:<password>@cluster0.qpq5p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//lSWXYUsNcJruO03w
//mosquito

mongoose.connect('mongodb+srv://cluster0.qpq5p.mongodb.net/myFirstDatabase?retryWrites=true/mailaria',{
dbName:'Mailaria',
user:'mosquito',
pass:'lSWXYUsNcJruO03w',   
useNewUrlParser:true,
}).then(()=>{
    console.log("mongodb connected...")
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;