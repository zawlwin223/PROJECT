let mongoose = require ("mongoose");
let authorSchema = new mongoose.Schema({
   name:{type:String,required:true}
})

authorSchema.virtual("getname").get(function(){
   return this.name;
})
module.exports = mongoose.model("Author",authorSchema);