let router = require ("express").Router();
let Book   = require ("../model/book.js")
router.get("/",async (req,res)=>{
    let book;
    try{
     book = await Book.find({}).sort({
        created:'desc'}).limit(10);
        res.render("index",{books:book})
    }catch{
     book = [];
    }  
})

module.exports = router;