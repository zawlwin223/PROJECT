let router = require ("express").Router();
let author_model = require ("../model/author");
//get all author
router.get("/",async(req,res)=>{
    let searchOptions = {};
    if(req.query.name!=null && req.query.name!=""){
        searchOptions.name=new RegExp(req.query.name,'i')
    }
    try{
        let get_author =await author_model.find(searchOptions);
    
        console.log(get_author.getname)
        res.render("author/index",{author:get_author,searchoption:req.query.name});
    }catch(e){
        console.log(e)
    }
  
})
//new author route
router.get("/new",(req,res,)=>{
    res.render("author/new");
    console.log("This is author new")
})
//create new author
router.post("/", async (req,res)=>{
    const author = new author_model({name:req.body.name})
    try{
        await author.save();
        res.redirect("author")
    }catch(error){
        res.render("author/new",{
            author:author_model,
            errormsg:"Error Creating Author"
        })
    }
 
})

module.exports = router;