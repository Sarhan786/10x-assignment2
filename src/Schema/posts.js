const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
    title: String, 
    body: String,
    image: URL,
    user : {type : Schema.Types.ObjectId, ref: "User"}
 }, {timestamps : true})

const blogModel = mongoose.model("Post", postSchema);
module.exports = blogModel;