let express = require ("express");
let app     = express();
let mongoose = require ("mongoose");
let indexRoute = require ("./routes/index.js");
let expressLayouts = require('express-ejs-layouts');
let authorRoute = require ("./routes/author.js");

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs');
app.set("views",__dirname+"/views");
app.set("layout","layouts/layout.ejs");

app.use(expressLayouts);
app.use(indexRoute);
app.use("/author",authorRoute)


mongoose.connect("mongodb://localhost:27017/")
let db = mongoose.connection;
db.on("error",error=>{console.log(error)});
db.once("open",()=>{console.log("Connceted to Server")});


app.listen(process.env.Port||3000)