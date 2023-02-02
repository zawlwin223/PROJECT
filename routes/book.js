let router = require ("express").Router();
let Author= require ("../model/author.js");
let Book   = require ("../model/book.js");
let fs     = require ("fs");
let path   = require ("path"); 
//get all books route
router.get("/",async (req,res)=>{ 
    try{
        let books = await Book.find({});
        res.render("../views/book/index.ejs",{
        books:books,
       });
       console.log(books)
       books.forEach((val)=>{
        console.log(val.bookcoverpath)
       })
    }catch(error){
      console.log(error);
    }
})
//new books
router.get("/new",async (req,res)=>{
    let author = await Author.find();
    let book   =  new Book();
    renderingBook(author,book,res,false);
})
//adding books
router.post("/",save_img,async (req,res)=>{ 
    let author = await Author.find();
    let book = new Book({
        title:req.body.title,
        author:req.body.author,
        publishDate:new Date(req.body.publishDate),
        page_count:Number(req.body.page_count),
        cover:req.body.cover,
        description:req.body.description,
    });
    
    try {
        await book.save();
        res.redirect("/book")
    }catch(error){
        let file_name =  req.files.file.name; 
        removeFile(file_name);
        renderingBook(author,book,res,true)
    }
})
//saving bookcover to file
async function save_img(req,res,next){
    let file = req.files.file;
    file.mv(`${__dirname}/../public/book_cover/${file.name}`)
    req.body.cover=file.name;
    next();
}
//rendering new book
async function renderingBook(author,book,res,hasError=false){
    let params = {author:author , book:book}
    if(hasError==true){
        params["ErrorMessage"] = "Error Creating New Book";
    }
    res.render("../views/book/new.ejs",params);
            
}
//remove book cover file if error
 function removeFile(file){
   fs.unlink(path.join(__dirname,`../${Book.bookbasepath}`,file),(error)=>{
    console.error(error)
   })
}
module.exports = router;