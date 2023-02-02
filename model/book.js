let mongoose = require ("mongoose");
let {Schema} = mongoose;
let bookbasepath = ("/book_cover");
let path = require ("path");
let book = new Schema({
    title:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Author"},
    page_count:{type:Number,required:true},
    publishDate:{type:Date,required:true},
    cover:{type:String,required:true},
    description:{type:String,required:true},
    created:{type:Date,default:Date.now}
});
book.virtual("bookcoverpath").get(function(){
     return path.join(bookbasepath,this.cover)
})
module.exports=mongoose.model("book",book);
module.exports.bookbasepath = bookbasepath
