let express = require ("express");
let app     = express();
let mongoose = require ("mongoose");
let indexRoute = require ("./routes/index.js");
let expressLayouts = require('express-ejs-layouts');
let authorRoute = require ("./routes/author.js");
let bookRoute = require ("./routes/book.js");
let fileupload = require ("express-fileupload");
let path   = require ("path");

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');
app.set("views",__dirname+"/views");
app.set("layout","layouts/layout.ejs");

app.use(expressLayouts);
app.use(indexRoute);
app.use(fileupload())
app.use(express.static('public'))
app.use(express.urlencoded());
app.use("/author",authorRoute);
app.use("/book",bookRoute);

mongoose.connect("mongodb://localhost:27017/")
let db = mongoose.connection;
db.on("error",error=>{console.log(error)});
db.once("open",()=>{console.log("Connceted to dbs")});


app.listen(process.env.Port||3000)